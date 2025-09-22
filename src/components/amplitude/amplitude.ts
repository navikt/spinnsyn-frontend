import { logAmplitudeEvent } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { amplitudeEnabled } from '../../utils/environment'

export type validEventNames =
    | 'navigere'
    | 'accordion lukket'
    | 'accordion åpnet'
    | 'skjema åpnet'
    | 'knapp klikket'
    | 'alert vist'
    | 'expansioncard åpnet'
    | 'expansioncard lukket'
    | 'readmore lukket'
    | 'readmore åpnet' //Bruk kun navn fra taksonomien

export const logEvent = (eventName: validEventNames, eventData: Record<string, string | boolean>) => {
    if (window) {
        if (amplitudeEnabled()) {
            logAmplitudeEvent({
                origin: 'spinnsyn-frontend',
                eventName,
                eventData,
            }).catch((e) => logger.warn(`Feil ved amplitude logging`, e))
        } else {
            // eslint-disable-next-line no-console
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(eventData)}!`)
        }
    }
}
