import cookie from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { isMockBackend } from '../utils/environment'
import { logger } from '../utils/logger'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'
import { validerLoginserviceToken } from './verifyLoginserviceAccessToken'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;


export function beskyttetApi(handler: ApiHandler): ApiHandler {
    return async function withBearerTokenHandler(req, res, ...rest) {
        if (isMockBackend()) {
            return handler(req, res, ...rest)
        }

        function send401() {
            res.status(401).json({ message: 'Access denied' })
        }

        const cookies = cookie.parse(req?.headers.cookie || '')
        const selvbetjeningIdtoken = cookies[ 'selvbetjening-idtoken' ]
        if (!selvbetjeningIdtoken) {
            return send401()
        }
        try {
            await validerLoginserviceToken(selvbetjeningIdtoken)
        } catch (e) {
            logger.warn('kunne ikke autentisere', e)
            return send401()
        }

        const bearerToken: string | null | undefined = req.headers[ 'authorization' ]
        if (!bearerToken) {
            return send401()
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.warn('kunne ikke autentisere', e)
            return send401()
        }

        return handler(req, res, ...rest)
    }
}

