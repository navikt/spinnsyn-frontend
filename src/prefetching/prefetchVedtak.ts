import getConfig from 'next/config'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { IToggle } from '@unleash/nextjs'
import { requestAzureOboToken } from '@navikt/oasis/dist/obo'
import { getToken } from '@navikt/oasis'

import { beskyttetSide } from '../auth/beskyttetSide'
import { hentModiaContext } from '../data/hentModiaContext'
import { hentVedtak } from '../data/hentVedtak'
import { hentVedtakFraSpinnsynBackendForInterne } from '../data/hentVedtakForInterne'
import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'
import { spinnsynFrontendInterne } from '../utils/environment'
import { getFlagsServerSide } from '../toggles/ssr'

const { serverRuntimeConfig } = getConfig()

export const prefetchVedtak = beskyttetSide(async (ctx): Promise<GetServerSidePropsPrefetchResult> => {
    let sykmeldtFnr: string | null = null
    const queryClient = new QueryClient()
    const toggles = [] as IToggle[]
    if (spinnsynFrontendInterne()) {
        sykmeldtFnr = await hentModiaContext(ctx.req!)

        const token = getToken(ctx.req)
        if (!token) {
            throw new Error('Fant ikke token')
        }
        if (sykmeldtFnr) {
            const oboSpinnsynBackend = await requestAzureOboToken(token, serverRuntimeConfig.spinnsynBackendClientId)
            if (!oboSpinnsynBackend.ok) {
                throw new Error('Kunne ikke hente token ' + oboSpinnsynBackend.error.message)
            }

            await queryClient.prefetchQuery({
                queryKey: ['vedtak'],
                queryFn: () => hentVedtakFraSpinnsynBackendForInterne(oboSpinnsynBackend.token, sykmeldtFnr!),
            })
        }
    } else {
        await queryClient.prefetchQuery({
            queryKey: ['vedtak'],
            queryFn: () => {
                return hentVedtak(ctx.req!)
            },
        })
        toggles.push(...(await getFlagsServerSide(ctx.req!, ctx.res)).toggles)
    }
    return {
        props: {
            dehydratedState: dehydrate(queryClient),
            toggles,
            sykmeldtFnr,
        },
    }
})
