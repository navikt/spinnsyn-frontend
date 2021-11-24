import { IncomingMessage } from 'http'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { isMockBackend } from '../utils/environment'
import { hentTestdata } from './mock/hentTestdata'

function hentMockVedtak(url?: string): RSVedtakWrapper[] {
    return hentTestdata(url)
}


export async function hentVedtak(incomingMessage: IncomingMessage): Promise<RSVedtakWrapper[]> {
    if (isMockBackend()) {
        return hentMockVedtak(incomingMessage.url)
    } else {
        //TODO hent fra spinnsynbackend
        return hentMockVedtak(incomingMessage.url)
    }
}
