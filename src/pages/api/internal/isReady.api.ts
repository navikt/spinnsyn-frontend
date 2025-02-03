import type { NextApiRequest, NextApiResponse } from 'next'

import { checkJwks } from '../../../utils/checkIdportenJwks'
import { spinnsynFrontendArkivering, spinnsynFrontendInterne } from '../../../utils/environment'

type Data = {
    message: string
}

const isReady = async (req: NextApiRequest, res: NextApiResponse<Data>): Promise<void> => {
    if (spinnsynFrontendInterne() || spinnsynFrontendArkivering()) {
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
