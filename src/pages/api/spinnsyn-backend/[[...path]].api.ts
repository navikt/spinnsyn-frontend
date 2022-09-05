import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { mockSpinnsynBackend } from '../../../data/testdata/mockSpinnsynBackend'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'

const { serverRuntimeConfig } = getConfig()

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
        backendHostname: 'spinnsyn-backend',
        backendClientId: serverRuntimeConfig.spinnsynBackendTokenxClientId,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
