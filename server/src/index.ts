import express from 'express'
import path from 'path'

import { getHtmlWithDecorator } from './dekorator'
import { logger } from './logger'

const buildPath = path.resolve(__dirname, '../build')
const basePath = '/syk/sykepenger'
const server = express()

server.use(express.json())
server.disable('x-powered-by')

server.get('/', (req, res) => {
    res.redirect(basePath)
})

server.get(`${basePath}/env-config-server.js`, (req, res) => {
    res.contentType('application/javascript; charset=UTF-8')
    disableCache(res)
    res.send(`window._env_ = {
    SYFOSOKNAD_PROXY_ROOT: '${process.env.SYFOSOKNAD_PROXY_ROOT}',
    SYKMELDINGER_BACKEND_PROXY_ROOT: '${process.env.SYKMELDINGER_BACKEND_PROXY_ROOT}',
    SPINNSYN_ROOT: '${process.env.SPINNSYN_ROOT}',
    FLEX_GATEWAY_ROOT: '${process.env.FLEX_GATEWAY_ROOT}',
    UNLEASH_URL: '${process.env.UNLEASH_URL}',
    LOGINSERVICE_URL: '${process.env.LOGINSERVICE_URL}',
    LOGINSERVICE_REDIRECT_URL: '${process.env.LOGINSERVICE_REDIRECT_URL}',
    DITTNAV_URL: '${process.env.DITTNAV_URL}',
    SYKEFRAVAER_URL: '${process.env.SYKEFRAVAER_URL}',
    MOCK_BACKEND: '${process.env.MOCK_BACKEND}',
    ENVIRONMENT: '${process.env.ENVIRONMENT}',
    AMPLITUDE_KEY: '${process.env.AMPLITUDE_KEY}',
    AMPLITUDE_ENABLED: '${process.env.AMPLITUDE_ENABLED}',
    OPPLAERING: '${process.env.OPPLAERING}',
}`)
})

server.use(`${basePath}`, express.static(buildPath, { index: false }))
server.get('/internal/isAlive|isReady', (req, res) =>
    res.sendStatus(200)
)

server.use('*', (req, res) =>
    getHtmlWithDecorator(`${buildPath}/index.html`)
        .then((html) => {
            disableCache(res)
            res.send(html)
        })
        .catch((e) => {
            logger.error(e)
            disableCache(res)
            res.status(500).send(e)
        })
)

function disableCache(res) {
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.setHeader('Expires', '-1')
}

const port = process.env.PORT || 8080
server.listen(port, () => logger.info(`App listening on port: ${port}`))
