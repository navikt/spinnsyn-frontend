import { amplitudeEnabled, amplitudeKey } from '../../utils/environment'

export let amplitude: any
export let instance: any
export let mockInstance: any

export const initAmplitude = () => {
    if (process.browser && amplitudeEnabled()) {
        amplitude = require('amplitude-js')
        instance = amplitude.getInstance().init(
            amplitudeKey(), null, {
                apiEndpoint: 'amplitude.nav.no/collect',
                saveEvents: false,
                includeUtm: true,
                batchEvents: false,
                includeReferrer: true,
                trackingOptions: {
                    city: false,
                    ip_address: false, // eslint-disable-line
                    version_name: false, // eslint-disable-line
                    region: false,
                    country: false,
                    dma: false,
                },
            },
        )

        mockInstance = {
            _userAgent: '',
            logEvent: (eventName: string, data?: any) => {
                // eslint-disable-next-line
                console.log(`Logger ${eventName} - Event properties: ${JSON.stringify(data)}!`)
                return 1
            },
            init: () => {
                console.log('Initialiserer mockAmplitude'); // eslint-disable-line
            }
        }
    }
}

export const logEvent = (eventName: string, eventProperties: any) => {
    amplitude.getInstance().logEvent(eventName, eventProperties)
}
