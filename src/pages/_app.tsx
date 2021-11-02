import '../style/global.css'
import '../components/app.less'
import '../components/server-vedtak.less'
import '../components/tilbake/tilbake-lenke.less'
import '../components/vedtak-liste/vedtak-liste.less'
import '../components/vedtak-side/vedtak-side.less'
import '../components/vedtak-side/utbetaling/utbetaling.less'
import '../components/vedtak-side/utbetaling/inntekt-info/inntekt-info.less'
import '../components/vedtak-side/uenig/uenig.less'
import '../components/vedtak-side/sykepengedager/sykepengedager.less'
import '../components/vedtak-side/behandling/behandling.less'
import '../components/vedtak-side/avviste-dager/avviste-dager.less'
import '../components/vedtak-side/annullering/annullering.less'
import '../components/utvidbar/utvidbar.less'
import '../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling.less'
import '../components/inngang/inngangspanel.less'
import '../components/dager/dag-tabell.less'
import '../components/brodsmuler/brodsmuler.less'
import '../components/banner/banner.less'
import '../components/vedtak-status/vedtak-status.less'
import '../components/basic.less'
import '../../node_modules/nav-frontend-etiketter-style/src/index.less'

import type { AppProps as NextAppProps } from 'next/app'
import { router } from 'next/client'
import Head from 'next/head'
import React, { PropsWithChildren, useEffect } from 'react'
import { DehydratedState } from 'react-query/hydration'

import { initAmplitude } from '../components/amplitude/amplitude'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & {
        dehydratedState: DehydratedState;
    }
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {

    useEffect(() => {
        if (router.isReady) {
            initAmplitude()
        }
    }, [])

    return (
        <>
            <Head>
                <title>Svar på søknader</title>
                <meta name="robots" content="noindex" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="pagewrapper">
                <div id="root"><Component {...pageProps} /></div>
            </div>
        </>
    )
}

export default MyApp
