import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const kombinertDirekteOgRefusjonDelvisInnvilget: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946da',
    lest: false,
    organisasjoner: {},
    orgnavn: 'MATBUTIKKEN AS',
    andreArbeidsgivere: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '972674818',
        fom: '2021-02-04',
        tom: '2021-02-21',
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
        vedtakFattetTidspunkt: '2021-02-21',
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 12,
            gjenståendeSykedager: 248,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-02-04',
                        tom: '2021-02-05',
                        dagsats: 2455,
                        grad: 100,
                        stønadsdager: 12,
                    },
                ],
            },
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-21',
                        dagsats: 2455,
                        grad: 100,
                        stønadsdager: 12,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-02-04',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerOpptjening'],
                },
                {
                    dato: '2021-02-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-10',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerOpptjening'],
                },
                {
                    dato: '2021-02-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-12',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerOpptjening'],
                },
                {
                    dato: '2021-02-13',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-14',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-16',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-19',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-20',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerOpptjening'],
                },
                {
                    dato: '2021-02-21',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-05-06T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
