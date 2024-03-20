import { proxyApiRouteRequest } from '@navikt/next-api-proxy'
import { logger } from '@navikt/next-logger'
import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, requestOboToken } from '@navikt/oasis'

import { cleanPathForMetric } from '../metrics/metrics'

interface Opts {
    req: NextApiRequest
    res: NextApiResponse
    tillatteApier: string[]
    backend: string
    hostname: string
    backendClientId?: string
    https: boolean
}

export async function proxyKallTilBackend(opts: Opts) {
    const rewritedPath = opts.req.url!.replace(`/api/${opts.backend}`, '')
    const api = `${opts.req.method} ${rewritedPath}`
    if (!opts.tillatteApier.includes(<string>cleanPathForMetric(api))) {
        logger.warn(`404: ukjent api: ${api}.`)
        opts.res.status(404)
        opts.res.send(null)
        return
    }
    logger.info('Proxy til backend kalt ' + opts.req.url)

    async function bearerToken(): Promise<string | undefined> {
        if (opts.backendClientId) {
            const idportenToken = getToken(opts.req)
            if (!idportenToken) {
                throw new Error('Mangler authorization header')
            }
            const tokenX = await requestOboToken(idportenToken, opts.backendClientId)
            if (!tokenX.ok) {
                throw new Error(
                    `Unable to exchange token for ${opts.backendClientId} token,reason: ${tokenX.error.message}`,
                    {
                        cause: tokenX.error,
                    },
                )
            }
            return tokenX.token
        }
        return undefined
    }

    await proxyApiRouteRequest({ ...opts, path: rewritedPath, bearerToken: await bearerToken() })
}
