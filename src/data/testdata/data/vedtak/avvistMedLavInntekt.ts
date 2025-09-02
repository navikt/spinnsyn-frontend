import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const avvistVedtakMedLavInntekt: RSVedtakWrapper = {
    id: '55d8b14f-e1a6-45a8-ac64-b7af1e845b68',
    lest: false,
    organisasjoner: {},
    lestDato: '2021-08-30T13:05:17.337442+02:00',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    andreArbeidsgivere: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999999',
        fom: '2021-08-01',
        tom: '2021-08-21',
        dokumenter: [
            {
                dokumentId: '1aaaf28e-af69-4c9d-8e91-d14a3906361f',
                type: 'Sykmelding',
            },
            {
                dokumentId: '6b1e5fff-3d99-48b9-8ddf-f121da4d88af',
                type: 'Inntektsmelding',
            },
        ],
        inntekt: 20000,
        sykepengegrunnlag: 240000,
        vedtakFattetTidspunkt: '2021-08-22',
        utbetaling: {
            organisasjonsnummer: '896929119',
            utbetalingId: 'b3f4d38e-a68e-4951-9d35-ee1bd6f37736',
            forbrukteSykedager: 0,
            gjenståendeSykedager: 248,
            automatiskBehandling: false,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-08-19',
                        tom: '2021-08-21',
                        dagsats: 0,
                        grad: 0,
                        stønadsdager: 2,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-08-01',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-02',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-03',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-14',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-17',
                    type: 'Fridag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-18',
                    type: 'Fridag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-19',
                    type: 'Fridag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-08-20',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumInntekt'],
                },
                {
                    dato: '2021-08-21',
                    type: 'AvvistDag',
                    begrunnelser: ['EtterDødsdato'],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-08-30T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
