import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakAnnullert: RSVedtakWrapper = {
    id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
    lest: true,
    organisasjoner: {},
    lestDato: '2021-05-05T11:50:56.812287Z',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    andreArbeidsgivere: {},
    vedtak: {
        vedtakstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999999',
        fom: '2021-04-27',
        tom: '2021-05-04',
        dokumenter: [
            {
                dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad',
            },
        ],
        inntekt: 37500.0,
        vedtakFattetTidspunkt: '2021-05-04',
        sykepengegrunnlag: 450000,
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-04-27',
                        tom: '2021-05-05',
                        dagsats: 1404,
                        grad: 100,
                        stønadsdager: 6,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-04-27',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-28',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-29',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-04-30',
                    type: 'NavDagSyk',
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
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-05-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-05-05T12:42:42.000Z',
    annullert: true,
    revurdert: false,
}
