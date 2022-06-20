import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)

import { tilLesbarDatoMedArstall } from './dato-utils'

export const klagefrist = (opprettet: dayjs.Dayjs) => {
    const opprettetOslo = opprettet.tz('Europe/Oslo')

    const skipHelg = (d: dayjs.Dayjs) => {
        if (d.day() == 6) {
            //Lørdag
            return d.add(2, 'days')
        }
        if (d.day() == 0) {
            //Søndag
            return d.add(1, 'day')
        }
        return d
    }

    const skipForSentPaDagen = (d: dayjs.Dayjs) => {
        // Vi sender ikke sms samme dag dersom det er opprettet etter 14
        // En time venting på flere vedtak, og kl 15 er seneste utsending
        if (d.hour() >= 14) {
            return d.add(1, 'day')
        }
        return d
    }
    const klagefristen = skipHelg(
        skipForSentPaDagen(opprettetOslo.add(42, 'day'))
    )

    return tilLesbarDatoMedArstall(klagefristen.toDate())
}
