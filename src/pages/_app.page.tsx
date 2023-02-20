/* eslint-disable postcss-modules/no-unused-class */
import '../style/global.css'
import '../components/basic.css'
import '../components/app.css'
import '../components/person/person.css'
import '../components/banner/banner.css'
import '../components/vedtak-arkivering/vedtak-arkivering.css'
import '../components/vedtak-liste/vedtak-liste.css'
import '../components/vedtak-side/vedtak-side.css'
import '../components/vedtak-side/utbetaling/utbetaling.css'
import '../components/vedtak-side/utbetaling/accordion/inntekt-info/inntekt-info.css'
import '../components/vedtak-side/sykepengedager/sykepengedager.css'
import '../components/vedtak-side/behandling/behandling.css'
import '../components/vedtak-side/avviste-dager/avviste-dager.css'
import '../components/vedtak-side/annullering/annullering.css'
import '../components/ekspanderbar/ekspanderbar.css'
import '../components/inngang/inngangspanel.css'
import '../components/interne-header/interneheader.css'
import '../components/dager/dag-tabell.css'
import '../components/vedtak-side/vedtak-periode/vedtak-periode.css'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren, useState } from 'react'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import { LabsWarning } from '../components/labs-warning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { useFangHotjarEmotion } from '../hooks/useFangHotjarEmotion'

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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    useHandleDecoratorClicks()
    useFangHotjarEmotion()

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
