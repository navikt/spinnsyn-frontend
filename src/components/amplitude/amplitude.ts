import { AmplitudeClient } from 'amplitude-js'

import { amplitudeEnabled, amplitudeKey } from '../../utils/environment'

interface AmplitudeInstance {
    logEvent: (eventName: string, data?: any) => void
}


let amplitudeInstance: AmplitudeInstance | undefined

const getLogEventFunction = (): AmplitudeInstance => {
    if (window && amplitudeEnabled()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const amplitudeJs = require('amplitude-js')
        const amplitudeInstance: AmplitudeClient = amplitudeJs.default.getInstance()
        amplitudeInstance.init(
            amplitudeKey(), undefined, {
                apiEndpoint: 'amplitude.nav.no/collect',
                saveEvents: false,
                includeUtm: true,
                batchEvents: false,
                includeReferrer: true,
                trackingOptions: {
                    city: false,
                    ip_address: false,
                    version_name: false,
                    region: false,
                    country: false,
                    dma: false,
                },
            },
        )
        return amplitudeInstance

    } else {
        return {
            logEvent: (eventName: string, data?: any) => {
                // eslint-disable-next-line no-console
                console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`)
            }
        }
    }
}

export const logEvent = (eventName: string, eventProperties: any) => {
    if (window) {
        if (amplitudeInstance) {
            amplitudeInstance.logEvent(eventName, eventProperties)
        } else {
            amplitudeInstance = getLogEventFunction()
            amplitudeInstance.logEvent(eventName, eventProperties)
        }
    }
}
