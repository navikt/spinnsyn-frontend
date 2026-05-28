import { isBefore, isAfter, getYear } from 'date-fns'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { toDate } from '../../../utils/dato-utils'

export function skalViseJulesoknadWarning(vedtak: RSVedtakWrapper) {
    const erDirekteutbetaling = vedtak.sykepengebelopSykmeldt > 0

    const opprettet = toDate(vedtak.opprettetTimestamp)
    const tom = toDate(vedtak.vedtak.tom)
    const vedtakAar = getYear(opprettet)

    const vedtakFattetFørTom = isBefore(opprettet, tom)
    const vedtakFattetMidtenAvDesember =
        isBefore(opprettet, toDate(`${vedtakAar}-12-30`)) && isAfter(opprettet, toDate(`${vedtakAar}-12-06`))

    return erDirekteutbetaling && vedtakFattetFørTom && vedtakFattetMidtenAvDesember
}
