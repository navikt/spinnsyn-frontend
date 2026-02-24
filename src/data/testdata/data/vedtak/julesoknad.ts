import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const julesoknadVedtak: RSVedtakWrapper = {
    id: '348a5462-456a-4bfc-9b54-11cd77a99bbb',
    lest: false,
    organisasjoner: {},
    orgnavn: 'MATBUTIKKEN AS',
    andreArbeidsgivere: {},
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '972674818',
        fom: '2023-12-01',
        tom: '2023-12-24',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad',
            },
        ],
        inntekt: 55000,
        sykepengegrunnlag: 638394,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '972674818': 660000,
        },
        begrensning: 'ER_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2023-12-10',
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2023-12-01',
                        tom: '2023-12-24',
                        dagsats: 2455,
                        grad: 100,
                        stønadsdager: 10,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2023-12-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-02',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-03',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-09',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-10',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-12',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-13',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-16',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-17',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-19',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-20',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-22',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-23',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-12-24',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
            ],
        },
        tags: ['IngenNyArbeidsgiverperiode', 'SykepengegrunnlagUnder2G'],
    },
    opprettetTimestamp: '2023-12-10T12:00:00.000000',
    annullert: false,
    revurdert: false,
}
