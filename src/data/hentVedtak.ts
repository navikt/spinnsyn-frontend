import { IncomingMessage } from 'http'
import getConfig from 'next/config'

import { getTokenxToken } from '../auth/getTokenxToken'
import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { isMockBackend } from '../utils/environment'
import { hentTestdata } from './mock/hentTestdata'

const { serverRuntimeConfig } = getConfig()


function hentMockVedtak(incomingMessage: IncomingMessage, cookies?: { [ p: string ]: string }): RSVedtakWrapper[] {
    const vedtak = hentTestdata(incomingMessage.url)
    const lesteVedtak = [] as string[]
    if (cookies) {
        for (const c in cookies) {
            if (c.startsWith('lest-vedtak')) {
                lesteVedtak.push(cookies[ c ])
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


export async function hentVedtak(incomingMessage: IncomingMessage, cookies?: { [ p: string ]: string }): Promise<RSVedtakWrapper[]> {
    if (isMockBackend()) {
        return hentMockVedtak(incomingMessage, cookies)
    } else {
        return hentVedtakFraSpinnsynBackend(incomingMessage)
    }
}


const hentVedtakFraSpinnsynBackend = async(incomingMessage: IncomingMessage): Promise<RSVedtakWrapper[]> => {

    const idportenToken = incomingMessage.headers.authorization!.split(' ')[ 1 ]
    const tokenxToken = await getTokenxToken(idportenToken, serverRuntimeConfig.spinnsynBackendTokenxClientId)
    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v3/vedtak`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokenxToken}` }
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}

