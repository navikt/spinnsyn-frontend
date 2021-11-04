import getConfig from 'next/config'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { ErrorMedStatus } from './ErrorMedStatus'

const { serverRuntimeConfig } = getConfig()


export const hentVedtak = async(fnr: string, token: string): Promise<RSVedtakWrapper[]> => {

    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v1/arkivering/vedtak`, {
        method: 'GET',
        headers: { 'fnr': fnr, 'Authorization': `Bearer ${token}` }
    })

    if (response.status != 200) {
        throw new ErrorMedStatus('Ikke 200 svar fra spinnsyn-backend', 500)
    }
    return await response.json()
}

