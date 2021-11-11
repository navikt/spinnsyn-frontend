export interface RSVedtakWrapper {
    id: string
    lest: boolean;
    lestDato?: string;
    vedtak: RSVedtak;
    opprettet: string;
    orgnavn: string;
    annullert: boolean;
    revurdert: boolean;
    dager: RSDag[];
    dagligUtbetalingsbelop: number;
    antallDagerMedUtbetaling: number;
    sykepengebelop: number;
}

export interface RSDag {
    dato: string;
    belop: number;
    grad: number;
    dagtype: RSDagTypeKomplett;
    begrunnelser: RSBegrunnelse[];
}

interface GrunnlagForSykepengegrunnlagPerArbeidsgiver {
    [ orgnummer: string ]: number;
}

interface RSVedtak {
    organisasjonsnummer?: string;
    fom: string;
    tom: string;
    dokumenter: Dokument[];
    inntekt?: number;
    sykepengegrunnlag?: number;
    grunnlagForSykepengegrunnlag?: number;
    grunnlagForSykepengegrunnlagPerArbeidsgiver?: GrunnlagForSykepengegrunnlagPerArbeidsgiver,
    begrensning?: string;
    utbetaling: RSUtbetalingUtbetalt;
}

interface RSUtbetalingUtbetalt {
    organisasjonsnummer?: string;
    utbetalingId?: string;
    forbrukteSykedager: number;
    gjenståendeSykedager: number;
    automatiskBehandling: boolean;
    arbeidsgiverOppdrag: RSOppdrag;
    utbetalingsdager: RSUtbetalingdag[];
}

interface RSOppdrag {
    mottaker: string;
    nettoBeløp: number;
    utbetalingslinjer: RSUtbetalingslinje[];
}

export interface RSUtbetalingslinje {
    fom: string;
    tom: string;
    grad: number;
    stønadsdager: number;
    dagsats: number;
    totalbeløp: number;
}

interface RSUtbetalingdag {
    dato: string;
    type: RSDagType;
    begrunnelser?: RSBegrunnelse[]
}

export type RSBegrunnelse = 'SykepengedagerOppbrukt'
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
    'NavDag'
    | 'NavHelgDag'
    | 'ArbeidsgiverperiodeDag'
    | 'Arbeidsdag'
    | 'Fridag'
    | 'AvvistDag'
    | 'ForeldetDag'
    | 'UkjentDag'
export type RSDagTypeExtra = 'NavDagSyk' | 'NavDagDelvisSyk'
export type RSDagTypeKomplett = RSDagType | RSDagTypeExtra

export interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}
