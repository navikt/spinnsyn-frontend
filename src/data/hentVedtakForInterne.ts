import getConfig from 'next/config'

import { ErrorMedStatus } from '../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'
import { isMockBackend } from '../utils/environment'

import { diverseData } from './testdata/data/personas/personas'

const { serverRuntimeConfig } = getConfig()

export const hentVedtakFraSpinnsynBackendForInterne = async (
    token: string,
    fnr: string,
): Promise<RSVedtakWrapper[]> => {
    if (isMockBackend()) {
        return diverseData.vedtak
    }

    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v4/veileder/vedtak`, {
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
