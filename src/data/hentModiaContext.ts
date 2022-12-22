import { IncomingMessage } from 'http'

import { logger } from '@navikt/next-logger'
import getConfig from 'next/config'

import { getAzureAdAccessToken } from '../auth/getAzureAdAccessToken'
import { getOboAccessToken } from '../auth/getOboAccessToken'
import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { isMockBackend } from '../utils/environment'

const { serverRuntimeConfig } = getConfig()

export async function hentModiaContext(incomingMessage: IncomingMessage): Promise<string | null> {
    if (isMockBackend()) {
        return '01019012345'
    }
    const accessToken = incomingMessage.headers.authorization!.split(' ')[1]

    const [modiaContextAccessToken, flexFssProxyToken] = await Promise.all([
        await getOboAccessToken(accessToken, 'https://graph.microsoft.com/.default'),
        await getAzureAdAccessToken(serverRuntimeConfig.flexFssProxyClientId),
    ])

    const response = await fetch(`${serverRuntimeConfig.flexFssProxyUrl}/modiacontextholder/api/context/aktivbruker`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${flexFssProxyToken.access_token}`,
            XAuthorization: `Bearer ${accessToken}`,
            Cookie: `isso-accesstoken=${modiaContextAccessToken}`,
        },
    })

    if (response.status != 200) {
        logger.warn('Mottok status ' + response.status + ' fra modiaContextHolder.')
        throw new ErrorMedStatus('Ikke 200 svar fra modiaContextHolder.', 500)
    }
    const json = await response.json()
    return json.aktivBruker || null
}
