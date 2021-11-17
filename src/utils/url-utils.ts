import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'

export const getUrlTilVedtak = (vedtak: RSVedtakWrapper) => {
    return `/vedtak/${vedtak.id}${medQuery()}`
}

export const oversiktside = '/'

export const medQuery = () => {
    if (window) {
        if (window.location && window.location.search) {
            return window.location.search
        }
    }
    return ''
}
