import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const slutterMedRefusjon: RSVedtakWrapper = {
    id: '27c0a72f-ec1b-42d1-8961-2ac71ff5fa14',
    lest: true,
    organisasjoner: {},
    lestDato: '2023-01-17T09:31:55.962938+01:00',
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '112233445',
        fom: '2022-09-24',
        tom: '2022-12-16',
        dokumenter: [
            {
                dokumentId: '518bcf5a-781e-4320-86bb-48721c30c55b',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '669bb535-fbb3-4f10-a1a8-f4d0b7ad267e',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '7a4da95c-950a-352e-89e1-001026ffd2d9',
                type: 'Søknad',
            },
            {
                dokumentId: 'a676114f-be10-48c8-b3c9-b4975d7c3cc2',
                type: 'Sykmelding',
            },
            {
                dokumentId: '3b5074a0-76ae-4e4c-ab73-01437fefb904',
                type: 'Sykmelding',
            },
            {
                dokumentId: '518bcf5a-781e-4320-86bb-48721c30c55b',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '669bb535-fbb3-4f10-a1a8-f4d0b7ad267e',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '9aa5d73c-823b-3f1d-84aa-44d422fb0189',
                type: 'Søknad',
            },
            {
                dokumentId: '518bcf5a-781e-4320-86bb-48721c30c55b',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '669bb535-fbb3-4f10-a1a8-f4d0b7ad267e',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '99297662-387c-37cc-998a-e1fece70e902',
                type: 'Søknad',
            },
            {
                dokumentId: 'e3af1a48-3696-4f55-a4b9-1b9ac869e02f',
                type: 'Sykmelding',
            },
            {
                dokumentId: '10c1ce62-1932-4bb6-b64d-1e72a936415b',
                type: 'Sykmelding',
            },
            {
                dokumentId: '518bcf5a-781e-4320-86bb-48721c30c55b',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: '669bb535-fbb3-4f10-a1a8-f4d0b7ad267e',
                type: 'Inntektsmelding',
            },
            {
                dokumentId: 'cc2df420-a583-38f1-b924-2048cd02ea93',
                type: 'Søknad',
            },
        ],
        inntekt: 39244.98,
        sykepengegrunnlag: 470939.76,
        utbetaling: {
            organisasjonsnummer: '112233445',
            utbetalingId: '9081cd93-a27c-4752-897a-3834938',
            forbrukteSykedager: 58,
            gjenståendeSykedager: 190,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2023-09-08',
            utbetalingType: 'REVURDERING',
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2022-09-28',
                        tom: '2022-11-20',
                        dagsats: 1811,
                        grad: 100,
                        stønadsdager: 1,
                    },
                ],
            },
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2022-11-21',
                        tom: '2022-12-16',
                        dagsats: 1811,
                        grad: 100,
                        stønadsdager: 1,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2022-09-24',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-24',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-25',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-25',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-26',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-26',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-27',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-27',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-28',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-29',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-09-30',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-01',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-01',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-02',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-02',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-03',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-08',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-08',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-09',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-09',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-10',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-12',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-13',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-15',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-15',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-16',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-16',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-19',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-20',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-22',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-22',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-23',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-23',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-24',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-25',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-26',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-27',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-28',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-29',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-29',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-30',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-30',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-10-31',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-02',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-03',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-05',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-05',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-06',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-06',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-10',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-12',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-12',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-13',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-13',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-16',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-19',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-19',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-20',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-20',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-22',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-23',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-24',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-25',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-26',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-26',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-27',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-27',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-28',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-29',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-11-30',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-02',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-03',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-03',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-04',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-04',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-10',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-10',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-11',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-11',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-12',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-13',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2022-12-16',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 470939.76,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '112233445': 470939.76,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2023-01-10',
    },
    opprettetTimestamp: '2023-01-10T07:52:46.564322Z',
    orgnavn: 'Partial Refunders AS',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
}
