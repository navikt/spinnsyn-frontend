import type { NextApiRequest, NextApiResponse } from 'next'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { hentVedtak } from '../../../data/hentVedtak'

const handler = beskyttetApi(async(req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        return res.status(404).json('Må være GET')
    }
    const vedtakene = await hentVedtak(req, req.cookies)

    res.status(200).json(vedtakene)
})

export default handler
