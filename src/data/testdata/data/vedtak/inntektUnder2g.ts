import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak'

export const inntektUnder2g: RSVedtakWrapper = {
    id: 'c6bc3796-16cd-4a6a-8e64-7995787b4a45',
    lest: true,
    organisasjoner: {},
    lestDato: '2023-11-03T14:59:04.026618+01:00',
    vedtak: {
        organisasjonsnummer: '896929119',
        fom: '2023-08-01',
        tom: '2023-08-31',
        dokumenter: [
            { dokumentId: 'b35a394e-f44b-444c-b18a-a7588984d676', type: 'Inntektsmelding' },
            { dokumentId: 'c96483f1-a93f-4ebf-ba03-7bc9b6b6963a', type: 'Søknad' },
            { dokumentId: 'cba03a05-d2a9-4d67-a621-26751bea2593', type: 'Sykmelding' },
        ],
        inntekt: 16666.66,
        sykepengegrunnlag: 199999.91999999998,
        utbetaling: {
            organisasjonsnummer: '896929119',
            utbetalingId: 'e4003268-d868-443d-89de-3bc1fc8d0251',
            forbrukteSykedager: 11,
            gjenståendeSykedager: 237,
            automatiskBehandling: true,
            foreløpigBeregnetSluttPåSykepenger: '2024-07-29',
            utbetalingType: 'UTBETALING',
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2023-08-17',
                        tom: '2023-08-31',
                        dagsats: 769,
                        stønadsdager: 11,
                        grad: 100,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2023-08-01',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-02',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-03',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-14',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-19',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-20',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-22',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-23',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-24',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-25',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-26',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-27',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-28',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-29',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-30',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-08-31',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 199999.91999999998,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: { '896929119': 199999.91999999998 },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2023-11-03',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterHovedregel',
            omregnetÅrsinntekt: 199999.92,
            innrapportertÅrsinntekt: 200000,
            avviksprosent: 0,
            '6G': 711720,
            tags: [],
            arbeidsgivere: [{ arbeidsgiver: '896929119', omregnetÅrsinntekt: 199999.92 }],
        },
        begrunnelser: [],
        tags: ['SykepengegrunnlagUnder2G'],
    },
    opprettetTimestamp: '2023-11-03T13:57:58.606805Z',
    orgnavn: 'Sauefabrikk',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
}
