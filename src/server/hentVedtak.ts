import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

export const hentVedtak = async(fnr: string, token: string): Promise<RSVedtakWrapper[]> => {
    const response = await fetch('http://spinnsyn-backend/api/v1/arkivering/vedtak', {
        method: 'GET',
        headers: { 'fnr': fnr, 'Authorization': `Bearer ${token}` }
    })

    if (response.status != 200) {
        throw Error('Ikke 200 response fra spinnsyn backend')
    }
    return await response.json()
}

