import cookie from 'cookie'
import { NextPageContext } from 'next'

import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'
import { isMockBackend, loginServiceRedirectUrl, loginServiceUrl } from '../utils/environment'
import { logger } from '../utils/logger'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'
import { validerLoginserviceToken } from './verifyLoginserviceAccessToken'

type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsPrefetchResult>;


export function beskyttetSide(handler: PageHandler) {
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
            return loginserviceRedirect
        }
        try {
            await validerLoginserviceToken(selvbetjeningIdtoken)
        } catch (e) {
            logger.warn('kunne ikke autentisere', e)
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

