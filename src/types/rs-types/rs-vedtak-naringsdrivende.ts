import { RSVedtakArbeidstaker } from './rs-vedtak-arbeidstaker'

export interface RSVedtakNaringsdrivende extends Omit<RSVedtakArbeidstaker, 'vedtakstype'> {
    vedtakstype: 'NARINGSDRIVENDE'
    inntekter: Arsinntekt[]
}

export interface Arsinntekt {
    inntektsaar: number
    inntekt: number
}
