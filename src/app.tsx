import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { HotjarTrigger } from './components/hotjar-trigger'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import RedirectTilOversikt from './pages/feil/redirect-til-oversikt'
import { RefreshHvisFeilState } from './pages/feil/refresh-hvis-feil-state'
import VedtakListe from './pages/vedtak-liste/vedtak-liste'
import Vedtak from './pages/vedtak/vedtak'

const App = (): any => {

    ModalWrapper.setAppElement('#root')

    return (
        <StoreProvider>
            <DataFetcher>
                <HotjarTrigger>
                    <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                        <RefreshHvisFeilState>
                            <Switch>
                                <Route exact={true} path="/" component={VedtakListe} />
                                <Route path={'/vedtak/:id'} component={Vedtak} />
                                <Route path={'/vedtak/'} component={RedirectTilOversikt} />
                            </Switch>
                        </RefreshHvisFeilState>
                    </main>
                </HotjarTrigger>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
