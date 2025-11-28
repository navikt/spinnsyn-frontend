import { logAnalyticsEvent } from '@navikt/nav-dekoratoren-moduler'
import { logger } from '@navikt/next-logger'

import { isProd, umamiEnabled } from '../../utils/environment'

export type validEventNames =
    | 'navigere'
    | 'accordion lukket'
    | 'accordion åpnet'
    | 'skjema åpnet'
    | 'knapp klikket'
    | 'alert vist'
    | 'ekspanderbart element tilgjengelig'
    | 'expansioncard åpnet'
    | 'expansioncard lukket'
    | 'readmore lukket'
    | 'vedtak av type åpnet'
    | 'readmore åpnet' //Bruk kun navn fra taksonomien

export const logEvent = (eventName: validEventNames, eventData: Record<string, string | boolean>) => {
    if (window) {
        if (umamiEnabled()) {
            logAnalyticsEvent({
                origin: 'spinnsyn-frontend',
                eventName,
                eventData,
            }).catch((e) => logger.warn(`Feil ved umami logging`, e))
        } else if (!isProd()) {
            // eslint-disable-next-line no-console
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(eventData)}!`)
        }
    }
}
