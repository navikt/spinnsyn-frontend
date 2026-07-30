import '../style/global.css'

import { configureLogger } from '@navikt/next-logger'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactElement, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { getFaro, initInstrumentation, pinoLevelToFaroLevel } from '../faro/faro'
import { basePath } from '../utils/environment'
import { LabsWarning } from '../components/labs-warning/LabsWarning'
import { useHandleDecoratorClicks } from '../hooks/useBreadcrumbs'
import { FlagProvider } from '../toggles/context'
import { ServerSidePropsResult } from '../auth/beskyttetSide'

if (typeof window !== 'undefined') {
    window.addEventListener('error', (e) => {
        console.error('[global error]', e.message, e.filename, e.error)
    })
    window.addEventListener('unhandledrejection', (e) => {
        console.error('[unhandledrejection]', e.reason)
    })
}

initInstrumentation()
try {
    configureLogger({
        basePath: basePath(),
        onLog: (log) =>
            getFaro()?.api.pushLog(log.messages, {
                level: pinoLevelToFaroLevel(log.level.label),
            }),
    })

    console.log('[_app] configureLogger OK, basePath:', basePath())
} catch (e) {
    console.error('[_app] configureLogger feilet:', e)
}

type Skyra = {
    redactPathname: (path: string) => void
    redactSearchParam: (param: string) => void
}

function konfigurerSkyra(skyra: Skyra) {
    skyra.redactPathname('/syk/sykepenger/vedtak/:redacted')
    skyra.redactPathname('/syk/sykepenger/vedtak/arkivering/:redacted')
    skyra.redactSearchParam('id')
}

function MyApp({ Component, pageProps }: AppProps<ServerSidePropsResult>): ReactElement {
    useHandleDecoratorClicks()

    console.log('[_app] MyApp render, toggles:', pageProps?.toggles?.length ?? 'ingen')

    useEffect(() => {
        // @ts-expect-error - skyra er satt opp i dekoratøren
        const skyra = window?.skyra
        if (skyra) {
            konfigurerSkyra(skyra)
        }
    }, [])

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000,
                        networkMode: 'always',
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
