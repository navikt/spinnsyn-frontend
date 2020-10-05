import dayjs from 'dayjs'

import { Vedtak } from '../types/vedtak'
import { erHelg, tilLesbarDatoMedArstall } from './dato-utils'

export const refusjonTilArbeidsgiverOrgnummer = (vedtak?: Vedtak) => {
    return vedtak?.vedtak.utbetalinger
        .find(u => u.fagområde === 'SPREF')
        ?.mottaker || '-'
}

export const refusjonTilArbeidsgiverBeløp = (vedtak?: Vedtak) => {
    return vedtak?.vedtak.utbetalinger
        .filter(v => v.fagområde === 'SPREF')
        .reduce((sum, betaling) => sum + betaling.totalbeløp, 0) || 0
}

export const refusjonTilArbeidsgiverDagsats = (vedtak?: Vedtak) => {
    const belop = vedtak?.vedtak.utbetalinger
        .find(u => u.fagområde === 'SPREF')
        ?.utbetalingslinjer?.map(l => Math.abs(l.beløp))
    return Math.max(...belop!) || 0
}

export const klagefrist = (vedtak?: Vedtak) => {
    return tilLesbarDatoMedArstall(
        dayjs(vedtak?.opprettet)
            .add(30, 'day')
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
