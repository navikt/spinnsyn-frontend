import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { HotjarTrigger } from './components/hotjar-trigger'
import RedirectTilOversikt from './pages/feil/redirect-til-oversikt'
import VedtakListe from './pages/vedtak-liste/vedtak-liste'
import VedtakSide from './pages/vedtak-side/vedtak-side'

export interface RouteParams {
    id: string;
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
    )
}

export default App
