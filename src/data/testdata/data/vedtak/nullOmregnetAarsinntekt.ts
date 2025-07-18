import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const nullOmregnetAarsinntekt: RSVedtakWrapper = {
    id: 'e04b0ea9-ce61-4b69-92de-9f035ffb1616',
    lest: true,
    lestDato: '2024-04-24T14:00:25.052723+02:00',
    vedtak: {
        vedtakstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '998877445',
        fom: '2024-03-01',
        tom: '2024-03-20',
        dokumenter: [],
        inntekt: 34991.666666666664,
        sykepengegrunnlag: 419900,
        utbetaling: {
            organisasjonsnummer: '998877445',
            utbetalingId: '852efcf5-c3da-436b-a38b-e4dec29faa2f',
            forbrukteSykedager: 3,
            gjenståendeSykedager: 245,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2025-02-26',
            utbetalingType: 'UTBETALING',
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2024-03-01',
                        tom: '2024-03-20',
                        dagsats: 1615,
                        grad: 100,
                        stønadsdager: 20,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2024-03-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-02',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-03',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-06',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-07',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-09',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-10',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-12',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-13',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-14',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-15',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-16',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-17',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-19',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-03-20',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 419900,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '998877445': 419900,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-04-24',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterSkjønn',
            omregnetÅrsinntekt: 0,
            innrapportertÅrsinntekt: 501998.41,
            skjønnsfastsatt: 419900,
            avviksprosent: 100,
            '6G': 711720,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '998877445',
                    omregnetÅrsinntekt: 0,
                    skjønnsfastsatt: 419900,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'SkjønnsfastsattSykepengegrunnlagMal',
                begrunnelse:
                    'Månedsinntekten som er beregnet for arbeidsforholdet ditt er totalt 0,00 kroner. Regnet om til årsinntekt blir det 0,00 kroner. Denne årsinntekten avviker med mer enn 25 prosent fra inntekten som er rapportert til Skatteetaten på 501 998,41 kroner de siste tolv månedene før måneden du ble syk.\n\nNår årsinntekten avviker med mer enn 25 prosent fra rapportert inntekt, skal sykepengegrunnlaget fastsettes ved skjønn ut fra den årsinntekten som kan sannsynliggjøres på det tidspunktet du ble syk. Se folketrygdloven § 8-30 andre avsnitt.\n\nNår vi fastsetter sykepengegrunnlaget ditt ved skjønn, legger vi vekt på om avviket skyldes endringer i arbeidssituasjonen din. Målet med den skjønnsmessige vurderingen er å komme frem til inntekten du ville hatt om du ikke hadde blitt syk.',
                perioder: [
                    {
                        fom: '2024-03-01',
                        tom: '2024-03-20',
                    },
                ],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                begrunnelse: 'Du er sykmeldt ved overgang fra foreldrepenger bla bla mer greier',
                perioder: [
                    {
                        fom: '2024-03-01',
                        tom: '2024-03-20',
                    },
                ],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 419 900,00 kroner.',
                perioder: [
                    {
                        fom: '2024-03-01',
                        tom: '2024-03-20',
                    },
                ],
            },
        ],
        tags: [],
    },
    opprettetTimestamp: '2024-04-24T07:35:39.937373Z',
    orgnavn: 'Omregnet null AS',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    organisasjoner: {
        '998877445': 'Null Omregnet Årsinntekt AS',
    },
}
