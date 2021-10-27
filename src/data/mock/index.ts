import dayjs from 'dayjs'
import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { flexGatewayRoot } from '../../utils/environment'
import { diverseData, Persona } from './data/personas'
import { nyeVedtak } from './data/rs-vedtak'
import { personas } from './testperson'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})

function setUpMock(persona: Persona) {
    mock.get(`${flexGatewayRoot()}/spinnsyn-backend/api/v2/vedtak`,
        (req, res, ctx) => res(ctx.json(persona.vedtak)))

    mock.post(`${flexGatewayRoot()}/spinnsyn-backend/api/v2/vedtak/:id/les`,
        (req, res, ctx) => {
            const vedtak = nyeVedtak.find((ved: RSVedtakWrapper) =>
                ved.id === req.pathParams.id
            )!
            vedtak.lest = true
            vedtak.lestDato = dayjs().format('YYYY-MM-DD')
            return res(ctx.json({ status: 200 }))
        })
    // Vil ellers feile på CORS policy i labs.
    mock.get('https://www.nav.no/person/innloggingsstatus/auth', (req, res, ctx) =>
        res(ctx.json({}))
    )
}


const url = new URL(window.location.href)

const testperson = url.searchParams.get('testperson')
if (testperson && Object.prototype.hasOwnProperty.call(personas, testperson)) {
    setUpMock(personas[ testperson ]())
} else {
    setUpMock(diverseData)
}
