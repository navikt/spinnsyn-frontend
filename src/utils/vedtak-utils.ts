import dayjs from 'dayjs'

import { Vedtak } from '../types/vedtak'
import { tilLesbarDatoMedArstall } from './dato-utils'

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
    // TODO: Hva hvis det er flere utbetalingslinjer med forskjellig beløp?
    return vedtak?.vedtak.utbetalinger
        .find(u => u.fagområde === 'SPREF')
        ?.utbetalingslinjer[0].beløp || 0
}

export const klagefrist = (vedtak?: Vedtak) => {
    return tilLesbarDatoMedArstall(
        dayjs(vedtak?.opprettet)
            .add(30, 'day')
            .toDate()
    )
}
