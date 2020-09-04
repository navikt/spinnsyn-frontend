import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { jsonDeepCopy } from '../../utils/json-deep-copy'
import { soknaderIntegration } from './data/soknader-integration'
import { soknaderOpplaering } from './data/soknader-opplaering'
import { sykmeldinger } from './data/sykmeldinger'
import { vedtakTestdata } from './data/vedtak'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

const soknader = [ ...jsonDeepCopy(soknaderOpplaering) ]
if (!env.isOpplaering) {
    soknader.push(...jsonDeepCopy(soknaderIntegration))
}

mock.get(`${env.syfoapiRoot}/syfosoknad/api/soknader`,
    (req, res, ctx) => res(ctx.json(soknader)))

mock.get(`${env.sykmeldingerBackendProxyRoot}/api/v1/syforest/sykmeldinger`,
    (req, res, ctx) => res(ctx.json(sykmeldinger)))

mock.get(`${env.spinnsynRoot}/api/v1/vedtak`,
    (req, res, ctx) => res(ctx.json(vedtakTestdata)))

mock.post(`${env.spinnsynRoot}/api/v1/vedtak/:id/les`, () => Promise.resolve({ status: 200 }))
