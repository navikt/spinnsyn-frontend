import { AmplitudeClient } from 'amplitude-js'

import { amplitudeEnabled, amplitudeKey } from '../../utils/environment'

let logEventFunction: ((eventName: string, data?: any) => void) | undefined

const getLogEventFunction = () => {
    if (window && amplitudeEnabled()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const amplitudeJs = require('amplitude-js')
        const amplitudeInstance: AmplitudeClient = amplitudeJs.getInstance()
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
        return amplitudeInstance.logEvent

    } else {
        return (eventName: string, data?: any) => {
            // eslint-disable-next-line no-console
            console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`)
        }
    }
}

export const logEvent = (eventName: string, eventProperties: any) => {
    if (window) {
        if (logEventFunction) {
            logEventFunction(eventName, eventProperties)
        } else {
            logEventFunction = getLogEventFunction()
            logEventFunction(eventName, eventProperties)
        }
    }
}
