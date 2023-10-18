import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext } from 'next/types'
import { GetServerSidePropsResult } from 'next'
import { IToggle } from '@unleash/nextjs'
import { DehydratedState } from '@tanstack/react-query'

import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'
import { AuthenticationError } from '../utils/fetch'

import { verifyAzureAccessTokenSpinnsynInterne } from './verifyAzureAccessTokenVedArkivering'
import { verifyIdportenAccessToken } from './verifyIdportenAccessToken'

type PageHandler = (context: GetServerSidePropsContext) => Promise<GetServerSidePropsResult<ServerSidePropsResult>>

export interface ServerSidePropsResult {
    toggles: IToggle[]
    dehydratedState: DehydratedState
}

export function beskyttetSide(handler: PageHandler) {
    return async function withBearerTokenHandler(
        context: GetServerSidePropsContext,
    ): Promise<ReturnType<typeof handler>> {
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
            if (!(e instanceof AuthenticationError)) {
                logger.warn(`Kunne ikke validere token fra ID-porten i beskyttetSide. Error: ${e}.`)
            }
            return wonderwallRedirect
        }
        return handler(context)
    }

    async function beskyttetSideInterne(context: GetServerSidePropsContext): Promise<ReturnType<typeof handler>> {
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
