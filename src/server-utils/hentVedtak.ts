import getConfig from 'next/config'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { logger } from '../utils/logger'

const { serverRuntimeConfig } = getConfig()


export const hentVedtak = async(fnr: string, token: string): Promise<RSVedtakWrapper[]> => {
    const url = `${serverRuntimeConfig.spinnsynBackendUrl}/api/v1/arkivering/vedtak`
    logger.info('Henter fra ' + url)
    const response = await fetch(url, {
        method: 'GET',
        headers: { 'fnr': fnr, 'Authorization': `Bearer ${token}` }
    })

    if (response.status != 200) {
        throw Error('Ikke 200 response fra spinnsyn backend')
    }
    return await response.json()
}

