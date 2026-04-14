const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr')
const { BASE_PATH } = require('./constants')

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
    distDir: process.env.NEXT_DIST_DIR || '.next',
    basePath: BASE_PATH,
    pageExtensions: ['page.tsx', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX || undefined,
}

module.exports = nextConfig
