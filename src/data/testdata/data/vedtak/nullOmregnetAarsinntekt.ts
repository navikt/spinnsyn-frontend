import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const nullOmregnetAarsinntekt: RSVedtakWrapper = {
    id: 'e04b0ea9-ce61-4b69-92de-9f035ffb1616',
    lest: true,
    lestDato: '2024-04-24T14:00:25.052723+02:00',
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [
        { dato: '2024-03-01', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-02', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-03', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-04', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-05', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-06', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-07', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-08', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-09', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-10', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-11', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-12', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-13', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-14', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-15', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-16', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-17', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2024-03-18', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-19', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
        { dato: '2024-03-20', dagtype: 'NavDagSyk', begrunnelser: [], belop: 1615, grad: 100 },
    ],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
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
                    'Månedsinntekten som er beregnet for arbeidsforholdet ditt er totalt 0,00 kroner. Regnet om til årsinntekt blir det 0,00 kroner. Denne årsinntekten avviker med mer enn 25 % fra inntekten som er rapportert til Skatteetaten på 501 998,41 kroner de siste tolv månedene før måneden du ble syk.\n\nNår årsinntekten avviker med mer enn 25 % fra rapportert inntekt, skal sykepengegrunnlaget fastsettes ved skjønn ut fra den årsinntekten som kan sannsynliggjøres på det tidspunktet du ble syk. Se folketrygdloven § 8-30 andre avsnitt.\n\nNår vi fastsetter sykepengegrunnlaget ditt ved skjønn, legger vi vekt på om avviket skyldes endringer i arbeidssituasjonen din. Målet med den skjønnsmessige vurderingen er å komme frem til inntekten du ville hatt om du ikke hadde blitt syk.',
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
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopSykmeldt: 22610,
}
