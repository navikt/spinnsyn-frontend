import { Begrensning, Begrunnelse, Dokument } from './rs-vedtak-felles'
import { RSUtbetalingUtbetalt, Sykepengegrunnlagsfakta } from './rs-vedtak-felles'

export interface RSVedtakArbeidstaker {
    vedtakstype: 'ARBEIDSTAKER'
    organisasjonsnummer?: string
    fom: string
    tom: string
    dokumenter: Dokument[]
    inntekt?: number
    sykepengegrunnlag?: number
    grunnlagForSykepengegrunnlag?: number
    grunnlagForSykepengegrunnlagPerArbeidsgiver?: GrunnlagForSykepengegrunnlagPerArbeidsgiver
    begrensning?: Begrensning
    utbetaling: RSUtbetalingUtbetalt
    vedtakFattetTidspunkt?: string
    sykepengegrunnlagsfakta?: Sykepengegrunnlagsfakta | null
    begrunnelser?: Begrunnelse[]
    tags?: string[]
}

interface GrunnlagForSykepengegrunnlagPerArbeidsgiver {
    [orgnummer: string]: number
}
