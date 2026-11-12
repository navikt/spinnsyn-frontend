import type { NextApiRequest, NextApiResponse } from 'next'

import { checkJwks } from '../../../utils/checkIdportenJwks'
import { erInternFlate, spinnsynFrontendArkivering, spinnsynFrontendSaksbehandler } from '../../../utils/environment'
import { bundledEnv, validerArkiveringEnv, validerHovedappEnv, validerSaksbehandlerEnv } from '../../../utils/env'

type Data = {
    message: string
}

const isReady = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    if (!bundledEnv.NEXT_PUBLIC_MOCK_BACKEND) {
        try {
            if (spinnsynFrontendSaksbehandler()) {
                validerSaksbehandlerEnv()
            } else if (spinnsynFrontendArkivering()) {
                validerArkiveringEnv()
            } else {
                validerHovedappEnv()
            }
        } catch (e) {
            res.status(500).json({ message: `Not ready: server env validation failed — ${e}` })
            return
        }
    }

    // Arkivering og interne flater bruker ikke IDPorten/JWKS
    if (erInternFlate() || spinnsynFrontendArkivering()) {
        res.status(200).json({ message: "I'm ready!" })
        return
    }

    const jwksOk = await checkJwks()
    if (jwksOk) {
        res.status(200).json({ message: "I'm ready!" })
    } else {
        res.status(500).json({ message: 'Not ready: JWKS check failed' })
    }
}

export default isReady
