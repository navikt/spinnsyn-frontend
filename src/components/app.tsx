
import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ArkiveringContext } from '../context/arkivering-context'
import { isMockBackend } from '../utils/environment'
import RedirectTilOversikt from './feil/redirect-til-oversikt'
import VedtakListe from './vedtak-liste/vedtak-liste'
import VedtakSide from './vedtak-side/vedtak-side'

export interface RouteParams {
    id: string;
}


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
            <ArkiveringContext.Provider value={false}>
                <QueryClientProvider client={queryClient}>
                    <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                        <Switch>
                            <Route exact={true} path="/" component={VedtakListe} />
                            <Route path={'/vedtak/:id'} component={VedtakSide} />
                            <Route path={'/vedtak/'} component={RedirectTilOversikt} />
                        </Switch>
                    </main>
                </QueryClientProvider>
            </ArkiveringContext.Provider>
        </BrowserRouter>
    )
}

export default App
