import dayjs from 'dayjs'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

export const sorterEtterNyesteTom = (vedtak1: RSVedtakWrapper, vedtak2: RSVedtakWrapper) => {
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

export const sorterEtterNyesteFom = (vedtak1: RSVedtakWrapper, vedtak2: RSVedtakWrapper) => {
    const fom1 = dayjs(vedtak1.vedtak.fom).unix()
    const fom2 = dayjs(vedtak2.vedtak.fom).unix()

    const diff = fom2 - fom1
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
