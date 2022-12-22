import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'

import metrics, { cleanPathForMetric } from '../metrics/metrics'
import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'

import { verifyAzureAccessTokenSpinnsynInterne } from './verifyAzureAccessTokenVedArkivering'
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
            const bearerToken: string | null | undefined = req.headers['authorization']
            if (!bearerToken) {
                return send401()
            }
            try {
                await verifyAzureAccessTokenSpinnsynInterne(bearerToken)
            } catch (e) {
                logger.error(e, 'Kunne ikke autentisere.')
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
