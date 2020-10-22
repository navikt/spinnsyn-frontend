import dayjs from 'dayjs'

import { UtbetalingslinjeDto, Vedtak } from '../types/vedtak'
import { erHelg, tilLesbarDatoMedArstall } from './dato-utils'

export const klagefrist = (vedtak?: Vedtak) => {
    return tilLesbarDatoMedArstall(
        dayjs(vedtak?.opprettet)
            .add(42, 'day')
            .toDate()
    )
}

export const estimertSluttdato = (vedtak?: Vedtak) => {
    let slutt = dayjs(vedtak!.vedtak.tom)
    let x = 0
    while (x < vedtak!.vedtak.gjenståendeSykedager) {
        slutt = slutt.add(1, 'day')
        while (erHelg(slutt.toDate())) {
            slutt = slutt.add(1, 'day')
        }
        x++
    }
    return slutt.format('D. MMM YYYY')
}

export const refusjonTilArbeidsgiverOrgnummer = (vedtak?: Vedtak) => {
    return vedtak?.vedtak.utbetalinger
        .find(u => u.fagområde === 'SPREF')
        ?.mottaker || '-'
}

export const refusjonTilArbeidsgiverUtbetalingsdager = (vedtak?: Vedtak) => {
    if (!vedtak) return 0

    const refusjoner = refusjonUtbetalingsLinjer(vedtak)
    const refusjonsdager = utbetalingslinjerTilDager(refusjoner)
    const refusjonsdagerInnenforVedtakPeriode = dagerInnenforPeriode(refusjonsdager, vedtak)

    return refusjonsdagerInnenforVedtakPeriode.length
}

export const refusjonTilArbeidsgiverTotalBeløp = (vedtak?: Vedtak) => {
    if (!vedtak) return 0

    const refusjoner = refusjonUtbetalingsLinjer(vedtak)
    const refusjonsdager = utbetalingslinjerTilDager(refusjoner)
    const refusjonsdagerInnenforVedtakPeriode = dagerInnenforPeriode(refusjonsdager, vedtak)

    return refusjonsdagerInnenforVedtakPeriode
        .reduce((a, b) => a + b.beløp, 0) || 0
}

export const refusjonTilArbeidsgiverBeløp = (vedtak?: Vedtak) => {
    if (!vedtak) return 0

    const refusjoner = refusjonUtbetalingsLinjer(vedtak)
    const refusjonsdager = utbetalingslinjerTilDager(refusjoner)
    const refusjonsdagerInnenforVedtakPeriode = dagerInnenforPeriode(refusjonsdager, vedtak)
    const belop = refusjonsdagerInnenforVedtakPeriode.map(dag => dag.beløp)

    return Math.max(...belop) || 0
}

const refusjonUtbetalingsLinjer = (vedtak: Vedtak) => {
    return vedtak.vedtak.utbetalinger
        .filter(v => v.fagområde === 'SPREF')
        .flatMap(v => v.utbetalingslinjer)
}

interface Dag {
    dato: string;
    beløp: number;
}

const utbetalingslinjerTilDager = (utbetalingslinjer: UtbetalingslinjeDto[]) => {
    const dager: Dag[] = []

    utbetalingslinjer.forEach(linje => {
        let start = dayjs(linje.fom)
        const slutt = dayjs(linje.tom)

        while (start <= slutt) {
            if (!erHelg(start.toDate())) {
                dager.push({
                    dato: start.toString(),
                    beløp: linje.beløp
                })
            }
            start = start.add(1, 'day')
        }
    })

    return dager
}

const dagerInnenforPeriode = (dager: Dag[], vedtak: Vedtak) => {
    const min = dayjs(vedtak.vedtak.fom).toDate()
    const max = dayjs(vedtak.vedtak.tom).toDate()
    return dager.filter(dag => {
        const dato = dayjs(dag.dato).toDate()
        return dato >= min && dato <= max
    })
}
