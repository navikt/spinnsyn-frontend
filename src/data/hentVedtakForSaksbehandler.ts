import { logger } from '@navikt/next-logger'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { isMockBackend } from '../utils/environment'
import { getServerEnv } from '../utils/env'

import { arbeidstakerPerson } from './testdata/data/personas/personas'

export type VedtakForSaksbehandlerResultat =
    { ok: true; vedtak: RSVedtakWrapper[] } | { ok: false; status: 403 | 404 | 502 }

export const hentVedtakForSaksbehandler = async (
    token: string,
    utbetalingId: string,
): Promise<VedtakForSaksbehandlerResultat> => {
    if (isMockBackend()) {
        return { ok: true, vedtak: arbeidstakerPerson.vedtak.map((v, i) => (i === 0 ? { ...v, id: utbetalingId } : v)) }
    }

    const response = await fetch(
        `${getServerEnv().SPINNSYN_BACKEND_URL}/api/v1/saksbehandler/vedtak/${encodeURIComponent(utbetalingId)}`,
        {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
        },
    )

    if (response.status === 403 || response.status === 404) {
        return { ok: false, status: response.status }
    }
    if (!response.ok) {
        logger.error(`Uventet svar fra spinnsyn-backend for saksbehandlervedtak: ${response.status}`)
        return { ok: false, status: 502 }
    }

    const body: { vedtak: RSVedtakWrapper[] } = await response.json()
    return { ok: true, vedtak: body.vedtak }
}
