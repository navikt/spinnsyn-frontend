import { GetServerSidePropsResult } from 'next'
import { DehydratedState } from 'react-query/hydration'

export interface PrefetchResults {
    dehydratedState: DehydratedState;
}

export type GetServerSidePropsPrefetchResult = GetServerSidePropsResult<PrefetchResults>;
