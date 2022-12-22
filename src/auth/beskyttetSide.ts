import { logger } from '@navikt/next-logger'
import { NextPageContext } from 'next'

import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'
import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'

import { verifyAzureAccessTokenSpinnsynInterne } from './verifyAzureAccessTokenVedArkivering'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'

type PageHandler = (context: NextPageContext) => void | Promise<GetServerSidePropsPrefetchResult>

export function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(context: NextPageContext): Promise<ReturnType<typeof handler>> {
        if (isMockBackend()) {
            return handler(context)
        }
        if (spinnsynFrontendInterne()) {
            return beskyttetSideInterne(context)
        }

        const request = context.req
        if (request == null) {
            throw new Error('Context is missing request. This should not happen')
        }

        const wonderwallRedirect = {
            redirect: {
                destination: '/oauth2/login?redirect=/syk/sykepenger',
                permanent: false,
            },
        }
        const bearerToken: string | null | undefined = request.headers['authorization']
        if (!bearerToken) {
            return wonderwallRedirect
        }
        try {
            await verifyIdportenAccessToken(bearerToken)
        } catch (e) {
            logger.error(e, 'Kunne ikke validere idporten token på beskyttetSide.')
            return wonderwallRedirect
        }
        return handler(context)
    }

    async function beskyttetSideInterne(context: NextPageContext): Promise<ReturnType<typeof handler>> {
        const request = context.req
        if (request == null) {
            throw new Error('Context is missing request. This should not happen')
        }

        const wonderwallRedirect = {
            redirect: {
                destination: '/oauth2/login?redirect=/syk/sykepenger',
                permanent: false,
            },
        }
        const bearerToken: string | null | undefined = request.headers['authorization']
        if (!bearerToken) {
            return wonderwallRedirect
        }
        try {
            await verifyAzureAccessTokenSpinnsynInterne(bearerToken)
        } catch (e) {
            logger.error(e, 'Kunne ikke autentisere.')
            return wonderwallRedirect
        }
        return handler(context)
    }
}
