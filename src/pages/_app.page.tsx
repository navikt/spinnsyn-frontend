import '../style/global.css'
import '../components/basic.less'
import '../components/app.less'
import '../components/person/person.less'
import '../components/banner/banner.less'
import '../components/vedtak-arkivering/vedtak-arkivering.less'
import '../components/vedtak-liste/vedtak-liste.less'
import '../components/vedtak-side/vedtak-side.less'
import '../components/vedtak-side/utbetaling/utbetaling.less'
import '../components/vedtak-side/utbetaling/inntekt-info/inntekt-info.less'
import '../components/vedtak-side/sykepengedager/sykepengedager.less'
import '../components/vedtak-side/avviste-dager/avviste-dager.less'
import '../components/vedtak-side/annullering/annullering.less'
import '../components/ekspanderbar/ekspanderbar.less'
import '../components/inngang/inngangspanel.less'
import '../components/interne-header/interneheader.less'
import '../components/dager/dag-tabell.less'
import '../components/vedtak-side/vedtak-periode/vedtak-periode.less'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren, useEffect, useState } from 'react'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import { LabsWarning } from '../components/labs-warning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & {
        dehydratedState: DehydratedState
    }
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

configureLogger({
    basePath: '/syk/sykepenger',
})

function logDeet(xhr: XMLHttpRequest, arg1: any) {
    const responseURL = xhr.responseURL
    console.log('ResponseURL', responseURL)
    if (responseURL.startsWith('https://in.hotjar.com/api/v1/client/sites/118350/feedback/')) {
        if (arg1[0]) {
            const parset = JSON.parse(arg1[0])
            console.log('parset', parset)

            window.alert('Feedback: ' + parset.response.emotion)
        } else {
            console.log('ikke arg 1')
        }
    } else {
        console.log('startet ikke')
    }
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        /* Setting this to true causes the request to be immediately executed after initial
                           mount Even if the query had data hydrated from the server side render */
                        refetchOnMount: false,
                        refetchOnWindowFocus: false,
                    },
                },
            }),
    )

    useEffect(() => {
        function addXMLRequestCallback(callback: any) {
            if ((XMLHttpRequest as any).callbacks) {
                // we've already overridden send() so just add the callback
                ;(XMLHttpRequest as any).callbacks.push(callback)
            } else {
                // create a callback queue
                ;(XMLHttpRequest as any).callbacks = [callback]
                // store the native send()
                const oldSend = XMLHttpRequest.prototype.send as any
                // override the native send()
                XMLHttpRequest.prototype.send = function () {
                    for (let i = 0; i < (XMLHttpRequest as any).callbacks.length; i++) {
                        // eslint-disable-next-line prefer-rest-params
                        ;(XMLHttpRequest as any).callbacks[i](this, arguments)
                    }
                    // call the native send()
                    // eslint-disable-next-line prefer-rest-params
                    oldSend.apply(this, arguments)
                }
            }
        }

        // e.g.

        addXMLRequestCallback(function (xhr: XMLHttpRequest, arg1: any) {
            window.setTimeout(() => {
                logDeet(xhr, arg1)
            }, 500)
        })
    }, [])

    return (
        <>
            <Head>
                <title>Svar på søknader</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <div className="pagewrapper">
                        <div id="root">
                            <LabsWarning />
                            <Component {...pageProps} />
                        </div>
                    </div>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
