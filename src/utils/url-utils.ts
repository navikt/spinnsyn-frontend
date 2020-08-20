import { Vedtak } from '../types/vedtak'

export const getUrlTilVedtak = (vedtak: Vedtak) => {
    return `/vedtak/${vedtak.id}`
}

export const oversiktside = '/'
