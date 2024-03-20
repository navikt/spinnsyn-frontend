import { IncomingMessage } from 'http'

import getConfig from 'next/config'
import { getToken, requestOboToken } from '@navikt/oasis'

import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { isMockBackend } from '../utils/environment'

import { hentMockVedtak } from './testdata/hentTestdata'

const { serverRuntimeConfig } = getConfig()

export async function hentVedtak(
    incomingMessage: IncomingMessage,
    cookies?: { [p: string]: string },
): Promise<RSVedtakWrapper[]> {
    if (isMockBackend()) {
        return hentMockVedtak(incomingMessage, cookies)
    } else {
        return hentVedtakFraSpinnsynBackend(incomingMessage)
    }
}

const hentVedtakFraSpinnsynBackend = async (incomingMessage: IncomingMessage): Promise<RSVedtakWrapper[]> => {
    const token = getToken(incomingMessage)
    if (!token) {
        throw new ErrorMedStatus('Fant ikke token', 401)
    }
    const idportenToken = incomingMessage.headers.authorization!.split(' ')[1]

    const tokenX = await requestOboToken(idportenToken, serverRuntimeConfig.spinnsynBackendTokenxClientId)
    if (!tokenX.ok) {
        throw new Error(
            `Unable to exchange token for ${serverRuntimeConfig.spinnsynBackendTokenxClientId} token,reason: ${tokenX.error.message}`,
            {
                cause: tokenX.error,
            },
        )
    }

    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v3/vedtak`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokenX.token}` },
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}
