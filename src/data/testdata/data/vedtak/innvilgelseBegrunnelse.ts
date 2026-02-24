import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

export const innvilgelseMedBegrunnelseVedtak: RSVedtakWrapper = {
    id: 'bcd7b2ec-fcc1-4a8b-816c-42256138d0c4',
    lest: true,
    lestDato: '2024-12-02T12:58:53.342144+01:00',
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '896929119',
        fom: '2024-10-16',
        tom: '2024-10-31',
        dokumenter: [
            {
                dokumentId: '5979a380-843c-484f-a202-c7f6677e5bf1',
                type: 'Søknad',
            },
            {
                dokumentId: '819ba0a6-12c5-4545-a39a-aecc3aeea5f5',
                type: 'Sykmelding',
            },
        ],
        inntekt: 27890.0,
        sykepengegrunnlag: 334680.0,
        utbetaling: {
            organisasjonsnummer: '896929119',
            utbetalingId: '28348e61-1539-4d5b-b87c-e9e71bec8d5c',
            forbrukteSykedager: 23,
            gjenståendeSykedager: 225,
            automatiskBehandling: false,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2024-10-01',
                        tom: '2024-10-20',
                        dagsats: 1287,
                        totalbeløp: 18018,
                        grad: 100.0,
                        stønadsdager: 14,
                    },
                    {
                        fom: '2024-10-21',
                        tom: '2024-10-31',
                        dagsats: 732,
                        totalbeløp: 6588,
                        grad: 100.0,
                        stønadsdager: 9,
                    },
                ],
            },
            personOppdrag: null,
            utbetalingsdager: [
                {
                    dato: '2024-09-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-17',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-18',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-19',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-20',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-21',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-22',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-23',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-24',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-25',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-26',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-27',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-28',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-29',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-09-30',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-01',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-02',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-03',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-04',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-05',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-06',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-07',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-08',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-09',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-10',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-11',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-12',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-13',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-14',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-15',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-16',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-17',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-18',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-19',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-20',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-21',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-22',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-23',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-24',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-25',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-26',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-27',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-28',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-29',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-30',
                    type: 'NavDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-10-31',
                    type: 'NavDag',
                    begrunnelser: [],
                },
            ],
            foreløpigBeregnetSluttPåSykepenger: '2025-09-11',
            utbetalingType: 'UTBETALING',
        },
        grunnlagForSykepengegrunnlag: 334680.0,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '896929119': 334680.0,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-12-02',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterHovedregel',
            omregnetÅrsinntekt: 334680.0,
            innrapportertÅrsinntekt: 334680.0,
            avviksprosent: 0.0,
            '6G': 744168.0,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '896929119',
                    omregnetÅrsinntekt: 334680.0,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'Innvilgelse',
                begrunnelse: 'Her får du penger',
                perioder: [
                    {
                        fom: '2024-10-16',
                        tom: '2024-10-31',
                    },
                ],
            },
        ],
        tags: [],
        saksbehandler: {
            navn: 'Petter Smart',
            ident: 'L123456',
        },
        beslutter: {
            navn: 'Donald Duck',
            ident: 'L654321',
        },
    },
    opprettetTimestamp: '2024-12-02T11:56:57.472998Z',
    orgnavn: 'Sauefabrikk',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    organisasjoner: {
        '896929119': 'Sauefabrikk',
    },
}

export const innvilgelseMedTomBegrunnelseVedtak = jsonDeepCopy(innvilgelseMedBegrunnelseVedtak)
innvilgelseMedTomBegrunnelseVedtak.vedtak.begrunnelser?.forEach((b) => (b.begrunnelse = ''))
innvilgelseMedTomBegrunnelseVedtak.id = 'bcd7b2ec-fcc1-4a8b-816c-42256138d088'
