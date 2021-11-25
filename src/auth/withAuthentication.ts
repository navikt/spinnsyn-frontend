import cookie from 'cookie'
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next'

import { verifyIdportenAccessToken } from '../server-utils/verifyIdportenAccessToken'
import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'
import { isMockBackend, loginServiceRedirectUrl, loginServiceUrl } from '../utils/environment'
import { logger } from '../utils/logger'

type ApiHandler = (req: NextApiRequest, res: NextApiResponse) => void | Promise<void>;
type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsPrefetchResult>;


/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will automatically redirect to login if
 * Wonderwall-cookie is missing.
 *
 */
export function withAuthenticatedPage(handler: PageHandler) {
    return async function withBearerTokenHandler(context: NextPageContext): Promise<ReturnType<typeof handler>> {
        if (isMockBackend()) {
            return handler(context)
        }

        const request = context.req
        if (request == null) {
            throw new Error('Context is missing request. This should not happen')
        }
        const loginserviceRedirect = {
            redirect: {
                destination: `${loginServiceUrl()}?redirect=${loginServiceRedirectUrl()}`,
                permanent: false,
            },
        }
        const cookies = cookie.parse(context.req?.headers.cookie || '')
        const selvbetjeningIdtoken = cookies[ 'selvbetjening-idtoken' ]
        if (!selvbetjeningIdtoken) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.')
            return loginserviceRedirect
        }
        try {
            // TODO verifiser loginservice token sin gyldighet
        } catch (e) {
            logger.error('kunne ikke autentisere', e)
            return loginserviceRedirect
        }

        const wonderwallRedirect = {
            redirect: {
                destination: '/oauth2/login?redirect=/syk/sykepenger',
                permanent: false,
            },
        }
        const bearerToken: string | null | undefined = request.headers[ 'authorization' ]
        if (!bearerToken) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.')
            return wonderwallRedirect
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.error('kunne ikke autentisere', e)
            return wonderwallRedirect
        }
        return handler(context)
    }
}


/**
 * Used to authenticate Next.JS pages. Assumes application is behind
 * Wonderwall (https://doc.nais.io/security/auth/idporten/sidecar/). Will deny requests if Wonderwall cookie is missing.
 */
export function withAuthenticatedApi(handler: ApiHandler): ApiHandler {
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

