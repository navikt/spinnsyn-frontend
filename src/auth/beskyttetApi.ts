import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from '@navikt/oasis'
import { validateAzureToken } from '@navikt/oasis/dist/validate'

import metrics, { cleanPathForMetric } from '../metrics/metrics'
import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'

import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>

export function beskyttetApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res) {
        const cleanPath = cleanPathForMetric(req.url!)

        if (isMockBackend()) {
            return handler(req, res)
        }

        if (spinnsynFrontendInterne()) {
            return beskyttetApiInterne(req, res)
        }

        function send401() {
            metrics.apiUnauthorized.inc({ path: cleanPath }, 1)

            res.status(401).json({ message: 'Access denied' })
        }

        async function beskyttetApiInterne(req: NextApiRequest, res: NextApiResponse) {
            const token = getToken(req)
            if (!token) {
                return send401()
            }
            const verified = await validateAzureToken(token)
            if (!verified.ok) {
                logger.warn('kunne ikke validere azuretoken i beskyttetApi')
                return send401()
            }
            return handler(req, res)
        }

        const bearerToken: string | null | undefined = req.headers['authorization']
        if (!bearerToken) {
            return send401()
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.error(e, 'Kunne ikke validere idporten token i beskyttetApi.')
            return send401()
        }

        metrics.apiAuthorized.inc({ path: cleanPath }, 1)
        return handler(req, res)
    }
}
