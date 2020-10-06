import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { Inntektsmelding } from '../types/inntektsmelding'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { Soknad } from '../types/types'
import { Vedtak } from '../types/vedtak'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setVedtak, setInntektsmeldinger } = useAppStore()
    const rssoknader = useFetch<RSSoknad[]>()
    const vedtak = useFetch<Vedtak[]>()
    const inntektsmeldinger = useFetch<Inntektsmelding[]>()

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

        if (!env.isProd && isNotStarted(inntektsmeldinger)) {
            inntektsmeldinger.fetch(env.flexinntektsmeldingRoot + '/api/v1/inntektsmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Inntektsmelding[]>) => {
                if (hasData(fetchState)) {
                    setInntektsmeldinger(fetchState.data)
                }
            })
        }
        // eslint-disable-next-line
    }, [rssoknader, vedtak]);

    if (hasAny401([ rssoknader, vedtak ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ vedtak ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ rssoknader, vedtak ])) {
        logger.error('Klarer ikke hente en av disse [ rssoknader, vedtak ]')
        return <IngenData />
    }

    return props.children
}

export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
