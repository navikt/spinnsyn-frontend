import { Dokument } from '../vedtak'

export interface RSVedtakWrapper {
    id: string
    lest: boolean;
    lestDato?: Date;
    vedtak: RSVedtak;
    opprettet: Date;
    annullert: boolean
}

interface RSVedtak {
    organisasjonsnummer: string;
    fom: Date;
    tom: Date;
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
    fom: Date;
    tom: Date;
    dagsats: number;
    totalbeløp: number;
    grad: number;
}

interface RSUtbetalingdag {
    dato: Date;
    type: string;
}
