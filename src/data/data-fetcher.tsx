import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { Soknad } from '../types/types'
import { Vedtak } from '../types/vedtak'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const { setSoknader, setVedtak, setRsVedtak } = useAppStore()
    const rssoknader = useFetch<RSSoknad[]>()
    const vedtak = useFetch<Vedtak[]>()
    const rsVedtak = useFetch<RSVedtakWrapper[]>()

    useEffect(() => {
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(env.flexGatewayRoot + '/syfosoknad/api/soknader', {
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
            vedtak.fetch(env.flexGatewayRoot + '/spinnsyn-backend/api/v1/vedtak', {
                credentials: 'include',
            }, (fetchState: FetchState<Vedtak[]>) => {
                if (hasData(fetchState)) {
                    setVedtak(fetchState.data)
                }
            })
        }

        if (isNotStarted(rsVedtak)) {
            rsVedtak.fetch(env.flexGatewayRoot + '/spinnsyn-backend/api/v2/vedtak', {
                credentials: 'include',
            }, (fetchState: FetchState<RSVedtakWrapper[]>) => {
                if (hasData(fetchState)) {
                    setRsVedtak(fetchState.data)
                }
            })
        }

        // eslint-disable-next-line
    }, [rssoknader, vedtak, rsVedtak]);

    if (hasAny401([ rssoknader, vedtak, rsVedtak ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ vedtak, rsVedtak ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ rssoknader, vedtak, rsVedtak ])) {
        logger.error('Klarer ikke hente en av disse [ rssoknader, vedtak, rsVedtak ]')
        return <IngenData />
    }

    return props.children
}

export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
