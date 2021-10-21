import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { HotjarTrigger } from './components/hotjar-trigger'
import StoreProvider from './data/stores/store-provider'
import RedirectTilOversikt from './pages-cra/feil/redirect-til-oversikt'
import VedtakListe from './pages-cra/vedtak-liste/vedtak-liste'
import VedtakSide from './pages-cra/vedtak-side/vedtak-side'
import env from './utils/environment'

export interface RouteParams {
    id: string;
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

if (env.isMockBackend()) {
    require('./data/mock')
}

const App = (): any => {

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: 1,
                refetchOnWindowFocus: false,
                staleTime: Infinity,
            },
        },
    })

    ModalWrapper.setAppElement('#root')

    return (
        <BrowserRouter basename="/syk/sykepenger">
            <StoreProvider>
                <QueryClientProvider client={queryClient}>
                    <Amplitude>
                        <HotjarTrigger>
                            <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                                <Switch>
                                    <Route exact={true} path="/" component={VedtakListe} />
                                    <Route path={'/vedtak/:id'} component={VedtakSide} />
                                    <Route path={'/vedtak/'} component={RedirectTilOversikt} />
                                </Switch>
                            </main>
                        </HotjarTrigger>
                    </Amplitude>
                </QueryClientProvider>
            </StoreProvider>
        </BrowserRouter>
    )
}

export default App
