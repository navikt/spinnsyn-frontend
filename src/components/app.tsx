import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import StoreProvider from '../data/stores/store-provider'
import { isMockBackend } from '../utils/environment'
import { Amplitude } from './amplitude/amplitudeProvider'
import RedirectTilOversikt from './feil/redirect-til-oversikt'
import { HotjarTrigger } from './hotjar-trigger'
import VedtakListe from './vedtak-liste/vedtak-liste'
import VedtakSide from './vedtak-side/vedtak-side'

export interface RouteParams {
    id: string;
}

dayjs.locale({
    ...nb,
    weekStart: 1,
})

if (isMockBackend()) {
    require('../data/mock')
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
