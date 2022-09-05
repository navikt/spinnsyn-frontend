import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { proxyKallTilBackend } from '../../../proxy/backendproxy'

const { serverRuntimeConfig } = getConfig()

const tillatteApier = ['GET /kontoregister/api/borger/v1/hent-aktiv-konto']

const handler = beskyttetApi(async (req: NextApiRequest, res: NextApiResponse) => {
    await proxyKallTilBackend({
        req,
        res,
        tillatteApier,
        backend: 'sokos-kontoregister-person',
        backendHostname: 'sokos-kontoregister-person.okonomi',
        backendClientId: serverRuntimeConfig.sokosKontoregisterPersonTokenxClientId,
    })
})

export const config = {
    api: {
        bodyParser: false,
        externalResolver: true,
    },
}

export default handler
