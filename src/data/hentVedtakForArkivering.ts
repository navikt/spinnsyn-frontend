import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { getServerEnv } from '../utils/env'

export const hentVedtakForArkivering = async (fnr: string, token: string): Promise<RSVedtakWrapper[]> => {
    const response = await fetch(`${getServerEnv().SPINNSYN_BACKEND_URL}/api/v1/arkivering/vedtak`, {
        method: 'GET',
        headers: { fnr: fnr, Authorization: `Bearer ${token}` },
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}
