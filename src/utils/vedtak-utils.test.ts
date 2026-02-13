import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { refusjon } from '../data/testdata/data/vedtak/utbetalingsdager-med-grad/refusjon'
import { kunDirekte } from '../data/testdata/data/vedtak/kunDirekte'
import { kunAgPeriode } from '../data/testdata/data/vedtak/kunAgPeriode'
import { hentDagerPaaVedtak } from '../daglogikk/hentDagerPaaVedtak'

import { harVedtakEndringer, rsDagerTilRSUtbetalingdagerMapper } from './vedtak-utils'
import { jsonDeepCopy } from './json-deep-copy'
import { hentBegrunnelse } from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1) // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5) // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6) // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0) // søndag
    })

    it('Tester at vi finner begrunnelse i vedtak', () => {
        const delvisInnvilglseVedtak = jsonDeepCopy(delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo)
        const begrunnelse = hentBegrunnelse(delvisInnvilglseVedtak, 'DelvisInnvilgelse')
        expect(begrunnelse?.type).toEqual('DelvisInnvilgelse')
        expect(begrunnelse?.begrunnelse).toEqual('Delvis innvilgelse.\n\nNy linje.')
    })
})

describe('Tester harVedtakEndringer', () => {
    it('Returnerer false når vedtakene er identiske', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(false)
    })

    it('Returnerer true ved forskjellig beløp', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 2000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })

    it('Returnerer true ved forskjellig vedtakstype', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 1000,
            sykepengebelopArbeidsgiver: 0,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })

    it('Returnerer true ved forskjellig antall sykepengedager igjen', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
            vedtak: {
                ...vedtakMedFlereArbeidsgivere.vedtak,
                utbetaling: { ...vedtakMedFlereArbeidsgivere.vedtak.utbetaling, gjenståendeSykedager: 100 },
            },
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
            vedtak: {
                ...vedtakMedFlereArbeidsgivere.vedtak,
                utbetaling: { ...vedtakMedFlereArbeidsgivere.vedtak.utbetaling, gjenståendeSykedager: 200 },
            },
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })
})

describe('Tester rsDagerTilRSUtbetalingdagerMapper', () => {
    it('Mapper refusjonsvedtak korrekt - beløp til arbeidsgiver', () => {
        const vedtak = hentDagerPaaVedtak(refusjon)
        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerArbeidsgiver, true)

        expect(mappedeDager.length).toBeGreaterThan(0)
        expect(mappedeDager.length).toBe(vedtak.dagerArbeidsgiver.length)

        // Sjekk at alle dager har korrekt struktur
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerArbeidsgiver[index]

            expect(dag.dato).toBe(originalDag.dato)
            expect(dag.type).toBe(originalDag.dagtype)
            expect(dag.begrunnelser).toEqual(originalDag.begrunnelser)
            expect(dag.sykdomsgrad).toBe(originalDag.grad)

            // Refusjon: beløp skal gå til arbeidsgiver
            expect(dag.beløpTilArbeidsgiver).toBe(originalDag.belop)
            expect(dag.beløpTilSykmeldt).toBe(0)
        })
    })

    it('Mapper direkteutbetalingsvedtak korrekt - beløp til sykmeldt', () => {
        const vedtak = hentDagerPaaVedtak(kunDirekte)
        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerPerson, false)

        expect(mappedeDager.length).toBeGreaterThan(0)
        expect(mappedeDager.length).toBe(vedtak.dagerPerson.length)

        // Sjekk at alle dager har korrekt struktur
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerPerson[index]

            expect(dag.dato).toBe(originalDag.dato)
            expect(dag.type).toBe(originalDag.dagtype)
            expect(dag.begrunnelser).toEqual(originalDag.begrunnelser)
            expect(dag.sykdomsgrad).toBe(originalDag.grad)

            // Direkteutbetaling: beløp skal gå til sykmeldt
            expect(dag.beløpTilSykmeldt).toBe(originalDag.belop)
            expect(dag.beløpTilArbeidsgiver).toBe(0)
        })
    })

    it('Mapper sykdomsgrad korrekt fra RSDag.grad til RSUtbetalingdag.sykdomsgrad', () => {
        const vedtak = hentDagerPaaVedtak(refusjon)
        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerArbeidsgiver, true)

        // Sjekk at alle dager har sykdomsgrad mappet
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerArbeidsgiver[index]
            expect(dag.sykdomsgrad).toBe(originalDag.grad)
            expect(dag.sykdomsgrad).toBeDefined()
            expect(dag.sykdomsgrad).toBeGreaterThanOrEqual(0)
            expect(dag.sykdomsgrad).toBeLessThanOrEqual(100)
        })
    })

    it('Mapper dagtype korrekt fra RSDag.dagtype til RSUtbetalingdag.type', () => {
        const vedtak = hentDagerPaaVedtak(kunDirekte)
        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerPerson, false)

        expect(mappedeDager.length).toBe(vedtak.dagerPerson.length)

        // Sjekk at alle dagtyper er mappet korrekt
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerPerson[index]
            expect(dag.type).toBe(originalDag.dagtype)
            expect(dag.type).toBeDefined()
            expect(typeof dag.type).toBe('string')
        })
    })

    it('Mapper begrunnelser korrekt', () => {
        const vedtak = hentDagerPaaVedtak(kunDirekte)
        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerPerson, false)

        expect(mappedeDager.length).toBe(vedtak.dagerPerson.length)

        // Sjekk at alle begrunnelser er mappet korrekt
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerPerson[index]
            expect(Array.isArray(dag.begrunnelser)).toBe(true)
            expect(dag.begrunnelser).toEqual(originalDag.begrunnelser)
        })
    })

    it('Mapper vedtak med kun arbeidsgiverperiode korrekt', () => {
        const vedtak = hentDagerPaaVedtak(kunAgPeriode)

        // Dette vedtaket har kun arbeidsgiverperiode (ingen utbetalingsdager med beløp)
        expect(vedtak.dagerArbeidsgiver.length).toBeGreaterThan(0)

        const mappedeDager = rsDagerTilRSUtbetalingdagerMapper(vedtak.dagerArbeidsgiver, true)

        expect(mappedeDager.length).toBe(vedtak.dagerArbeidsgiver.length)

        // Sjekk at alle dager er ArbeidsgiverperiodeDag og har beløp = 0
        mappedeDager.forEach((dag, index) => {
            const originalDag = vedtak.dagerArbeidsgiver[index]

            expect(dag.dato).toBe(originalDag.dato)
            expect(dag.type).toBe(originalDag.dagtype)
            expect(dag.begrunnelser).toEqual(originalDag.begrunnelser)
            expect(dag.sykdomsgrad).toBe(originalDag.grad)

            // Arbeidsgiverperiode: ingen beløp utbetales
            expect(dag.beløpTilArbeidsgiver).toBe(0)
            expect(dag.beløpTilSykmeldt).toBe(0)

            // Verifiser at det er ArbeidsgiverperiodeDag
            expect(dag.type).toBe('ArbeidsgiverperiodeDag')
        })
    })
})
