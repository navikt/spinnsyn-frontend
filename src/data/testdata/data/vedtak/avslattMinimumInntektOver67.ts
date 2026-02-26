import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const avslattMinimumInntektOver67: RSVedtakWrapper = {
    id: '3ef1f882-4dbf-478d-bc98-5b878e7376ca',
    lest: false,
    lestDato: null,
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [
        { dato: '2024-05-04', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-05', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-06', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-07', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-08', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-09', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-10', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-11', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-12', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-13', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-14', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-15', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-16', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-17', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-18', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-19', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-20', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-21', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-22', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-23', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-24', dagtype: 'AvvistDag', begrunnelser: ['MinimumInntektOver67'], belop: 0, grad: 0 },
        { dato: '2024-05-25', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        { dato: '2024-05-26', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
    ],
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopSykmeldt: 0,
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '333888777',
        fom: '2024-05-04',
        tom: '2024-05-26',
        dokumenter: [
            {
                dokumentId: '3ef1f882-4dbf-478d-bc98-5b878e7376ca',
                type: 'Sykmelding',
            },
            {
                dokumentId: '3ef1f882-4dbf-478d-bc98-5b878e7376ca',
                type: 'Søknad',
            },
        ],
        inntekt: 10965,
        sykepengegrunnlag: 131580,
        utbetaling: {
            organisasjonsnummer: '333888777',
            utbetalingId: '3ef1f882-4dbf-478d-bc98-5b878e7376ca',
            forbrukteSykedager: 0,
            gjenståendeSykedager: 60,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2024-08-16',
            utbetalingType: 'UTBETALING',
        },
        grunnlagForSykepengegrunnlag: 131580,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '333888777': 131580,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-06-07',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterSkjønn',
            omregnetÅrsinntekt: 131580,
            innrapportertÅrsinntekt: 103166.95999999999,
            skjønnsfastsatt: 131580,
            avviksprosent: 27.54,
            '6G': 711720,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '333888777',
                    omregnetÅrsinntekt: 131580,
                    skjønnsfastsatt: 131580,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'SkjønnsfastsattSykepengegrunnlagMal',
                begrunnelse:
                    'Månedsinntekten som er beregnet for arbeidsforholdet ditt er totalt 10 965,00 kroner. Regnet om til årsinntekt blir det 131 580,00 kroner. Denne årsinntekten avviker med mer enn 25 % fra inntekten som er rapportert til Skatteetaten på 103 166,96 kroner de siste tolv månedene før måneden du ble syk.\n\nNår årsinntekten avviker med mer enn 25 % fra rapportert inntekt, skal sykepengegrunnlaget fastsettes ved skjønn ut fra den årsinntekten som kan sannsynliggjøres på det tidspunktet du ble syk. Se folketrygdloven § 8-30 andre avsnitt.\n\nNår vi fastsetter sykepengegrunnlaget ditt ved skjønn, legger vi vekt på om avviket skyldes endringer i arbeidssituasjonen din. Målet med den skjønnsmessige vurderingen er å komme frem til inntekten du ville hatt om du ikke hadde blitt syk.',
                perioder: [
                    {
                        fom: '2024-05-04',
                        tom: '2024-05-26',
                    },
                ],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                begrunnelse:
                    'Du startet i jobb hos Butikken AS 01. april 2023. Du har noe varierende inntekt her. \nFør dette har du ikke hatt registrerte arbeidsforhold eller pensjonsgivende inntekter siden 2020. \nDette er årsaken til avviket.\nVi anser at ditt arbeidsforhold ved Butikken AS er en endring i arbeidssituasjonen din, og at inntekten etter endringen er den du ville hatt dersom du ikke ble sykemeldt.',
                perioder: [
                    {
                        fom: '2024-05-04',
                        tom: '2024-05-26',
                    },
                ],
            },
            {
                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 131 580,00 kroner.',
                perioder: [
                    {
                        fom: '2024-05-04',
                        tom: '2024-05-26',
                    },
                ],
            },
        ],
        tags: ['SykepengegrunnlagUnder2G'],
    },
    opprettetTimestamp: '2024-06-07T12:52:49.722204Z',
    orgnavn: 'Butikken AS',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    organisasjoner: {
        '333888777': 'Butikken AS',
    },
}
