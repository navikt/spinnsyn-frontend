export interface RSVedtakWrapper {
    id: string
    lest: boolean
    lestDato?: string | null
    vedtak: RSVedtak
    opprettetTimestamp: string
    orgnavn: string
    andreArbeidsgivere: AndreArbeidsgivere
    annullert: boolean
    revurdert: boolean
    dagerArbeidsgiver: RSDag[]
    dagerPerson: RSDag[]
    sykepengebelopArbeidsgiver: number
    sykepengebelopPerson: number
    organisasjoner: Record<string, string>
}

export interface RSDag {
    dato: string
    belop: number
    grad: number
    dagtype: RSDagTypeKomplett
    begrunnelser: RSBegrunnelse[]
}

interface GrunnlagForSykepengegrunnlagPerArbeidsgiver {
    [orgnummer: string]: number
}

interface AndreArbeidsgivere {
    [organisasjonsnavn: string]: number
}

export type Begrensning = 'ER_6G_BEGRENSET' | 'ER_IKKE_6G_BEGRENSET' | 'VURDERT_I_INFOTRYGD' | 'VET_IKKE'

interface RSVedtak {
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

interface RSUtbetalingUtbetalt {
    organisasjonsnummer?: string
    foreløpigBeregnetSluttPåSykepenger?: string
    utbetalingId?: string
    forbrukteSykedager: number
    gjenståendeSykedager: number
    automatiskBehandling: boolean
    utbetalingType?: string
}

export type RSBegrunnelse =
    | 'SykepengedagerOppbrukt'
    | 'SykepengedagerOppbruktOver67'
    | 'MinimumInntekt'
    | 'MinimumInntektOver67'
    | 'EgenmeldingUtenforArbeidsgiverperiode'
    | 'MinimumSykdomsgrad'
    | 'ManglerOpptjening'
    | 'ManglerMedlemskap'
    | 'Over70'
    | 'EtterDødsdato'
    | 'AndreYtelserAap'
    | 'AndreYtelserDagpenger'
    | 'AndreYtelserForeldrepenger'
    | 'AndreYtelserOmsorgspenger'
    | 'AndreYtelserOpplaringspenger'
    | 'AndreYtelserPleiepenger'
    | 'AndreYtelserSvangerskapspenger'
    | 'UKJENT'

export type RSDagType =
    | 'NavDag'
    | 'NavHelgDag'
    | 'ArbeidsgiverperiodeDag'
    | 'Arbeidsdag'
    | 'Fridag'
    | 'Feriedag'
    | 'Permisjonsdag'
    | 'AvvistDag'
    | 'ForeldetDag'
    | 'UkjentDag'
export type RSDagTypeExtra = 'NavDagSyk' | 'NavDagDelvisSyk'
export type RSDagTypeKomplett = RSDagType | RSDagTypeExtra

export interface Dokument {
    dokumentId: string
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding'
}

type Sykepengegrunnlagsfakta =
    | {
          fastsatt: 'IInfotrygd'
          omregnetÅrsinntekt: number
      }
    | {
          fastsatt: 'EtterHovedregel'
          arbeidsgivere: Arbeidsgiver[]
          omregnetÅrsinntekt: number
          innrapportertÅrsinntekt: number
          avviksprosent: number
          '6G': number
          tags: string[]
      }
    | ({
          fastsatt: 'EtterSkjønn'
          skjønnsfastsatt: number
          arbeidsgivere: ArbeidsgiverMedSkjønn[]
      } & SpleisSykepengegrunnlag)

type Arbeidsgiver = {
    arbeidsgiver: string
    omregnetÅrsinntekt: number
}

type ArbeidsgiverMedSkjønn = Arbeidsgiver & {
    skjønnsfastsatt: number
}

export type SpleisSykepengegrunnlag = {
    omregnetÅrsinntekt: number
    innrapportertÅrsinntekt: number
    avviksprosent: number
    '6G': number
    tags: '6GBegrenset'[]
}

type Begrunnelse = {
    type:
        | 'SkjønnsfastsattSykepengegrunnlagFritekst'
        | 'SkjønnsfastsattSykepengegrunnlagMal'
        | 'SkjønnsfastsattSykepengegrunnlagKonklusjon'
    begrunnelse: string
    perioder: Periode[]
}

type Periode = {
    fom: string
    tom: string
}
