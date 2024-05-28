import dayjs from 'dayjs'

import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak'

export function skalViseJulesoknadWarning(vedtak: RSVedtakWrapperUtvidet) {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0

    const vedtakFattetFørTom = dayjs(vedtak.opprettetTimestamp).isBefore(dayjs(vedtak.vedtak.tom))
    const vedtakFattetMidtenAvDesember =
        dayjs(vedtak.opprettetTimestamp).isBefore(dayjs('2023-12-30')) &&
        dayjs(vedtak.opprettetTimestamp).isAfter(dayjs('2023-12-06'))

    return erDirekteutbetaling && vedtakFattetFørTom && vedtakFattetMidtenAvDesember
}
