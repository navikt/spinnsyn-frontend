import { Readable, Stream } from 'stream'

import { NextApiRequest, NextApiResponse } from 'next'
import { v4 as uuidv4 } from 'uuid'
import { logger } from '@navikt/next-logger'

import { cleanPathForMetric } from '../../metrics/metrics'
import { isIntegrationtest } from '../../utils/environment'

export async function mockFlexjar(req: NextApiRequest, res: NextApiResponse) {
    const api = `${req.method} ${cleanPathForMetric(req.url!.replace('/api/flexjar-backend', ''))}`
    const reqBody = await parseRequest<object>(req)
    if (!isIntegrationtest()) {
        logger.info(`Mocker kall til ${api} med body: ${JSON.stringify(reqBody)}`)
    }

    if (api.startsWith('POST /api/v2/feedback')) {
        return res.status(201).json({ id: uuidv4() })
    }
    if (api.startsWith('PUT /api/v2/feedback/[uuid]')) {
        return res.status(204).send(null)
    }
    logger.warn(`404: ukjent api: ${api}.`)

    res.status(404)
    res.end()
}

async function parseRequest<T>(req: NextApiRequest): Promise<T> {
    const stream = Readable.from(req)
    const buffer = await stream2buffer(stream)
    const jsonString = buffer.toString()
    return JSON.parse(jsonString)
}

async function stream2buffer(stream: Stream): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        const buffer = Array<Uint8Array>()
        stream.on('data', (chunk) => buffer.push(chunk))
        stream.on('end', () => resolve(Buffer.concat(buffer)))
        stream.on('error', (err) => reject(`error converting stream - ${err}`))
    })
}
