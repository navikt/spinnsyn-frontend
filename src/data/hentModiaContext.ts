import { IncomingMessage } from 'http'

import { logger } from '@navikt/next-logger'

import { getOboAccessToken } from '../auth/getOboAccessToken'
import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { isMockBackend } from '../utils/environment'

export async function hentModiaContext(incomingMessage: IncomingMessage): Promise<string | null> {
    if (isMockBackend()) {
        return '01019012345'
    }
    const accessToken = incomingMessage.headers.authorization!.split(' ')[1]

    const modiaOboToken = await getOboAccessToken(accessToken, process.env.MODIACONTEXTHOLDER_SCOPE!)

    const response = await fetch(`${process.env.MODIACONTEXTHOLDER_URL}/modiacontextholder/api/context/aktivbruker`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${modiaOboToken}`,
        },
    })

    if (response.status != 200) {
        logger.warn('Mottok status ' + response.status + ' fra modiaContextHolder.')
        throw new ErrorMedStatus('Ikke 200 svar fra modiaContextHolder.', 500)
    }
    const json = await response.json()
    return json.aktivBruker || null
}
