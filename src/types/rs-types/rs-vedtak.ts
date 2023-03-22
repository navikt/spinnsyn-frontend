export interface    RSVedtakWrapper {
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
