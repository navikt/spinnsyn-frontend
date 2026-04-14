import { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'
import { mockFlexjar } from '../../../data/testdata/mockFlexjar'

const tillatteApier = ['POST /api/v1/feedback', 'POST /api/v2/feedback', 'PUT /api/v2/feedback/[uuid]']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        return mockFlexjar(req, res)
    }
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'flexjar-backend',
        hostname: 'flexjar-backend',
        backendClientId: process.env.FLEXJAR_BACKEND_TOKENX_CLIENT_ID,
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
