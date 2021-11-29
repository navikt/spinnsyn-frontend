import { NextApiRequest, NextApiResponse } from 'next'

import { isMockBackend } from '../utils/environment'
import { logger } from '../utils/logger'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;


export function beskyttetApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res, ...rest) {
        if (isMockBackend()) {
            return handler(req, res, ...rest)
        }

        const bearerToken: string | null | undefined = req.headers[ 'authorization' ]
        if (!bearerToken) {
            res.status(401).json({ message: 'Access denied' })
            return
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.error('kunne ikke autentisere', e)
            res.status(401).json({ message: 'Access denied' })
            return
        }

        return handler(req, res, ...rest)
    }
}

