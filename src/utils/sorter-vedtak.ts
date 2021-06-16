import dayjs from 'dayjs'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

export const sorterEtterNyesteTom = (vedtak1: RSVedtakWrapper, vedtak2: RSVedtakWrapper) => {
    const tom1 = dayjs(vedtak1.vedtak.tom).unix()
    const tom2 = dayjs(vedtak2.vedtak.tom).unix()
    return tom2 - tom1
}
