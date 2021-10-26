import '../style/global.css'
import '../app.less'
import '../pages-cra/vedtak-liste/vedtak-liste.less'
import '../pages-cra/vedtak-side/vedtak-side.less'
import '../pages-cra/vedtak-side/utbetaling/utbetaling.less'
import '../pages-cra/vedtak-side/utbetaling/inntekt-info/inntekt-info.less'
import '../pages-cra/vedtak-side/uenig/uenig.less'
import '../pages-cra/vedtak-side/sykepengedager/sykepengedager.less'
import '../pages-cra/vedtak-side/behandling/behandling.less'
import '../pages-cra/vedtak-side/avviste-dager/avviste-dager.less'
import '../pages-cra/vedtak-side/annullering/annullering.less'
import '../components/utvidbar/utvidbar.less'
import '../components/teaser/saksbehandlingstid-og-utbetaling/saksbehandlingstid-og-utbetaling.less'
import '../components/inngang/inngangspanel.less'
import '../components/dager/dag-tabell.less'
import '../components/brodsmuler/brodsmuler.less'
import '../components/banner/banner.less'
import '../components/vedtak-status/vedtak-status.less'
import '../app.less'
import '../basic.less'
import '../../node_modules/nav-frontend-etiketter-style/src/index.less'

import type { AppProps as NextAppProps } from 'next/app'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { DehydratedState } from 'react-query/hydration'

interface AppProps extends Omit<NextAppProps, 'pageProps'> {
    pageProps: PropsWithChildren<unknown> & {
        dehydratedState: DehydratedState;
    };
}

function MyApp({ Component, pageProps }: AppProps): JSX.Element {


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
