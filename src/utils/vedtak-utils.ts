import { Vedtak } from '../types/vedtak'

export const refusjonTilArbeidsgiverBeløp = (vedtak: Vedtak) => {
    return vedtak.vedtak.utbetalinger
        .filter(v => v.fagområde === 'SPREF')
        .reduce((sum, betaling) => sum + betaling.totalbeløp, 0)
}
