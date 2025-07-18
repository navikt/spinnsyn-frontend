import { RSVedtakFelles } from './rs-vedtak-felles'

export interface RSVedtakNaringsdrivende extends Omit<RSVedtakFelles, 'vedtakstype'> {
    vedtakstype: 'NARINGSDRIVENDE'
    inntekter: Arsinntekt[]
    justertGjennomsnittligInntekt: number
    sykepengegrunnlag: number
}

export interface Arsinntekt {
    inntektsaar: number
    inntekt: number
}
