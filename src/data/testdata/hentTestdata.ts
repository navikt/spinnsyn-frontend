import { IncomingMessage } from 'http'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { diverseData } from './data/personas'
import { personas } from './testperson'

export function hentTestdata(url?: string) {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (testperson && Object.prototype.hasOwnProperty.call(personas, testperson)) {
        return jsonDeepCopy(personas[testperson]().vedtak)
    } else {
        return jsonDeepCopy(diverseData.vedtak)
    }
}

export function hentMockVedtak(incomingMessage: IncomingMessage, cookies?: { [p: string]: string }): RSVedtakWrapper[] {
    const vedtak = hentTestdata(incomingMessage.url)
    const lesteVedtak = [] as string[]
    if (cookies) {
        for (const c in cookies) {
            if (c.startsWith('lest-vedtak')) {
                lesteVedtak.push(cookies[c])
            }
        }
    }

    return vedtak.map((v) => {
        if (lesteVedtak.includes(v.id)) {
            v.lest = true
        }
        return v
    })
}
