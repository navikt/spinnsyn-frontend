import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { HotjarTrigger } from './components/hotjar-trigger'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import RedirectTilOversikt from './pages/feil/redirect-til-oversikt'
import { RefreshHvisFeilState } from './pages/feil/refresh-hvis-feil-state'
import VedtakListe from './pages/vedtak-liste/vedtak-liste'
import VedtakSide from './pages/vedtak-side/vedtak-side'

export interface RouteParams {
    id: string;
}

const App = (): any => {

    ModalWrapper.setAppElement('#root')

    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <HotjarTrigger>
                        <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                            <RefreshHvisFeilState>
                                <Switch>
                                    <Route exact={true} path="/" component={VedtakListe} />
                                    <Route path={'/vedtak/:id'} component={VedtakSide} />
                                    <Route path={'/vedtak/'} component={RedirectTilOversikt} />
                                </Switch>
                            </RefreshHvisFeilState>
                        </main>
                    </HotjarTrigger>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
