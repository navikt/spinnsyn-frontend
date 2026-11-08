import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, requestAzureOboToken, validateAzureToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'

import { hentVedtakForSaksbehandler } from '../../../data/hentVedtakForSaksbehandler'
import { isMockBackend, spinnsynFrontendSaksbehandler } from '../../../utils/environment'
import { getServerEnv } from '../../../utils/env'

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!spinnsynFrontendSaksbehandler()) {
        return res.status(404).end()
    }
    if (req.method !== 'GET') {
        return res.status(405).end()
    }
    res.setHeader('Cache-Control', 'no-store')

    const id = req.query.id
    if (typeof id !== 'string' || !UUID_REGEX.test(id)) {
        return res.status(400).json({ message: 'Ugyldig utbetalingId.' })
    }

    if (isMockBackend()) {
        const resultat = await hentVedtakForSaksbehandler('', id)
        return resultat.ok ? res.status(200).json({ vedtak: resultat.vedtak }) : res.status(resultat.status).end()
    }

    const accessToken = getToken(req)
    if (!accessToken) {
        return res.status(401).json({ message: 'Mangler autorisasjonstoken.' })
    }
    const validert = await validateAzureToken(accessToken)
    if (!validert.ok) {
        return res.status(401).json({ message: 'Feil i autorisasjonstoken.' })
    }

    // 401 til klienten gir reload av siden, så OBO-feil returneres som 500 for å unngå reload-løkke
    const spinnsynObo = await requestAzureOboToken(accessToken, getServerEnv().SPINNSYN_BACKEND_CLIENT_ID!)
    if (!spinnsynObo.ok) {
        logger.error('Kunne ikke hente OBO-token for spinnsyn-backend i saksbehandlerflaten')
        return res.status(500).json({ message: 'Kunne ikke hente token.' })
    }

    const resultat = await hentVedtakForSaksbehandler(spinnsynObo.token, id)
    if (!resultat.ok) {
        return res.status(resultat.status).end()
    }
    return res.status(200).json({ vedtak: resultat.vedtak })
}

export default handler
