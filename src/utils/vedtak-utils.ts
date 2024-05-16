import dayjs, { Dayjs } from 'dayjs'

import { Begrunnelse, BegrunnelseType, RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

import { erHelg } from './dato-utils'

export const fallbackEstimertSluttdato = (vedtakWrapper: RSVedtakWrapper): Dayjs => {
    let slutt = dayjs(vedtakWrapper.vedtak.tom)
    let x = 0
    while (x < vedtakWrapper.vedtak.utbetaling.gjenståendeSykedager) {
        slutt = slutt.add(1, 'day')
        while (erHelg(slutt.toDate())) {
            slutt = slutt.add(1, 'day')
        }
        x++
    }
    return slutt
}

export const hentBegrunnelse = (vedtak: RSVedtakWrapper, begrunnelse: BegrunnelseType): Begrunnelse | undefined => {
    return vedtak.vedtak.begrunnelser?.find((b) => b.type === begrunnelse)
}
