import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakMedFlereArbeidsgivere: RSVedtakWrapper = {
    id: '731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
    lest: false,
    organisasjoner: {},
    lestDato: null,
    vedtak: {
        vedtakstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '998844551',
        fom: '2021-12-29',
        tom: '2022-01-16',
        dokumenter: [
            {
                dokumentId: '731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
                type: 'Sykmelding',
            },
            {
                dokumentId: '731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
                type: 'Søknad',
            },
        ],
        inntekt: 75813.11,
        sykepengegrunnlag: 638394,
        utbetaling: {
            organisasjonsnummer: '998844551',
            utbetalingId: '731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
            forbrukteSykedager: 1,
            gjenståendeSykedager: 247,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2022-12-27',
            utbetalingType: 'UTBETALING',
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2022-01-14',
                        tom: '2022-01-16',
                        dagsats: 1359,
                        grad: 100,
                        stønadsdager: 3,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-12-29',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-12-30',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2021-12-31',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-02',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-03',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },

                {
                    dato: '2022-01-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-15',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-01-16',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 909757.3200000001,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '973238833': 406252.44,
            '998844551': 503504.88,
        },
        begrensning: 'ER_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2022-03-21',
    },
    opprettetTimestamp: '2022-03-21T12:42:42.393305Z',
    orgnavn: 'INDUSTRIFABRIKKEN AS',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: { 'Den andre sjappa': 406252.44 },
}
