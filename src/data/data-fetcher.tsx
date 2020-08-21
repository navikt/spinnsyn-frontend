import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { Soknad, Sykmelding } from '../types/types'
import { Vedtak } from '../types/vedtak'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setSykmeldinger, setVedtak } = useAppStore()
    const rssoknader = useFetch<RSSoknad[]>()
    const sykmeldinger = useFetch<Sykmelding[]>()
    const vedtak = useFetch<Vedtak[]>()

    useEffect(() => {
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(env.syfoapiRoot + '/syfosoknad/api/soknader', {
                credentials: 'include',
            }, (fetchState: FetchState<RSSoknad[]>) => {
                if (hasData(fetchState)) {
                    setSoknader(fetchState.data!.map(soknad => {
                        return new Soknad(soknad)
                    }))
                }
            })
        }
        if (isNotStarted(vedtak)) {
            vedtak.fetch(env.spinnsynRoot + '/api/v1/vedtak', {
                credentials: 'include',
            }, (fetchState: FetchState<Vedtak[]>) => {
                if (hasData(fetchState)) {
                    setVedtak(fetchState.data)
                }
            })
        }
        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch(env.syforestRoot + '/sykmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [rssoknader]);

    if (hasAny401([ rssoknader, sykmeldinger, vedtak ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ rssoknader, sykmeldinger, vedtak ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ rssoknader, sykmeldinger, vedtak ])) {
        logger.error('Klarer ikke hente en av disse [ rssoknader, sykmeldinger, vedtak ]')
        return <IngenData />
    }

    return props.children
}


export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
