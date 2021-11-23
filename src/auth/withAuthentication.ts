import http from 'http'
import { NextApiResponse, NextPageContext } from 'next'

import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'
import { isMockBackend } from '../utils/environment'
import { logger } from '../utils/logger'

type ApiHandler = (req: NextRequest, res: NextApiResponse) => void | Promise<unknown>;
type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsPrefetchResult>;

export interface TokenPayload {
    sub: string;
    iss: string;
    client_amr: string;
    pid: string;
    token_type: string;
    client_id: string;
    acr: string;
    scope: string;
    exp: string;
    iat: string;
    client_orgno: string;
    jti: string;
    consumer: {
        authority: string;
        ID: string;
    };
}

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

        const bearerToken: string | null | undefined = request.headers[ 'authorization' ]
        if (!bearerToken) {
            logger.info('Could not find any bearer token on the request. Redirecting to login.')

            return {
                redirect: {
                    destination: '/oauth2/login?redirect=/syk/sykepenger',
                    permanent: false,
                },
            }
        }
        logger.info('Fikk bearer token: ' + bearerToken)
        return handler(context)
    }
}

export interface NextRequest extends http.IncomingMessage {
    cookies: Record<string, string>;
    url: string;
    query: { [ key: string ]: string };
    headers: { [ key: string ]: string };
    body: string | { [ key: string ]: unknown };
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

        return handler(req, res, ...rest)
    }
}

