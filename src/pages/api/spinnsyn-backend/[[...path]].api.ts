import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { mockSpinnsynBackend } from '../../../data/testdata/mockSpinnsynBackend'
import { isMockBackend } from '../../../utils/environment'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { getServerEnv } from '../../../utils/env'
import { logger } from '@navikt/next-logger'

const tillatteApier = ['GET /api/v3/vedtak', 'POST /api/v3/vedtak/[uuid]/les']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        return mockSpinnsynBackend(req, res)
    }
    logger.info(`[spinnsyn-backend] ${req.method} ${req.url}`)
    try {
        await proxyKallTilBackend({
            req,
            res,
            tillatteApier,
            backend: 'spinnsyn-backend',
            hostname: 'spinnsyn-backend',
            backendClientId: getServerEnv().SPINNSYN_BACKEND_TOKENX_CLIENT_ID,
            https: false,
        })
        logger.info(`[spinnsyn-backend] proxy ferdig`)
    } catch (e) {
        logger.error(e, `[spinnsyn-backend] proxy feilet`)
        res.status(500).json({ message: 'Proxy feilet' })
    }
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
