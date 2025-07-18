export interface RSVedtakWrapper {
    id: string
    lest: boolean
    lestDato?: string | null
    vedtak: RsVedtakFelles
    opprettetTimestamp: string
    orgnavn: string
    andreArbeidsgivere: AndreArbeidsgivere
    annullert: boolean
    revurdert: boolean
    organisasjoner: Record<string, string>
}

export interface RSVedtakWrapperUtvidet extends RSVedtakWrapper {
    dagerArbeidsgiver: RSDag[]
    dagerPerson: RSDag[]
    sykepengebelopArbeidsgiver: number
    sykepengebelopPerson: number
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

export interface AndreArbeidsgivere {
    [organisasjonsnavn: string]: number
}

export type Begrensning = 'ER_6G_BEGRENSET' | 'ER_IKKE_6G_BEGRENSET' | 'VURDERT_I_INFOTRYGD' | 'VET_IKKE'

interface RsVedtakFelles {
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
    arbeidsgiverOppdrag?: RSOppdrag
    personOppdrag?: RSOppdrag | null
    utbetalingsdager?: RSUtbetalingdag[]
}

export interface RSOppdrag {
    utbetalingslinjer: RSUtbetalingslinje[]
}

export interface RSUtbetalingdag {
    dato: string
    type: RSDagTypeKomplett
    begrunnelser: RSBegrunnelse[]
}

export interface RSUtbetalingslinje {
    fom: string
    tom: string
    dagsats: number
    totalbeløp?: number
    grad: number
    stønadsdager: number
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
    | 'ArbeidIkkeGjenopptattDag'
    | 'AndreYtelser'
    | 'UkjentDag'
export type RSDagTypeExtra = 'NavDagSyk' | 'NavDagDelvisSyk' | 'NavDagDelvisSykUnder20'
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

export type BegrunnelseType =
    | 'SkjønnsfastsattSykepengegrunnlagFritekst'
    | 'SkjønnsfastsattSykepengegrunnlagMal'
    | 'SkjønnsfastsattSykepengegrunnlagKonklusjon'
    | 'Avslag'
    | 'DelvisInnvilgelse'
    | 'Innvilgelse'

export type Begrunnelse = {
    type: BegrunnelseType
    begrunnelse: string
    perioder: Periode[]
}

type Periode = {
    fom: string
    tom: string
}
