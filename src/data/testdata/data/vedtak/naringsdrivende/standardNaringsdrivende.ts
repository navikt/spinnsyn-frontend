import { RSVedtakWrapper } from '../../../../../types/rs-types/rs-vedtak-felles'

export const standardNaringsdrivende: RSVedtakWrapper = {
    id: 'standard-vedtak-naringsdrivende',
    orgnavn: 'Wooley Socks ENK',
    vedtak: {
        vedtakstype: 'NARINGSDRIVENDE',
        inntekter: [
            {
                inntektsaar: 2022,
                inntekt: 500_000,
            },
            {
                inntektsaar: 2023,
                inntekt: 600_000,
            },
            {
                inntektsaar: 2024,
                inntekt: 700_000,
            },
        ],
        justertGjennomsnittligInntekt: 666_666,
        sykepengegrunnlag: 780_960,
        begrensning: 'ER_6G_BEGRENSET',
        fom: '2023-08-01',
        tom: '2023-08-31',
        utbetaling: {
            organisasjonsnummer: '123456789',
            utbetalingId: 'utbetaling1',
            forbrukteSykedager: 31,
            gjenståendeSykedager: 248,
            automatiskBehandling: true,
            foreløpigBeregnetSluttPåSykepenger: '2024-12-31',
            utbetalingType: 'UTBETALING',
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2023-01-01',
                        tom: '2023-12-31',
                        dagsats: 2000,
                        stønadsdager: 20,
                        grad: 100,
                    },
                ],
            },
            utbetalingsdager: [],
        },
        dokumenter: [
            { dokumentId: 'dokument1', type: 'Søknad' },
            { dokumentId: 'dokument2', type: 'Sykmelding' },
        ],
    },
    lest: false,
    organisasjoner: {},
    lestDato: null,
    opprettetTimestamp: '',
    andreArbeidsgivere: {},
    annullert: false,
    revurdert: false,
}
