import dayjs from 'dayjs'

import { Vedtak } from '../types/vedtak'
import { erHelg } from './dato-utils'

export const refusjonTilArbeidsgiverBeløp = (vedtak: Vedtak) => {
    return vedtak.vedtak.utbetalinger
        .filter(v => v.fagområde === 'SPREF')
        .reduce((sum, betaling) => sum + betaling.totalbeløp, 0)
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
