export interface Vedtak {
    id: string;
    lest: boolean;
    opprettet: string;
    vedtak: VedtakDto;
    annullert: boolean;
}

export interface VedtakDto {
    automatiskBehandling: boolean,
    fom: string;
    tom: string;
    månedsinntekt?: number;
    sykepengegrunnlag?: number;
    forbrukteSykedager: number;     // Dager brukt minus helg
    gjenståendeSykedager: number;
    utbetalinger: UtbetalingDto[];
    dokumenter: Dokument[];
}

export interface UtbetalingDto {
    mottaker: string;   // fnr eller org
    fagområde: string;  // SP eller SPREF
    totalbeløp: number; // Totalen for en av de over
    utbetalingslinjer: UtbetalingslinjeDto[];   // Alle utbetalinger, fordelt over mindre perioder
}

export interface UtbetalingslinjeDto {
    fom: string;
    tom: string;
    dagsats: number;    // Det inntektsmeldingen sier man tjener
    beløp: number;      // Det som dekkes, basert på sykegrad og 6G
    grad: number;       // Sykegrad 20, 40, 60, 80, 100
    sykedager: number;  // Sykedager brukt, minus helg
}

export interface Dokument {
    dokumentId: string;
    type: 'Sykmelding' | 'Søknad' | 'Inntektsmelding';
}
