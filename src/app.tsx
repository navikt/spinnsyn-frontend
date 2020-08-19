import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { HotjarTrigger } from './components/hotjar-trigger'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import VedtakListe from './pages/vedtak-liste/vedtak-liste'
import Vedtak from './pages/vedtak/vedtak'

const App = (): any => {

    ModalWrapper.setAppElement('#root')

    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <HotjarTrigger>
                        <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                            <Switch>
                                <Route exact={true} path="/" component={VedtakListe} />
                                <Route path={'/vedtak/:id'} component={Vedtak} />
                            </Switch>
                        </main>
                    </HotjarTrigger>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
