import '../style/global.css'

import { configureLogger } from '@navikt/next-logger'
import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React, { ReactElement, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro'
import { basePath } from '../utils/environment'
import { LabsWarning } from '../components/labs-warning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { FlagProvider } from '../toggles/context'
import { ServerSidePropsResult } from '../auth/beskyttetSide'

dayjs.locale({
    ...nb,
    weekStart: 1,
})

initInstrumentation()
configureLogger({
    basePath: basePath(),
    onLog: (log) =>
        getFaro()?.api.pushLog(log.messages, {
            level: pinoLevelToFaroLevel(log.level.label),
        }),
})

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    useHandleDecoratorClicks()

    useEffect(() => {
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactSearchParam('id')
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepenger/vedtak/:redacted')
        // @ts-expect-error - skyra er satt opp i dekoratøren
        window?.skyra?.redactPathname('/syk/sykepenger/vedtak/arkivering/:redacted')
    }, [])

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
            <FlagProvider toggles={pageProps.toggles}>
                <QueryClientProvider client={queryClient}>
                    <div id="root" className="mx-auto max-w-2xl p-4 pb-32">
                        <LabsWarning />
                        <Component {...pageProps} />
                    </div>
                </QueryClientProvider>
            </FlagProvider>
        </>
    )
}

export default MyApp
