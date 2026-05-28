import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

import { toDate } from './dato-utils'

export const sorterEtterNyesteTom = (vedtak1: RSVedtakWrapper, vedtak2: RSVedtakWrapper) => {
    const tom1 = toDate(vedtak1.vedtak.tom).getTime()
    const tom2 = toDate(vedtak2.vedtak.tom).getTime()

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
    const fom1 = toDate(vedtak1.vedtak.fom).getTime()
    const fom2 = toDate(vedtak2.vedtak.fom).getTime()

    const diff = fom2 - fom1
    if (diff == 0) {
        if (vedtak1.revurdert && vedtak2.revurdert) {
            return toDate(vedtak2.opprettetTimestamp).getTime() - toDate(vedtak1.opprettetTimestamp).getTime()
        }
        if (vedtak1.revurdert || vedtak1.annullert) {
            return 1
        }
        if (vedtak2.revurdert || vedtak2.annullert) {
            return -1
        }
    }
    return diff
}
