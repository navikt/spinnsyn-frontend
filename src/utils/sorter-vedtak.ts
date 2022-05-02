import dayjs from 'dayjs'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

export const sorterEtterNyesteTom = (
    vedtak1: RSVedtakWrapper,
    vedtak2: RSVedtakWrapper
) => {
    const tom1 = dayjs(vedtak1.vedtak.tom).unix()
    const tom2 = dayjs(vedtak2.vedtak.tom).unix()

    const diff = tom2 - tom1
    if (diff == 0) {
        if (vedtak1.revurdert || vedtak1.annullert) {
            return 1
        }
        if (vedtak2.revurdert || vedtak2.annullert) {
            return -1
        }
    }
    return diff
}
