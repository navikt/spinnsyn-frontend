import { IncomingMessage } from 'http'
import getConfig from 'next/config'

import { getTokenxToken } from '../auth/tokenx'
import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { isMockBackend } from '../utils/environment'
import { hentTestdata } from './mock/hentTestdata'

const { serverRuntimeConfig } = getConfig()


function hentMockVedtak(url?: string): RSVedtakWrapper[] {
    return hentTestdata(url)
}


export async function hentVedtak(incomingMessage: IncomingMessage): Promise<RSVedtakWrapper[]> {
    if (isMockBackend()) {
        return hentMockVedtak(incomingMessage.url)
    } else {
        return hentVedtakFraSpinnsynBackend(incomingMessage)
    }
}


const hentVedtakFraSpinnsynBackend = async(incomingMessage: IncomingMessage): Promise<RSVedtakWrapper[]> => {

    const idportenToken = incomingMessage.headers.authorization!.split(' ')[ 1 ]
    const tokenxToken = await getTokenxToken(idportenToken, 'dev-gcp:flex-spinnsyn-backend')
    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v3/vedtak`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${tokenxToken}` }
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}

