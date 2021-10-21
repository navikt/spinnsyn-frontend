/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')

module.exports = withLess({
    lessLoaderOptions: {},
    publicRuntimeConfig: {
        // Will be available on both server and client
        loginserviceUrl: process.env.LOGINSERVICE_URL,
        sykmeldingerBackendProxyRoot: process.env.SYKMELDINGER_BACKEND_PROXY_ROOT,
        flexGatewayRoot: process.env.FLEX_GATEWAY_ROOT,
        mockBackend: process.env.MOCK_BACKEND,
        opplaering: process.env.OPPLAERING,
        loginServiceRedirectUrl: process.env.LOGINSERVICE_REDIRECT_URL,
        sykefravaerUrl: process.env.SYKEFRAVAER_URL,
        dittNavUrl: process.env.DITTNAV_URL,
        amplitudeKey: process.env.AMPLITUDE_KEY,
        amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
        environment: process.env.ENVIRONMENT,
    },
})
