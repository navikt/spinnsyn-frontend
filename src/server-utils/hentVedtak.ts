import getConfig from 'next/config'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

const { serverRuntimeConfig } = getConfig()


export const hentVedtak = async(fnr: string, token: string): Promise<RSVedtakWrapper[]> => {
    const response = await fetch(`${serverRuntimeConfig.spinnsynBackendUrl}/api/v1/arkivering/vedtak`, {
        method: 'GET',
        headers: { 'fnr': fnr, 'Authorization': `Bearer ${token}` }
    })

    if (response.status != 200) {
        throw Error('Ikke 200 response fra spinnsyn backend')
    }
    return await response.json()
}

