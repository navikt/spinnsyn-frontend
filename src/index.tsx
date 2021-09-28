import 'dayjs/locale/nb'

import dayjs from 'dayjs'
import nb from 'dayjs/locale/nb'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './app'
import env from './utils/environment'

dayjs.locale({
    ...nb,
    weekStart: 1,
})

if (env.isMockBackend()) {
    require('./data/mock')
}

ReactDOM.render(
    <BrowserRouter basename="/syk/sykepenger">
        <App />
    </BrowserRouter>
    , document.getElementById('root') as HTMLElement
)

if (env.isQ1() || env.isProd()) {
    const src = `${env.frontendloggerRoot()}/frontendlogger/logger.js`
    const script = document.createElement('script')
    script.src = src
    script.async = true
    document.body.appendChild(script)
}
