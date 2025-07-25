import { IncomingMessage } from 'http'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../utils/json-deep-copy'

import { PersonaKey, testpersoner } from './testperson'

export function hentTestdata(url?: string) {
    const parsetUrl = new URL(`https://test${url}`)

    const testperson = parsetUrl.searchParams.get('testperson')
    if (testperson && Object.prototype.hasOwnProperty.call(testpersoner, testperson)) {
        return jsonDeepCopy(testpersoner[testperson as PersonaKey]!.vedtak)
    } else {
        return jsonDeepCopy(testpersoner['diverse-data']!.vedtak)
    }
}

export function hentMockVedtak(
    incomingMessage: IncomingMessage,
    cookies?: Partial<{
        [key: string]: string
    }>,
): RSVedtakWrapper[] {
    const vedtak = hentTestdata(incomingMessage.url)
    const lesteVedtak = [] as string[]
    if (cookies) {
        for (const c in cookies) {
            if (c.startsWith('lest-vedtak')) {
                lesteVedtak.push(cookies[c]!)
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
