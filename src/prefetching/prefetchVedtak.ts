import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { beskyttetSide } from '../auth/beskyttetSide'
import { hentVedtak } from '../data/hentVedtak'
import { GetServerSidePropsPrefetchResult } from '../types/prefecthing'

export const prefetchVedtak = beskyttetSide(async(ctx): Promise<GetServerSidePropsPrefetchResult> => {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery('vedtak', () => {
        return hentVedtak(ctx.req!)
    })

    return {
        props: { dehydratedState: dehydrate(queryClient) }
    }
})
