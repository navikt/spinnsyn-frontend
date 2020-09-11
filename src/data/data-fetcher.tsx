import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { Vedtak } from '../types/vedtak'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setVedtak } = useAppStore()
    const vedtak = useFetch<Vedtak[]>()

    useEffect(() => {
        if (isNotStarted(vedtak)) {
            vedtak.fetch(env.spinnsynRoot + '/api/v1/vedtak', {
                credentials: 'include',
            }, (fetchState: FetchState<Vedtak[]>) => {
                if (hasData(fetchState)) {
                    setVedtak(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [vedtak]);

    if (hasAny401([ vedtak ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ vedtak ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ vedtak ])) {
        logger.error('Klarer ikke hente vedtak')
        return <IngenData />
    }

    return props.children
}

export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
