import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import Soknader from './pages/soknader/soknader'

const App = (): any => {

    ModalWrapper.setAppElement('#root')

    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                        <Switch>
                            <Route exact={true} path="/" component={Soknader} />
                        </Switch>
                    </main>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
