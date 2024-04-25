import { serialize } from 'cookie'
import { NextApiRequest, NextApiResponse } from 'next'

import { cleanPathForMetric } from '../../metrics/metrics'

import { hentMockVedtak } from './hentTestdata'

function lesVedtak(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query!.path![3] as string
    res.setHeader(
        'Set-Cookie',
        serialize(`lest-vedtak-${id}`, id, {
            path: '/syk/sykepenger/api',
            httpOnly: true,
            maxAge: 10,
        }),
    )
    res.status(200).json({ ok: 'ok' })
    res.end()
}

function hentVedtak(req: NextApiRequest, res: NextApiResponse) {
    res.status(200)
    res.json(hentMockVedtak(req, req.cookies))

    res.end()
}

async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function mockSpinnsynBackend(req: NextApiRequest, res: NextApiResponse) {
    // sleep random between 0 and 1 seconds
    await sleep(Math.floor(Math.random() * 1000))

    const api = `${req.method} ${cleanPathForMetric(req.url!.replace('/api/spinnsyn-backend', ''))}`

    if (api.startsWith('POST /api/v3/vedtak/[uuid]/les')) {
        return lesVedtak(req, res)
    }
    if (api.startsWith('GET /api/v3/vedtak')) {
        return hentVedtak(req, res)
    }

    res.status(404)
    res.end()
}
