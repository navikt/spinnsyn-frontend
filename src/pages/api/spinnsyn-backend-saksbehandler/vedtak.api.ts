import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, requestAzureOboToken, validateAzureToken } from '@navikt/oasis'
import { logger } from '@navikt/next-logger'

import { arbeidstakerPerson } from '../../../data/testdata/data/personas/personas'
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
        return res.status(200).json({ vedtak: arbeidstakerPerson.vedtak.map((v, i) => (i === 0 ? { ...v, id } : v)) })
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

    const response = await fetch(
        `${getServerEnv().SPINNSYN_BACKEND_URL}/api/v1/saksbehandler/vedtak/${encodeURIComponent(id)}`,
        {
            method: 'GET',
            headers: { Authorization: `Bearer ${spinnsynObo.token}` },
        },
    )

    if (response.status === 403 || response.status === 404) {
        return res.status(response.status).end()
    }
    if (!response.ok) {
        logger.error(`Uventet svar fra spinnsyn-backend for saksbehandlervedtak: ${response.status}`)
        return res.status(502).end()
    }

    return res.status(200).json(await response.json())
}

export default handler
