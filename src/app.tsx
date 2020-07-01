import './app.less'

import ModalWrapper from 'nav-frontend-modal'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Amplitude } from './components/amplitude/amplitudeProvider'
import { DataFetcher } from './data/data-fetcher'
import StoreProvider from './data/stores/store-provider'
import Startside from './pages/startside'

const App = (): any => {

    ModalWrapper.setAppElement('#root')

    return (
        <StoreProvider>
            <DataFetcher>
                <Amplitude>
                    <main id="maincontent" role="main" tabIndex={-1}>
                        <Switch>
                            <Route exact={true} path="/" component={Startside} />
                        </Switch>
                    </main>
                </Amplitude>
            </DataFetcher>
        </StoreProvider>
    )
}

export default App
