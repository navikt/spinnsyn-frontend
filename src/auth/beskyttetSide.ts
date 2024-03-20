import { logger } from '@navikt/next-logger'
import { GetServerSidePropsContext } from 'next/types'
import { GetServerSidePropsResult } from 'next'
import { IToggle } from '@unleash/nextjs'
import { DehydratedState } from '@tanstack/react-query'
import { getToken, validateIdportenToken } from '@navikt/oasis'
import { validateAzureToken } from '@navikt/oasis/dist/validate'

import { isMockBackend, spinnsynFrontendInterne } from '../utils/environment'

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
        const token = getToken(context.req)
        if (!token) {
            return wonderwallRedirect
        }
        const validationResult = await validateIdportenToken(token)
        if (!validationResult.ok) {
            const error = new Error(
                `Invalid JWT token found (cause: ${validationResult.error.message}, redirecting to login.`,
                { cause: validationResult.error },
            )

            if (validationResult.errorType === 'token expired') {
                logger.warn(error)
            } else {
                logger.error(error)
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
        const token = getToken(context.req)

        if (!token) {
            return wonderwallRedirect
        }
        const verified = await validateAzureToken(token)
        if (!verified.ok) {
            logger.error('Kunne ikke autentisere.')
            return wonderwallRedirect
        }

        return handler(context)
    }
}
