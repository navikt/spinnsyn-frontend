import type { NextApiRequest, NextApiResponse } from 'next'

import { hentVedtak } from '../../../data/hentVedtak'

const handler = async(req: NextApiRequest, res: NextApiResponse) => {

    const vedtakene = await hentVedtak(req)


    const lesteVedtak = [] as string[]
    for (const c in req.cookies) {
        if (c.startsWith('lest-vedtak')) {
            lesteVedtak.push(req.cookies[ c ])
        }
    }
    res.status(200).json(vedtakene.map((v) => {
        if (lesteVedtak.includes(v.id)) {
            v.lest = true
        }
        return v
    }))
}

export default handler
