import { logger } from '@navikt/next-logger'

import { RSDag, RSUtbetalingdag, RSVedtakWrapper, RSVedtakWrapperUtvidet } from '../types/rs-types/rs-vedtak-felles'

import { hentDager } from './hentDager'
import { fjernArbeidIkkeGjenopptattDager } from './fjernArbeidIkkeGjenopptatt'
import { finnFaktiskFom } from './finnFaktiskFom'

export function hentDagerPaaVedtak(v: RSVedtakWrapper): RSVedtakWrapperUtvidet {
    const dagerPerson = fjernArbeidIkkeGjenopptattDager(
        hentDager(v.vedtak.fom, v.vedtak.tom, v.vedtak.utbetaling.personOppdrag, v.vedtak.utbetaling.utbetalingsdager),
    )
    const dagerArbeidsgiver = fjernArbeidIkkeGjenopptattDager(
        hentDager(
            v.vedtak.fom,
            v.vedtak.tom,
            v.vedtak.utbetaling.arbeidsgiverOppdrag,
            v.vedtak.utbetaling.utbetalingsdager,
        ),
    )

    const nyttVedtak: RSVedtakWrapperUtvidet = {
        ...v,
        dagerPerson: dagerPerson,
        dagerArbeidsgiver: dagerArbeidsgiver,
        sykepengebelopPerson: dagerPerson.reduce((acc, dag) => acc + dag.belop, 0),
        sykepengebelopArbeidsgiver: dagerArbeidsgiver.reduce((acc, dag) => acc + dag.belop, 0),
    }
    nyttVedtak.vedtak.fom = finnFaktiskFom({
        dagerArbeidsgiver: dagerArbeidsgiver,
        dagerPerson: dagerPerson,
        opprinneligFom: v.vedtak.fom,
    })
    nyttVedtak.vedtak.yrkesaktivitetstype = v.vedtak.yrkesaktivitetstype || 'ARBEIDSTAKER'

    return nyttVedtak
}

export function validerNyUtbetalingsdagListe(utbetalingsdager: RSUtbetalingdag[], dager: RSDag[]): boolean {
    for (const utbetalingsdag of utbetalingsdager) {
        if (utbetalingsdag.beløpTilArbeidsgiver === undefined && utbetalingsdag.beløpTilSykmeldt === undefined) {
            logger.warn(
                'Beløp er ikke satt for dag: ' + utbetalingsdag.dato + ', bruker data fra oppdrag (gammelt format)',
            )
            return false
        }
        if (utbetalingsdag.sykdomsgrad === undefined) {
            logger.warn(
                'Sykdomsgrad er ikke satt for dag: ' +
                    utbetalingsdag.dato +
                    ', bruker data fra oppdrag (gammelt format)',
            )
            return false
        }

        const dagFinnes = dager.find((dag) => dag.dato === utbetalingsdag.dato)
        if (!dagFinnes) {
            logger.error('Dag finnes ikke i ny liste: ' + utbetalingsdag.dato)
            return false
        }
        const likType = dagFinnes.dagtype === utbetalingsdag.type
        if (!likType) {
            logger.error(
                'Dagtype er ikke lik for dag: ' +
                    utbetalingsdag.dato +
                    ' Ny type: ' +
                    utbetalingsdag.type +
                    ', gammel type: ' +
                    dagFinnes.dagtype,
            )
            return false
        }
        const liktBelop =
            dagFinnes.belop === utbetalingsdag.beløpTilArbeidsgiver ||
            dagFinnes.belop === utbetalingsdag.beløpTilSykmeldt
        if (!liktBelop) {
            const gammeltBeløp = utbetalingsdag.beløpTilArbeidsgiver ?? utbetalingsdag.beløpTilSykmeldt
            logger.error(
                'Beløp er ikke likt for dag: ' +
                    utbetalingsdag.dato +
                    ' Nytt beløp: ' +
                    dagFinnes.belop +
                    ', gammelt beløp: ' +
                    gammeltBeløp,
            )
            return false
        }
        const likGrad = dagFinnes.grad === utbetalingsdag.sykdomsgrad
        if (!likGrad) {
            if (dagFinnes.dagtype == 'ArbeidsgiverperiodeDag' || dagFinnes.dagtype == 'NavHelgDag') {
                if (dagFinnes.grad == 0 && utbetalingsdag.sykdomsgrad == 100) {
                    continue
                }
            }
            logger.error(
                'Grad er ikke lik for dag med type ' +
                    dagFinnes.dagtype +
                    ': ' +
                    utbetalingsdag.dato +
                    ' Ny grad: ' +
                    utbetalingsdag.sykdomsgrad +
                    ', gammel grad: ' +
                    dagFinnes.grad,
            )
            return false
        }
    }
    return true
}
