import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

export function korrigerYrkesaktivitetstype(v: RSVedtakWrapper): RSVedtakWrapper {
    v.vedtak.yrkesaktivitetstype = v.vedtak.yrkesaktivitetstype || 'ARBEIDSTAKER'
    return v
}
