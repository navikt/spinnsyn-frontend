import { GetServerSidePropsResult } from 'next'
import { DehydratedState } from '@tanstack/react-query'

export interface PrefetchResults {
    dehydratedState: DehydratedState
    sykmeldtFnr: string | null
}

export type GetServerSidePropsPrefetchResult = GetServerSidePropsResult<PrefetchResults>
