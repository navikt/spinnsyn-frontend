import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, validateIdportenToken } from '@navikt/oasis'
import { validateAzureToken } from '@navikt/oasis/dist/validate'

import metrics, { cleanPathForMetric } from '../metrics/metrics'
import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'

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

        const token = getToken(req)
        if (!token) {
            logger.warn('Ingen token mottatt i beskyttetApi')
            return send401()
        }
        const result = await validateIdportenToken(token)
        if (!result.ok) {
            logger.warn('kunne ikke validere idportentoken i beskyttetApi')
            return send401()
        }

        metrics.apiAuthorized.inc({ path: cleanPath }, 1)
        return handler(req, res)
    }
}
