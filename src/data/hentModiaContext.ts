import { IncomingMessage } from 'http'

import { logger } from '@navikt/next-logger'
import { getToken } from '@navikt/oasis'
import { requestAzureOboToken } from '@navikt/oasis/dist/obo'

import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { isMockBackend } from '../utils/environment'

export async function hentModiaContext(incomingMessage: IncomingMessage): Promise<string | null> {
    if (isMockBackend()) {
        return '01019012345'
    }
    const accessToken = getToken(incomingMessage)
    if (!accessToken) {
        throw new ErrorMedStatus('Mangler accessToken', 401)
    }
    const modiaOboToken = await requestAzureOboToken(accessToken, process.env.MODIACONTEXTHOLDER_SCOPE!)
    if (!modiaOboToken.ok) {
        logger.warn('Kunne ikke hente modiaOboToken.')
        throw new ErrorMedStatus('Kunne ikke hente modiaOboToken.', 500)
    }
    const response = await fetch(`${process.env.MODIACONTEXTHOLDER_URL}/modiacontextholder/api/context/aktivbruker`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${modiaOboToken.token}`,
        },
    })

    if (response.status != 200) {
        logger.warn('Mottok status ' + response.status + ' fra modiaContextHolder.')
        throw new ErrorMedStatus('Ikke 200 svar fra modiaContextHolder.', 500)
    }
    const json = await response.json()
    return json.aktivBruker || null
}
