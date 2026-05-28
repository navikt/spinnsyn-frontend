import { addDays, getDay, getHours } from 'date-fns'
import { TZDate } from '@date-fns/tz'

import { tilLesbarDatoMedArstall, toDate } from './dato-utils'

export const klagefrist = (opprettetTimestamp: string): string | undefined => {
    const opprettetOslo = new TZDate(toDate(opprettetTimestamp), 'Europe/Oslo')

    const skipHelg = (d: Date): Date => {
        const day = getDay(d)
        if (day === 6) return addDays(d, 2)
        if (day === 0) return addDays(d, 1)
        return d
    }

    const skipForSentPaDagen = (d: Date): Date => {
        // Vi sender ikke sms samme dag dersom det er opprettet etter 14
        // En time venting på flere vedtak, og kl 15 er seneste utsending
        if (getHours(d) >= 14) {
            return addDays(d, 1)
        }
        return d
    }

    const klagefristen = skipHelg(skipForSentPaDagen(addDays(opprettetOslo, 42)))
    return tilLesbarDatoMedArstall(klagefristen)
}
