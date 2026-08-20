import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { isMockBackend } from '../utils/environment'
import { getServerEnv } from '../utils/env'

import { arbeidstakerPerson } from './testdata/data/personas/personas'

export const hentVedtakFraSpinnsynBackendForInterne = async (
    token: string,
    fnr: string,
): Promise<RSVedtakWrapper[]> => {
    if (isMockBackend()) {
        return arbeidstakerPerson.vedtak
    }

    const response = await fetch(`${getServerEnv().SPINNSYN_BACKEND_URL}/api/v4/veileder/vedtak`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'sykmeldt-fnr': fnr,
        },
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}
