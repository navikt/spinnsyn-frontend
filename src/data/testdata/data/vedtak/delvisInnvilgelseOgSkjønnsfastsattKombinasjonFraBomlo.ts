import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo: RSVedtakWrapper = {
    id: '3de11b09-51b3-4d44-8dcc-d35fe3c59219',
    lest: false,
    vedtak: {
        vedtakstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '810007842',
        fom: '2024-02-01',
        tom: '2024-02-23',
        dokumenter: [
            { dokumentId: '06eeee16-c400-47ce-a1de-124759afc806', type: 'Søknad' },
            { dokumentId: 'a2bfcd80-ca98-4ffc-b66c-a936c82eb735', type: 'Sykmelding' },
            { dokumentId: 'cc125bab-ef92-4a51-8031-3620fe01cdaa', type: 'Inntektsmelding' },
        ],
        inntekt: 42001.0,
        sykepengegrunnlag: 504012.0,
        utbetaling: {
            organisasjonsnummer: '810007842',
            utbetalingId: 'd1f31e36-a74a-4641-a052-6262d463ace5',
            forbrukteSykedager: 4,
            gjenståendeSykedager: 244,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2025-01-30',
            utbetalingType: 'UTBETALING',
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2024-02-20',
                        tom: '2024-02-22',
                        dagsats: 1939,
                        grad: 100.0,
                        stønadsdager: 3,
                    },
                ],
            },
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2024-02-23',
                        tom: '2024-02-23',
                        dagsats: 1939,
                        grad: 100.0,
                        stønadsdager: 1,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2024-02-01',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-02',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-03',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-14',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-17',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-18',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-19',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumSykdomsgrad'],
                },
                {
                    dato: '2024-02-20',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-21',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-22',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-23',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 504012.0,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '810007842': 504012.0,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-05-14',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterSkjønn',
            omregnetÅrsinntekt: 504012.0,
            innrapportertÅrsinntekt: 135000.0,
            skjønnsfastsatt: 504012.0,
            avviksprosent: 273.34,
            '6G': 711720.0,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '810007842',
                    omregnetÅrsinntekt: 504012.0,
                    skjønnsfastsatt: 504012.0,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'SkjønnsfastsattSykepengegrunnlagMal',
                begrunnelse:
                    'Månedsinntekten som er beregnet for arbeidsforholdet ditt er totalt 42 001,00 kroner. Regnet om til årsinntekt blir det 504 012,00 kroner. Denne årsinntekten avviker med mer enn 25 prosent fra inntekten som er rapportert til Skatteetaten på 135 000,00 kroner de siste tolv månedene før måneden du ble syk.\n\nNår årsinntekten avviker med mer enn 25 prosent fra rapportert inntekt, skal sykepengegrunnlaget fastsettes ved skjønn ut fra den årsinntekten som kan sannsynliggjøres på det tidspunktet du ble syk. Se folketrygdloven § 8-30 andre avsnitt.\n\nNår vi fastsetter sykepengegrunnlaget ditt ved skjønn, legger vi vekt på om avviket skyldes endringer i arbeidssituasjonen din. Målet med den skjønnsmessige vurderingen er å komme frem til inntekten du ville hatt om du ikke hadde blitt syk.',
                perioder: [{ fom: '2024-02-01', tom: '2024-02-23' }],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                begrunnelse: 'skjønnsfastsatt',
                perioder: [{ fom: '2024-02-01', tom: '2024-02-23' }],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 504 012,00 kroner.',
                perioder: [{ fom: '2024-02-01', tom: '2024-02-23' }],
            },
            {
                type: 'DelvisInnvilgelse',
                begrunnelse: 'Delvis innvilgelse.\n\nNy linje.',
                perioder: [{ fom: '2024-02-01', tom: '2024-02-23' }],
            },
        ],
        tags: [],
    },
    opprettetTimestamp: '2024-05-14T11:54:15.659994Z',
    orgnavn: 'Realistisk Kontorbygg',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    organisasjoner: {
        '810007842': 'Realistisk Kontorbygg',
    },
}

//NB manuelt redigert
export const avslåttFraBømlo: RSVedtakWrapper = {
    id: '3de11b09-51b3-4d44-8dcc-d35fe3c59224',
    lest: false,
    vedtak: {
        vedtakstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '810007842',
        fom: '2024-02-01',
        tom: '2024-02-19',
        dokumenter: [
            { dokumentId: '06eeee16-c400-47ce-a1de-124759afc806', type: 'Søknad' },
            { dokumentId: 'a2bfcd80-ca98-4ffc-b66c-a936c82eb735', type: 'Sykmelding' },
            { dokumentId: 'cc125bab-ef92-4a51-8031-3620fe01cdaa', type: 'Inntektsmelding' },
        ],
        inntekt: 42001.0,
        sykepengegrunnlag: 504012.0,
        utbetaling: {
            organisasjonsnummer: '810007842',
            utbetalingId: 'd1f31e36-a74a-4641-a052-6262d463ace5',
            forbrukteSykedager: 4,
            gjenståendeSykedager: 244,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2025-01-30',
            utbetalingType: 'UTBETALING',
            utbetalingsdager: [
                {
                    dato: '2024-02-01',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-02',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-03',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-14',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-17',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-18',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2024-02-19',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumSykdomsgrad'],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 504012.0,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '810007842': 504012.0,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-05-14',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterHovedregel',
            omregnetÅrsinntekt: 504012.0,
            innrapportertÅrsinntekt: 135000.0,
            avviksprosent: 273.34,
            '6G': 711720.0,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '810007842',
                    omregnetÅrsinntekt: 504012.0,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'Avslag',
                begrunnelse:
                    'For å ha rett til sykepenger må arbeidsevnen din ha blitt redusert med minst 20 prosent. Tap av arbeidsevne beregnes ut fra tap av arbeidstid. Dette følger av folketrygdloven § 8-13.\n\nPå sykmeldingstidspunktet hadde du følgende inntektskilder:\n\nUnibuss as: 14,35 timer per uke = 2,87 timer per dag.\nOslo Taxibuss: 37,5 timer per uke = 7,5 timer per dag.\nTotal arbeidstid: 54,85 timer per uke = 10,37 timer per dag.\nOpplysningene er hentet fra Aa-registeret.\n\nPerioden 09.04.24 - 29.04.24 er 15 virkedager. Total arbeidstid i perioden er 155,55 timer\n15 x 10,37 = 155,55 timer.\n\nArbeidstid hos Unibuss er 43,05 timer\n15 x 2,87 = 43,05\n\nI perioden 09.04.24 - 29.04.24 er du bare 50 prosent sykmeldt fra Unibuss. Dette utgjør 21,53 timer.\n50 % / 100 x 43,05 = 21,53 timer sykmeldt.\n\nDu er 13,84 % sykmeldt av den totale arbeidstiden din.\n21,53 / 155,55 x 100 = 13,84 %.\n\nArbeidsevnen din er dermed ikke nedsatt med minst 20 %.\nDin søknad om sykepenger i perioden 09.04.24 - 29.04.24 er derfor avslått.',
                perioder: [{ fom: '2024-02-01', tom: '2024-02-19' }],
            },
        ],
        tags: [],
    },
    opprettetTimestamp: '2024-05-14T11:54:15.659994Z',
    orgnavn: 'Realistisk Kontorbygg',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    organisasjoner: {
        '810007842': 'Realistisk Kontorbygg',
    },
}
