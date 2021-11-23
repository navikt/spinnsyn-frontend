import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { withAuthenticatedPage } from '../auth/withAuthentication'
import { hentVedtak } from '../data/hentVedtak'
import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'

export const prefetchVedtak = withAuthenticatedPage(async(ctx): Promise<GetServerSidePropsPrefetchResult> => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('vedtak', () => {
        return hentVedtak(ctx.req!)
    })

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
})
