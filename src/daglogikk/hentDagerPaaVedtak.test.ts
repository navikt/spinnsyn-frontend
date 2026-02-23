import { describe, expect, test } from 'vitest'

import { refusjon } from '../data/testdata/data/vedtak/utbetalingsdager-med-grad/refusjon'
import { kunDirekte } from '../data/testdata/data/vedtak/kunDirekte'
import { kunAgPeriode } from '../data/testdata/data/vedtak/kunAgPeriode'
import { RSUtbetalingdag } from '../types/rs-types/rs-vedtak-felles'

import { hentDagerPaaVedtak, validerNyUtbetalingsdagListe } from './hentDagerPaaVedtak'

describe('Hent dager på vedtak', () => {
    test('Detaljer på dager skal være lik med ny og gammel utregning - refusjonsvedtak', () => {
        const vedtak = hentDagerPaaVedtak(refusjon)
        if (vedtak.vedtak.utbetaling.utbetalingsdager) {
            const dager = vedtak.vedtak.utbetaling.utbetalingsdager

            // Del dagene manuelt i testen for å validere at produksjonskoden gjør det riktig
            const dagerArbeidsgiver: RSUtbetalingdag[] = []
            const dagerPerson: RSUtbetalingdag[] = []
            const dagerNav: RSUtbetalingdag[] = []

            dager.forEach((dag) => {
                if (dag.beløpTilArbeidsgiver && dag.beløpTilArbeidsgiver > 0) {
                    dagerArbeidsgiver.push(dag)
                } else if (dag.beløpTilSykmeldt && dag.beløpTilSykmeldt > 0) {
                    dagerPerson.push(dag)
                } else {
                    dagerNav.push(dag)
                }
            })

            const sorterDagerEtterDato = (a: RSUtbetalingdag, b: RSUtbetalingdag) => a.dato.localeCompare(b.dato)
            const dagerArbeidsgiverSortert = [...dagerNav, ...dagerArbeidsgiver].sort(sorterDagerEtterDato)
            const dagerPersonSortert = [...dagerNav, ...dagerPerson].sort(sorterDagerEtterDato)

            const likeDagerArbeidsgiver = validerNyUtbetalingsdagListe(
                dagerArbeidsgiverSortert,
                vedtak.dagerArbeidsgiver,
            )
            expect(likeDagerArbeidsgiver).toBe(true)

            const likeDagerPerson = validerNyUtbetalingsdagListe(dagerPersonSortert, vedtak.dagerPerson)
            expect(likeDagerPerson).toBe(true)
        }
    })

    test('Håndterer vedtak med gammelt format uten beløp og sykdomsgrad - direkteutbetaling', () => {
        const vedtak = hentDagerPaaVedtak(kunDirekte)

        // Gammelt format har ikke utbetalingsdager med beløp og grad
        expect(vedtak.vedtak.utbetaling.utbetalingsdager).toBeDefined()

        if (vedtak.vedtak.utbetaling.utbetalingsdager) {
            const dager = vedtak.vedtak.utbetaling.utbetalingsdager

            // Sjekk at dagene mangler de nye feltene (gammelt format)
            const forsteNavDag = dager.find((d) => d.type === 'NavDagSyk')
            expect(forsteNavDag?.beløpTilArbeidsgiver).toBeUndefined()
            expect(forsteNavDag?.beløpTilSykmeldt).toBeUndefined()
            expect(forsteNavDag?.sykdomsgrad).toBeUndefined()

            // Selv med gammelt format skal vi fortsatt ha beregnet dager
            expect(vedtak.dagerPerson.length).toBeGreaterThan(0)
            expect(vedtak.dagerArbeidsgiver.length).toBeGreaterThan(0)
        }
    })

    test('Håndterer vedtak med kun arbeidsgiverperiode korrekt - gammelt format', () => {
        const vedtak = hentDagerPaaVedtak(kunAgPeriode)

        // Gammelt format har ikke utbetalingsdager med beløp og grad
        expect(vedtak.vedtak.utbetaling.utbetalingsdager).toBeDefined()

        if (vedtak.vedtak.utbetaling.utbetalingsdager) {
            const dager = vedtak.vedtak.utbetaling.utbetalingsdager

            // Alle dager skal være ArbeidsgiverperiodeDag
            expect(dager.every((d) => d.type === 'ArbeidsgiverperiodeDag')).toBe(true)

            // Sjekk at dagene mangler de nye feltene (gammelt format)
            const forsteDag = dager[0]
            expect(forsteDag.beløpTilArbeidsgiver).toBeUndefined()
            expect(forsteDag.beløpTilSykmeldt).toBeUndefined()
            expect(forsteDag.sykdomsgrad).toBeUndefined()

            // Skal ha beregnet dager for arbeidsgiver
            expect(vedtak.dagerArbeidsgiver.length).toBeGreaterThan(0)

            // Alle beregnede dager skal være ArbeidsgiverperiodeDag med beløp = 0
            vedtak.dagerArbeidsgiver.forEach((dag) => {
                expect(dag.dagtype).toBe('ArbeidsgiverperiodeDag')
                expect(dag.belop).toBe(0)
            })
        }
    })
})
