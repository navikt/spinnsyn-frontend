import { IncomingMessage } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'

import { getAzureAdAccessToken } from '../auth/getAzureAdAccessToken'
import { getOboAccessToken } from '../auth/getOboAccessToken'
import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { logger } from '../utils/logger'

export async function hentModiaContext(incomingMessage: IncomingMessage): Promise<string | undefined> {

    const accessToken = incomingMessage.headers.authorization!.split(' ')[ 1 ]

    const [ modiaContextAccessToken, flexFssProxyToken ] = await Promise.all([
        await getOboAccessToken(accessToken, 'https://graph.microsoft.com/.default'),
        await getAzureAdAccessToken('api://dev-fss.flex.flex-fss-proxy/.default'),
    ])

    const response = await fetch('https://flex-fss-proxy.dev-fss-pub.nais.io/modiacontextholder/api/context/aktivbruker', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${flexFssProxyToken.access_token}`,
            XAuthorization: `Bearer ${accessToken}`,
            Cookie: `isso-accesstoken=${modiaContextAccessToken}`,
        }
    })

    if (response.status != 200) {
        logger.error('Status ' + response.status + ' fra modia contexthodler')
        throw new ErrorMedStatus('Ikke 200 svar fra modiacontextholder', 500)
    }
    const json = await response.json()
    return json.aktivBruker

}
