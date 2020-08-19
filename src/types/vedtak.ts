export interface Vedtak {
    id: string;
    lest: boolean;
    opprettet: string;
    vedtak: VedtakDto;
}

export interface VedtakDto {
    fom: string;
    tom: string;
    forbrukteSykedager: number;
    gjenståendeSykedager: number;
    utbetalinger: UtbetalingDto[];
    dokumenter: Dokument[];
}

export interface UtbetalingDto {
    mottaker: string;
    fagområde: string;
    totalbeløp: number;
    utbetalingslinjer: UtbetalingslinjeDto[];
}

export interface UtbetalingslinjeDto {
    fom: string;
    tom: string;
    dagsats: number;
    beløp: number;
    grad: number;
    sykedager: number;
}

interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}
