/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')

const csp = {
    'default-src': ["'none'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://www.google-analytics.com',
        'https://nav.psplugin.com',
        'https://ta-survey-v2.herokuapp.com',
        'https://surveystats.hotjar.io',
    ],
    'img-src': ["'self'", 'data:', 'https://*.nav.no', 'https://www.google-analytics.com', 'https://script.hotjar.com'],
    'font-src': ["'self'", 'data:', 'https://*.psplugin.com', 'https://script.hotjar.com'],
    'frame-src': ["'self'", 'data:', 'https://vars.hotjar.com'],
    'worker-src': ['blob:', '*.nais.io'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://*.nav.no'],
    'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://*.nav.no',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://static.hotjar.com',
        'https://script.hotjar.com',
        'https://in2.taskanalytics.com',
        'https://account.psplugin.com',
    ],
}

const cspString = Object.entries(csp)
    .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
    .join('; ')

const cspHeader = [
    {
        key: 'Content-Security-Policy',
        value: cspString,
    },
]

module.exports = withPlugins(
    [
        [withLess],
        [
            (nextConfig) =>
                process.env.ENABLE_SENTRY
                    ? withSentryConfig(nextConfig, {
                          silent: true,
                      })
                    : nextConfig,
        ],
    ],
    {
        async headers() {
            return [
                {
                    source: '/:path*',
                    headers: cspHeader,
                },
                {
                    source: '/api/:path*',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
                        },
                    ],
                },
            ]
        },
        basePath: '/syk/sykepenger',
        lessLoaderOptions: {},
        assetPrefix: process.env.ASSET_PREFIX || '',
        serverRuntimeConfig: {
            // Will only be available on the server side
            decoratorEnv: process.env.DECORATOR_ENV,
            noDecorator: process.env.NO_DECORATOR,
            utviklingArkivering: process.env.UTVIKLING_ARKIVERING,
            arkivering: process.env.ARKIVERING,
            spinnsynBackendUrl: process.env.SPINNSYN_BACKEND_URL,
            spinnsynBackendTokenxClientId: process.env.SPINNSYN_BACKEND_TOKENX_CLIENT_ID,
            azureAppClientId: process.env.AZURE_APP_CLIENT_ID,
            azureAppClientSecret: process.env.AZURE_APP_CLIENT_SECRET,
            azureOpenidConfigTokenEndpoint: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT,
            azureAppWellKnownUrl: process.env.AZURE_APP_WELL_KNOWN_URL,
            azureAppPreAuthorizedApps: process.env.AZURE_APP_PRE_AUTHORIZED_APPS,
            spinnsynBackendClientId: process.env.SPINNSYN_BACKEND_CLIENT_ID,
            flexFssProxyClientId: process.env.FLEX_FSS_PROXY_CLIENT_ID,
            flexFssProxyUrl: process.env.FLEX_FSS_PROXY_URL,
            idportenClientId: process.env.IDPORTEN_CLIENT_ID,
            idportenWellKnownUrl: process.env.IDPORTEN_WELL_KNOWN_URL,
            naisAppImage: process.env.NAIS_APP_IMAGE,
            loginserviceUrl: process.env.LOGINSERVICE_URL,
            loginServiceRedirectUrl: process.env.LOGINSERVICE_REDIRECT_URL,
            loginserviceIdportenDiscoveryUrl: process.env.LOGINSERVICE_IDPORTEN_DISCOVERY_URL,
            loginserviceIdportenAudience: process.env.LOGINSERVICE_IDPORTEN_AUDIENCE,
            tokenXWellKnownUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
            tokenXPrivateJwk: process.env.TOKEN_X_PRIVATE_JWK,
            tokenXClientId: process.env.TOKEN_X_CLIENT_ID,
        },
        publicRuntimeConfig: {
            // Will be available on both server and client
            flexGatewayRoot: process.env.FLEX_GATEWAY_ROOT,
            mockBackend: process.env.MOCK_BACKEND,
            opplaering: process.env.OPPLAERING,
            sykefravaerUrl: process.env.SYKEFRAVAER_URL,
            dittNavUrl: process.env.DITTNAV_URL,
            amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
            environment: process.env.ENVIRONMENT,
            spinnsynFrontendInterne: process.env.SPINNSYN_FRONTEND_INTERNE,
            arkiverteVedtakUrl: process.env.ARKIVERTE_VEDTAK_URL,
        },
    }
)
