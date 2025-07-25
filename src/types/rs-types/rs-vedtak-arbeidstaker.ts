import { RSVedtakFelles } from './rs-vedtak-felles'

export interface RSVedtakArbeidstaker extends Omit<RSVedtakFelles, 'vedtakstype'> {
    vedtakstype: 'ARBEIDSTAKER'
    organisasjonsnummer?: string
    inntekt?: number
    grunnlagForSykepengegrunnlagPerArbeidsgiver?: GrunnlagForSykepengegrunnlagPerArbeidsgiver
}

interface GrunnlagForSykepengegrunnlagPerArbeidsgiver {
    [orgnummer: string]: number
}
