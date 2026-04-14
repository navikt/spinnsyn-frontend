import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { mockSpinnsynBackend } from '../../../data/testdata/mockSpinnsynBackend'
import { isMockBackend } from '../../../utils/environment'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'

const tillatteApier = ['GET /api/v3/vedtak', 'POST /api/v3/vedtak/[uuid]/les']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        return mockSpinnsynBackend(req, res)
    }
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'spinnsyn-backend',
        hostname: 'spinnsyn-backend',
        backendClientId: process.env.SPINNSYN_BACKEND_TOKENX_CLIENT_ID,
        https: false,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
