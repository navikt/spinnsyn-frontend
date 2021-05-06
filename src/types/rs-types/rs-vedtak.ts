export interface RSVedtakWrapper {
    id: string
    lest: boolean;
    lestDato?: string;
    vedtak: RSVedtak;
    opprettet: string;
    annullert: boolean
}

interface RSVedtak {
    organisasjonsnummer?: string;
    fom: string;
    tom: string;
    dokumenter: Dokument[];
    inntekt?: number;
    sykepengegrunnlag?: number;
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
    type: string;
}

export interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}
