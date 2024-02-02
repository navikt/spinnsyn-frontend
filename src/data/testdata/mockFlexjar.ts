import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'

import { cleanPathForMetric } from '../../metrics/metrics'

export function mockFlexjar(req: NextApiRequest, res: NextApiResponse) {
    const api = `${req.method} ${cleanPathForMetric(req.url!.replace('/api/spinnsyn-backend', ''))}`

    if (api.startsWith('POST /api/v2/feedback')) {
        return res.status(201).json({ id: uuidv4() })
    }
    if (api.startsWith('PUT /api/v2/feedback/[uuid]')) {
        return res.status(204).json({})
    }

    res.status(404)
    res.end()
}
