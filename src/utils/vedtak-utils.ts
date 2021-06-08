import dayjs from 'dayjs'

import { RSUtbetalingslinje, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { erHelg, tilLesbarDatoMedArstall } from './dato-utils'

export const klagefrist = (vedtakWrapper?: RSVedtakWrapper) => {
    return tilLesbarDatoMedArstall(
        dayjs(vedtakWrapper?.opprettet)
            .add(42, 'day')
            .toDate()
    )
}

export const estimertSluttdato = (vedtakWrapper?: RSVedtakWrapper) => {
    let slutt = dayjs(vedtakWrapper!.vedtak.tom)
    let x = 0
    while (x < vedtakWrapper!.vedtak.utbetaling.gjenståendeSykedager) {
        slutt = slutt.add(1, 'day')
        while (erHelg(slutt.toDate())) {
            slutt = slutt.add(1, 'day')
        }
        x++
    }
    return slutt.format('D. MMM YYYY')
}

export const refusjonTilArbeidsgiverUtbetalingsdager = (vedtakWrapper?: RSVedtakWrapper): Dag[] => {
    if (!vedtakWrapper) return []

    const refusjonsdager = utbetalingslinjerTilDager(vedtakWrapper.vedtak.utbetaling.arbeidsgiverOppdrag.utbetalingslinjer)
    return dagerInnenforPeriode(refusjonsdager, vedtakWrapper)
}

export const refusjonTilArbeidsgiverTotalBeløp = (vedtakWrapper?: RSVedtakWrapper) => {
    if (!vedtakWrapper) return 0

    const refusjonsdager = utbetalingslinjerTilDager(vedtakWrapper.vedtak.utbetaling.arbeidsgiverOppdrag.utbetalingslinjer)
    const refusjonsdagerInnenforVedtakPeriode = dagerInnenforPeriode(refusjonsdager, vedtakWrapper)

    return refusjonsdagerInnenforVedtakPeriode
        .reduce((a, b) => a + b.beløp, 0) || 0
}

export const refusjonTilArbeidsgiverBeløp = (vedtakWrapper?: RSVedtakWrapper) => {
    if (!vedtakWrapper) return 0

    const refusjonsdager = utbetalingslinjerTilDager(vedtakWrapper.vedtak.utbetaling.arbeidsgiverOppdrag.utbetalingslinjer)
    const refusjonsdagerInnenforVedtakPeriode = dagerInnenforPeriode(refusjonsdager, vedtakWrapper)
    const belop = refusjonsdagerInnenforVedtakPeriode.map(dag => dag.beløp)

    return Math.max(...belop) || 0
}

interface Dag {
    dato: string;
    beløp: number;
    grad: number;
}

const utbetalingslinjerTilDager = (utbetalingslinjer: RSUtbetalingslinje[]) => {
    const dager: Dag[] = []

    utbetalingslinjer.forEach(linje => {
        let start = dayjs(linje.fom)
        const slutt = dayjs(linje.tom)

        while (start <= slutt) {
            if (!erHelg(start.toDate())) {
                dager.push({
                    dato: start.format('YYYY-MM-DD'),
                    beløp: linje.dagsats,
                    grad: linje.grad
                })
            }
            start = start.add(1, 'day')
        }
    })

    return dager
}

const dagerInnenforPeriode = (dager: Dag[], vedtakWrapper: RSVedtakWrapper) => {
    const min = dayjs(vedtakWrapper.vedtak.fom).toDate()
    const max = dayjs(vedtakWrapper.vedtak.tom).toDate()
    return dager.filter(dag => {
        const dato = dayjs(dag.dato).toDate()
        return dato >= min && dato <= max
    })
}
