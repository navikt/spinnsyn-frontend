import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakRevurdertDirekte: RSVedtakWrapper = {
    id: '21eac584-d8ea-4e4b-bf9a-ae0a400009c4',
    lest: true,
    organisasjoner: {},
    lestDato: '2021-05-03T11:50:56.812287Z',
    orgnavn: 'FLYBUTIKKEN, OSLO',
    andreArbeidsgivere: {},
    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-04-26',
        tom: '2021-05-03',
        dokumenter: [
            {
                dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f',
                type: 'Sykmelding',
            },
            {
                dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                type: 'Søknad',
            },
        ],
        inntekt: 37500.0,
        vedtakFattetTidspunkt: '2021-05-06',
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '1918-11-11',
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-04-26',
                        tom: '2021-05-03',
                        dagsats: 1404,
                        grad: 100,
                        stønadsdager: 9,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-04-26',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-27',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-28',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-29',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-30',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-05-01',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-05-02',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-05-03',
                    type: 'NavDag',
                    begrunnelser: [],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-05-03T12:42:42.000Z',
    annullert: false,
    revurdert: true,
}
