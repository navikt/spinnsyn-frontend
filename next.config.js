/* eslint-disable @typescript-eslint/no-var-requires */
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')

const appDirectives = {
    'connect-src': ["'self'", '*.uxsignals.com'],
    'font-src': ['https://fonts.gstatic.com'],
    'object-src': ['none'],
    'script-src': ['widget.uxsignals.com', 'navtest.boost.ai'],
    'script-src-elem': ["'self'", 'navtest.boost.ai', 'widget.uxsignals.com'],
    'img-src': ["'self'", 'widget.uxsignals.com'],
    'style-src-elem': ["'self'"],
}

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = {
    async headers() {
        const csp = await buildCspHeader(appDirectives, { env: process.env.ENVIRONMENT })

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: csp,
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'no-referrer',
                    },
                ],
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
    eslint: {
        ignoreDuringBuilds: true, // vi linter i bygg stegene i github actions
    },
    basePath: '/syk/sykepenger',
    pageExtensions: ['page.tsx', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX || undefined,
    serverRuntimeConfig: {
        // Will only be available on the server side
        decoratorEnv: process.env.DECORATOR_ENV,
        noDecorator: process.env.NO_DECORATOR,
        utviklingArkivering: process.env.UTVIKLING_ARKIVERING,
        arkivering: process.env.ARKIVERING,
        spinnsynBackendUrl: process.env.SPINNSYN_BACKEND_URL,
        spinnsynBackendTokenxClientId: process.env.SPINNSYN_BACKEND_TOKENX_CLIENT_ID,
        sokosKontoregisterPersonTokenxClientId: process.env.SOKOS_KONTOREGISTER_PERSON_TOKENX_CLIENT_ID,
        spinnsynBackendClientId: process.env.SPINNSYN_BACKEND_CLIENT_ID,
        naisAppImage: process.env.NAIS_APP_IMAGE,
        flexjarBackendTokenxClientId: process.env.FLEXJAR_BACKEND_TOKENX_CLIENT_ID,
    },
    publicRuntimeConfig: {
        // Will be available on both server and client
        basePath: '/syk/sykepenger',
        flexGatewayRoot: process.env.FLEX_GATEWAY_ROOT,
        mockBackend: process.env.MOCK_BACKEND,
        opplaering: process.env.OPPLAERING,
        sykefravaerUrl: process.env.SYKEFRAVAER_URL,
        minSideUrl: process.env.MINSIDE_URL,
        amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
        environment: process.env.ENVIRONMENT,
        spinnsynFrontendInterne: process.env.SPINNSYN_FRONTEND_INTERNE,
        spinnsynFrontendArkivering: process.env.ARKIVERING,
        arkiverteVedtakUrl: process.env.ARKIVERTE_VEDTAK_URL,
        telemetryCollectorURL: process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
        naisAppImage: process.env.NAIS_APP_IMAGE,
        naisAppName: process.env.NAIS_APP_NAME,
    },
}

module.exports = nextConfig
