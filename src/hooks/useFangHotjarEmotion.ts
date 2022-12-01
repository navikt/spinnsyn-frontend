import { useEffect } from 'react'
import { logger } from '@navikt/next-logger'

export function useFangHotjarEmotion(): void {
    useEffect(() => {
        ;(XMLHttpRequest as any).callback = (xhr: XMLHttpRequest, body?: Document | XMLHttpRequestBodyInit | null) => {
            console.log('callback kalt')
            window.setTimeout(() => {
                console.log('window timeout')

                try {
                    const hotjarUrl = 'https://in.hotjar.com/api/v1/client/sites/118350/feedback/'
                    if (!xhr.responseURL.startsWith(hotjarUrl)) {
                        console.log('ikke hotjar url')
                        return
                    }
                    if (!body) {
                        console.log('ikke body')

                        return
                    }
                    if (typeof body !== 'string') {
                        console.log('body er ikke string')
                        console.log('body er' + typeof body)
                    }
                    const parset = JSON.parse(body as string)
                    const emotion = parset.response.emotion
                    const survey = xhr.responseURL.replace(hotjarUrl, '')
                    if (!emotion || !survey) {
                        console.log('ikke emotion eller survey')

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
            }, 1000)
        }
        const oldSend = XMLHttpRequest.prototype.send
        console.log('overwwiter send')
        XMLHttpRequest.prototype.send = function (...args) {
            console.log('kaller callback')
            ;(XMLHttpRequest as any).callback(this, args)
            oldSend.apply(this, args)
        }
    }, [])
}
