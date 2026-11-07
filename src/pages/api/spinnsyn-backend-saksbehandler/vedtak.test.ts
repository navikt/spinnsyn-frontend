// @vitest-environment node
import { NextApiRequest, NextApiResponse } from 'next'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const miljø = vi.hoisted(() => ({
    saksbehandler: true,
    mockBackend: false,
}))

const oasis = vi.hoisted(() => ({
    getToken: vi.fn(),
    validateAzureToken: vi.fn(),
    requestAzureOboToken: vi.fn(),
}))

vi.mock('../../../utils/environment', () => ({
    spinnsynFrontendSaksbehandler: () => miljø.saksbehandler,
    isMockBackend: () => miljø.mockBackend,
}))

vi.mock('../../../utils/env', () => ({
    getServerEnv: () => ({
        SPINNSYN_BACKEND_URL: 'http://spinnsyn-backend',
        SPINNSYN_BACKEND_CLIENT_ID: 'spinnsyn-backend-client-id',
    }),
}))

vi.mock('@navikt/oasis', () => oasis)

vi.mock('@navikt/next-logger', () => ({
    logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}))

import handler from './vedtak.api'

const UTBETALING_ID = '1d0e5ac8-1b3f-4a3f-9d3a-2b4f1c0e9a11'

function lagRequest(query: Record<string, string | string[]> = { id: UTBETALING_ID }, method = 'GET') {
    return { method, query, headers: {} } as unknown as NextApiRequest
}

function lagResponse() {
    const res = {
        statusCode: 0,
        body: undefined as unknown,
        headers: {} as Record<string, string>,
        status(kode: number) {
            res.statusCode = kode
            return res
        },
        json(body: unknown) {
            res.body = body
            return res
        },
        end() {
            return res
        },
        setHeader(navn: string, verdi: string) {
            res.headers[navn] = verdi
            return res
        },
    }
    return res
}

const fetchMock = vi.fn()

describe('saksbehandler vedtak-API', () => {
    beforeEach(() => {
        miljø.saksbehandler = true
        miljø.mockBackend = false
        oasis.getToken.mockReturnValue('brukertoken')
        oasis.validateAzureToken.mockResolvedValue({ ok: true })
        oasis.requestAzureOboToken.mockResolvedValue({ ok: true, token: 'obo-token' })
        fetchMock.mockReset()
        vi.stubGlobal('fetch', fetchMock)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
    })

    it('svarer 404 når appen ikke er saksbehandlervarianten', async () => {
        miljø.saksbehandler = false
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(404)
        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('avviser ugyldig utbetalingId uten å kalle backend', async () => {
        for (const id of ['ikke-en-uuid', '../api/v4/veileder/vedtak', '']) {
            const res = lagResponse()
            await handler(lagRequest({ id }), res as unknown as NextApiResponse)
            expect(res.statusCode).toBe(400)
        }
        const res = lagResponse()
        await handler(lagRequest({ id: [UTBETALING_ID, UTBETALING_ID] }), res as unknown as NextApiResponse)
        expect(res.statusCode).toBe(400)
        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('avviser andre metoder enn GET', async () => {
        const res = lagResponse()

        await handler(lagRequest(undefined, 'POST'), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(405)
    })

    it('svarer 401 uten gyldig token', async () => {
        oasis.validateAzureToken.mockResolvedValue({ ok: false })
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(401)
        expect(fetchMock).not.toHaveBeenCalled()
    })

    it('svarer 500 og ikke 401 når OBO-token feiler', async () => {
        oasis.requestAzureOboToken.mockResolvedValue({ ok: false })
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(500)
    })

    it('kaller backend med OBO-token og returnerer vedtakene uten caching', async () => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ vedtak: [{ id: UTBETALING_ID }] }), { status: 200 }))
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(fetchMock).toHaveBeenCalledWith(
            `http://spinnsyn-backend/api/v1/saksbehandler/vedtak/${UTBETALING_ID}`,
            expect.objectContaining({ headers: { Authorization: 'Bearer obo-token' } }),
        )
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ vedtak: [{ id: UTBETALING_ID }] })
        expect(res.headers['Cache-Control']).toBe('no-store')
    })

    it.each([403, 404])('sender %i fra backend videre', async (status) => {
        fetchMock.mockResolvedValue(new Response(null, { status }))
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(status)
    })

    it('svarer 502 på andre feil fra backend', async () => {
        fetchMock.mockResolvedValue(new Response(null, { status: 503 }))
        const res = lagResponse()

        await handler(lagRequest(), res as unknown as NextApiResponse)

        expect(res.statusCode).toBe(502)
    })
})
