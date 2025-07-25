import dayjs from 'dayjs'

import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak-felles'

export function skalViseJulesoknadWarning(vedtak: RSVedtakWrapperUtvidet) {
    const erDirekteutbetaling = vedtak.sykepengebelopPerson > 0

    const vedtakFattetFørTom = dayjs(vedtak.opprettetTimestamp).isBefore(dayjs(vedtak.vedtak.tom))
    const vedtakAar = dayjs(vedtak.opprettetTimestamp).year()
    const vedtakFattetMidtenAvDesember =
        dayjs(vedtak.opprettetTimestamp).isBefore(dayjs(`${vedtakAar}-12-30`)) &&
        dayjs(vedtak.opprettetTimestamp).isAfter(dayjs(`${vedtakAar}-12-06`))

    return erDirekteutbetaling && vedtakFattetFørTom && vedtakFattetMidtenAvDesember
}
