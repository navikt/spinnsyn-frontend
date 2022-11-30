import { useEffect } from 'react'
import { logger } from '@navikt/next-logger'

export function useFangHotjarEmotion(): void {
    useEffect(() => {
        function inspiserHotjarRequest(xhr: XMLHttpRequest, args: any[]) {
            try {
                const hotjarUrl = 'https://in.hotjar.com/api/v1/client/sites/118350/feedback/'
                if (!xhr.responseURL.startsWith(hotjarUrl)) {
                    return
                }
                if (!args[0]) {
                    return
                }
                const parset = JSON.parse(args[0])
                const emotion = parset.response.emotion
                const survey = xhr.responseURL.replace(hotjarUrl, '')
                if (!emotion || !survey) {
                    return
                }
                // Her kan vi poste til oss selv
                console.log({
                    emotion,
                    survey,
                })
            } catch (e) {
                logger.warn('Feil ', e)
            }
        }

        ;(XMLHttpRequest as any).callback = (xhr: XMLHttpRequest, arg1: any[]) => {
            window.setTimeout(() => {
                inspiserHotjarRequest(xhr, arg1)
            }, 1000)
        }
        const oldSend = XMLHttpRequest.prototype.send
        XMLHttpRequest.prototype.send = function () {
            // eslint-disable-next-line prefer-rest-params
            ;(XMLHttpRequest as any).callback(this, arguments)
            // eslint-disable-next-line prefer-rest-params
            oldSend.apply(this, arguments as any)
        }
    }, [])
}
