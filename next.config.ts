import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr'

const appDirectives = {
    'connect-src': ["'self'", '*.uxsignals.com'],
    'font-src': ['https://fonts.gstatic.com'],
    'object-src': ['none'],
    'script-src': ['widget.uxsignals.com', 'navtest.boost.ai'],
    'script-src-elem': ["'self'", 'navtest.boost.ai', 'widget.uxsignals.com'],
    'img-src': ["'self'", 'widget.uxsignals.com'],
    'style-src-elem': ["'self'"],
}

const nextConfig = {
    async headers() {
        const environment = process.env.ENVIRONMENT === 'prod' ? 'prod' : 'dev'
        const csp = await buildCspHeader(appDirectives, { env: environment })

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
    basePath: '/syk/sykepenger',
    pageExtensions: ['page.tsx', 'api.ts'],
    assetPrefix: process.env.ASSET_PREFIX || undefined,
}

export default nextConfig
