import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'
import { isMockBackend } from '../../../utils/environment'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['GET /api/borger/v1/hent-aktiv-konto']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        res.status(404)
        res.end()
        return
    }
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'sokos-kontoregister-person',
        hostname: 'sokos-kontoregister-person.okonomi',
        backendClientId: serverRuntimeConfig.sokosKontoregisterPersonTokenxClientId,
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
