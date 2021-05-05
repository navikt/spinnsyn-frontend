import { Dokument } from '../vedtak'

export interface RSVedtakWrapper {
    id: string
    lest: boolean;
    lestDato?: string;
    vedtak: RSVedtak;
    opprettet: string;
    annullert: boolean
}

interface RSVedtak {
    organisasjonsnummer: string;
    fom: string;
    tom: string;
    dokumenter: Dokument[];
    inntekt?: number;
    sykepengegrunnlag?: number;
    utbetaling: RSUtbetalingUtbetalt;
}

interface RSUtbetalingUtbetalt {
    organisasjonsnummer: string;
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
    dagsats: number;
    totalbeløp: number;
    grad: number;
}

interface RSUtbetalingdag {
    dato: string;
    type: string;
}
