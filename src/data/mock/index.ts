import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { soknader } from './data/soknader'
import { vedtakTestdata } from './data/vedtak'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

mock.get(`${env.flexGatewayRoot}/syfosoknad/api/soknader`,
    (req, res, ctx) => res(ctx.json(soknader)))

mock.get(`${env.flexGatewayRoot}/spinnsyn-backend/api/v1/vedtak`,
    (req, res, ctx) => res(ctx.json(vedtakTestdata)))

mock.post(`${env.flexGatewayRoot}/spinnsyn-backend/api/v1/vedtak/:id/les`, () => Promise.resolve({ status: 200 }))

