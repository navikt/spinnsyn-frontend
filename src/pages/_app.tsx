import '../style/global.css'
import '../components/basic.less'
import '../components/app.less'
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
import '../components/brodsmuler/brodsmuler.less'
import '../components/banner/banner.less'
import '../components/vedtak-side/vedtak-periode/vedtak-periode.less'

import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren, useState } from 'react'
import { DehydratedState, Hydrate, QueryClient, QueryClientProvider } from 'react-query'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & {
        dehydratedState: DehydratedState
    }
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
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
            })
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
                            <Component {...pageProps} />
                        </div>
                    </div>
                </Hydrate>
            </QueryClientProvider>
        </>
    )
}

export default MyApp
