import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

import { isMockBackend } from '../../../../../utils/environment'
import { logger } from '../../../../../utils/logger'

const handler = (req: NextApiRequest, res: NextApiResponse): void => {

    const id = req.query.id as string
    logger.info('Leser vedtak ' + id)
    if (isMockBackend()) {
        res.setHeader('Set-Cookie', serialize('lest-vedtak-' + id, id, {
            path: '/syk/sykepenger/api',
            httpOnly: true,
            maxAge: 10,
        }))
        res.status(200).json({ ok: 'ogit sk' })

    } else {
        res.status(200).json({ ok: 'ok' })

    }
}

export default handler
