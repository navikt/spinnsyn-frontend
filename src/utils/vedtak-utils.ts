import { Vedtak } from '../types/vedtak'

export const refusjonTilArbeidsgiverBeløp = (vedtak: Vedtak) => {
    const refusjonsUtbetalinger = vedtak.vedtak.utbetalinger
        .filter(v => v.fagområde === 'SPREF')
        .flatMap(v => v.utbetalingslinjer)
    return refusjonsUtbetalinger
        .reduce((sum, betaling) => sum + betaling.beløp, 0)
}
