import { GetServerSidePropsResult } from 'next'
import { DehydratedState } from '@tanstack/react-query'
import { IToggle } from '@unleash/nextjs'

export interface PrefetchResults {
    dehydratedState: DehydratedState
    sykmeldtFnr: string | null
    toggles: IToggle[]
}

export type GetServerSidePropsPrefetchResult = GetServerSidePropsResult<PrefetchResults>
