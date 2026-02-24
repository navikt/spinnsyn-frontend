import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakDerDetSluttesMedDelvisRefusjon: RSVedtakWrapper = {
    id: 'd88a1d11-affe-47de-8a47-d308e1b236d1',
    lest: false,
    organisasjoner: {},
    lestDato: null,
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '967170232',
        fom: '2023-02-01',
        tom: '2023-02-28',
        dokumenter: [
            {
                dokumentId: '049ad55f-c234-40fa-ad03-2dfe43e7c591',
                type: 'Søknad',
            },
            {
                dokumentId: '274703d2-11d1-4b1a-8b06-341fe93ded29',
                type: 'Inntektsmelding',
            },
            { dokumentId: 'e23fd00e-3633-47b2-8dba-ad2e0a2a8810', type: 'Sykmelding' },
        ],
        inntekt: 32000.0,
        sykepengegrunnlag: 384000.0,
        utbetaling: {
            organisasjonsnummer: '967170232',
            utbetalingId: 'f2bbfe43-da56-4fff-9792-ae33e2a75aee',
            forbrukteSykedager: 26,
            gjenståendeSykedager: 222,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2024-01-04',
            utbetalingType: 'UTBETALING',
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2023-02-01',
                        tom: '2023-02-09',
                        dagsats: 692,
                        grad: 100.0,
                        stønadsdager: 7,
                    },
                ],
            },
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2023-02-01',
                        tom: '2023-02-09',
                        dagsats: 785,
                        grad: 100.0,
                        stønadsdager: 7,
                    },
                    {
                        fom: '2023-02-10',
                        tom: '2023-02-21',
                        dagsats: 1477,
                        grad: 100.0,
                        stønadsdager: 7,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2023-02-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-02',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-02',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-03',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-03',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-04',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-04',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-05',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-05',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-10',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-11',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-12',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-13',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-16',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-18',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-19',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-20',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-22',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-23',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-24',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-25',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-26',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-27',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2023-02-28',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 384000.0,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: { '967170232': 384000.0 },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2023-03-20',
    },
    opprettetTimestamp: '2023-03-20T12:11:08.156573Z',
    orgnavn: '967170232',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
}
