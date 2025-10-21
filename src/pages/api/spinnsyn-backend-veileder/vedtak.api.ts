import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import { getToken, validateAzureToken } from '@navikt/oasis'
import { requestAzureOboToken } from '@navikt/oasis/dist/obo'

import { hentModiaContext } from '../../../data/hentModiaContext'
import { hentVedtakFraSpinnsynBackendForInterne } from '../../../data/hentVedtakForInterne'
import { isMockBackend } from '../../../utils/environment'

const { serverRuntimeConfig } = getConfig()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (isMockBackend()) {
        return res.status(200).json({
            vedtak: [
                {
                    id: '8e896647-dfcf-4139-9792-572364e65476',
                    lest: true,
                    lestDato: '2024-04-24T14:00:25.052723+02:00',
                    vedtak: {
                        organisasjonsnummer: '817062652',
                        fom: '2024-03-01',
                        tom: '2024-03-20',
                        dokumenter: [
                            {
                                dokumentId: '044bd5f0-19e8-4223-bac4-bc30cb5ee81e',
                                type: 'Sykmelding',
                            },
                            {
                                dokumentId: '32dad947-ec58-402d-8e4d-a5741ef3ad7c',
                                type: 'Inntektsmelding',
                            },
                            {
                                dokumentId: '925544d4-6cce-3027-b2e0-fa0fb4a78056',
                                type: 'Søknad',
                            },
                        ],
                        inntekt: 34991.666666666664,
                        sykepengegrunnlag: 419900,
                        utbetaling: {
                            organisasjonsnummer: '817062652',
                            utbetalingId: 'ae10afbc-f418-48d2-bb5a-206a824f8634',
                            forbrukteSykedager: 3,
                            gjenståendeSykedager: 245,
                            automatiskBehandling: false,
                            foreløpigBeregnetSluttPåSykepenger: '2025-02-26',
                            utbetalingType: 'UTBETALING',
                        },
                        grunnlagForSykepengegrunnlag: 419900,
                        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
                            '817062652': 419900,
                        },
                        begrensning: 'ER_IKKE_6G_BEGRENSET',
                        vedtakFattetTidspunkt: '2024-04-24',
                        sykepengegrunnlagsfakta: {
                            fastsatt: 'EtterSkjønn',
                            omregnetÅrsinntekt: 0,
                            innrapportertÅrsinntekt: 501998.41000000003,
                            skjønnsfastsatt: 419900,
                            avviksprosent: 100,
                            '6G': 711720,
                            tags: [],
                            arbeidsgivere: [
                                {
                                    arbeidsgiver: '817062652',
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
                                begrunnelse:
                                    'Du er sykmeldt ved overgang fra foreldrepenger, hvor du mottok en dagsats på 1 615 kroner før skatt, som gir 419 900 kroner i året.\n\nEttersom du ikke har rukket å komme tilbake til arbeid før du ble sykmeldt, er din inntekt 0 kroner på sykmeldingstidspunktet. Dette er årsaken til at det blir et avvik i inntektene når det sammenlignes.\n\nVi ser at du arbeidet fulltid i 2022, før du startet med ulike ytelser relatert til svangerskap. Inntektsnivået du hadde i dette året samsvarer med inntekten benyttet i din foreldrepengesak.\n\nVi anser at det er dette du mest sannsynlig ville hatt hvis du ikke ble sykmeldt.\n\n',
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
                    orgnavn: 'Tropicos AS',
                    annullert: false,
                    revurdert: false,
                    dagerArbeidsgiver: [],
                    dagerPerson: [
                        {
                            dato: '2024-03-01',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-02',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-03',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-04',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-05',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-06',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-07',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-08',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-09',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-10',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-11',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-12',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-13',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-14',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-15',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-16',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-17',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-18',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-19',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-20',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                    ],
                    sykepengebelopArbeidsgiver: 0,
                    sykepengebelopPerson: 22610,
                    andreArbeidsgivere: {},
                    organisasjoner: {
                        '817062652': 'Tropicos AS',
                    },
                },
                {
                    id: '9a19be73-c42a-4005-bf20-8bd5d11668d6',
                    lest: true,
                    lestDato: '2024-04-24T10:39:28.240366+02:00',
                    vedtak: {
                        organisasjonsnummer: '817062652',
                        fom: '2024-04-05',
                        tom: '2024-04-20',
                        dokumenter: [
                            {
                                dokumentId: '4026097e-cc95-431d-bcca-1ed84e883101',
                                type: 'Sykmelding',
                            },
                            {
                                dokumentId: '6ab406fd-9d32-3fdf-b3b1-4262ecc5f701',
                                type: 'Søknad',
                            },
                        ],
                        inntekt: 34991.666666666664,
                        sykepengegrunnlag: 419900,
                        utbetaling: {
                            organisasjonsnummer: '817062652',
                            utbetalingId: '92520077-176c-452a-a4a9-8d785ab96161',
                            forbrukteSykedager: 25,
                            gjenståendeSykedager: 223,
                            automatiskBehandling: false,
                            foreløpigBeregnetSluttPåSykepenger: '2025-02-26',
                            utbetalingType: 'UTBETALING',
                        },
                        grunnlagForSykepengegrunnlag: 419900,
                        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
                            '817062652': 419900,
                        },
                        begrensning: 'ER_IKKE_6G_BEGRENSET',
                        vedtakFattetTidspunkt: '2024-04-24',
                        sykepengegrunnlagsfakta: {
                            fastsatt: 'EtterSkjønn',
                            omregnetÅrsinntekt: 0,
                            innrapportertÅrsinntekt: 501998.41000000003,
                            skjønnsfastsatt: 419900,
                            avviksprosent: 100,
                            '6G': 711720,
                            tags: [],
                            arbeidsgivere: [
                                {
                                    arbeidsgiver: '817062652',
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
                                        fom: '2024-04-05',
                                        tom: '2024-04-20',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                                begrunnelse:
                                    'Du er sykmeldt ved overgang fra foreldrepenger, hvor du mottok en dagsats på 1 615 kroner før skatt, som gir 419 900 kroner i året.\n\nEttersom du ikke har rukket å komme tilbake til arbeid før du ble sykmeldt, er din inntekt 0 kroner på sykmeldingstidspunktet. Dette er årsaken til at det blir et avvik i inntektene når det sammenlignes.\n\nVi ser at du arbeidet fulltid i 2022, før du startet med ulike ytelser relatert til svangerskap. Inntektsnivået du hadde i dette året samsvarer med inntekten benyttet i din foreldrepengesak.\n\nVi anser at det er dette du mest sannsynlig ville hatt hvis du ikke ble sykmeldt.\n\n',
                                perioder: [
                                    {
                                        fom: '2024-04-05',
                                        tom: '2024-04-20',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 419 900,00 kroner.',
                                perioder: [
                                    {
                                        fom: '2024-04-05',
                                        tom: '2024-04-20',
                                    },
                                ],
                            },
                        ],
                        tags: [],
                    },
                    opprettetTimestamp: '2024-04-24T07:47:41.247223Z',
                    orgnavn: 'Tropicos AS',
                    annullert: false,
                    revurdert: false,
                    dagerArbeidsgiver: [],
                    dagerPerson: [
                        {
                            dato: '2024-04-05',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-06',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-07',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-08',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-09',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-10',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-11',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-12',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-13',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-14',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-15',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-16',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-17',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-18',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-19',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-20',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                    ],
                    sykepengebelopArbeidsgiver: 0,
                    sykepengebelopPerson: 17765,
                    andreArbeidsgivere: {},
                    organisasjoner: {
                        '817062652': 'Tropicos AS',
                    },
                },
                {
                    id: '0743a2ce-b8be-4857-90bf-21bb83ccb9ad',
                    lest: true,
                    lestDato: '2024-04-24T14:00:30.90173+02:00',
                    vedtak: {
                        organisasjonsnummer: '817062652',
                        fom: '2024-03-21',
                        tom: '2024-04-04',
                        dokumenter: [
                            {
                                dokumentId: '32dad947-ec58-402d-8e4d-a5741ef3ad7c',
                                type: 'Inntektsmelding',
                            },
                            {
                                dokumentId: '45d996d7-b00b-329e-9f91-2c109cfea87a',
                                type: 'Søknad',
                            },
                            {
                                dokumentId: '5da9aea2-d19a-4518-90ab-beb0e3645afc',
                                type: 'Sykmelding',
                            },
                        ],
                        inntekt: 34991.666666666664,
                        sykepengegrunnlag: 419900,
                        utbetaling: {
                            organisasjonsnummer: '817062652',
                            utbetalingId: '172adccc-7f55-4aee-b4ba-3ba2adacb121',
                            forbrukteSykedager: 14,
                            gjenståendeSykedager: 234,
                            automatiskBehandling: false,
                            foreløpigBeregnetSluttPåSykepenger: '2025-02-26',
                            utbetalingType: 'UTBETALING',
                        },
                        grunnlagForSykepengegrunnlag: 419900,
                        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
                            '817062652': 419900,
                        },
                        begrensning: 'ER_IKKE_6G_BEGRENSET',
                        vedtakFattetTidspunkt: '2024-04-24',
                        sykepengegrunnlagsfakta: {
                            fastsatt: 'EtterSkjønn',
                            omregnetÅrsinntekt: 0,
                            innrapportertÅrsinntekt: 501998.41000000003,
                            skjønnsfastsatt: 419900,
                            avviksprosent: 100,
                            '6G': 711720,
                            tags: [],
                            arbeidsgivere: [
                                {
                                    arbeidsgiver: '817062652',
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
                                        fom: '2024-03-21',
                                        tom: '2024-04-04',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                                begrunnelse:
                                    'Du er sykmeldt ved overgang fra foreldrepenger, hvor du mottok en dagsats på 1 615 kroner før skatt, som gir 419 900 kroner i året.\n\nEttersom du ikke har rukket å komme tilbake til arbeid før du ble sykmeldt, er din inntekt 0 kroner på sykmeldingstidspunktet. Dette er årsaken til at det blir et avvik i inntektene når det sammenlignes.\n\nVi ser at du arbeidet fulltid i 2022, før du startet med ulike ytelser relatert til svangerskap. Inntektsnivået du hadde i dette året samsvarer med inntekten benyttet i din foreldrepengesak.\n\nVi anser at det er dette du mest sannsynlig ville hatt hvis du ikke ble sykmeldt.\n\n',
                                perioder: [
                                    {
                                        fom: '2024-03-21',
                                        tom: '2024-04-04',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 419 900,00 kroner.',
                                perioder: [
                                    {
                                        fom: '2024-03-21',
                                        tom: '2024-04-04',
                                    },
                                ],
                            },
                        ],
                        tags: [],
                    },
                    opprettetTimestamp: '2024-04-24T07:47:26.199046Z',
                    orgnavn: 'Tropicos AS',
                    annullert: false,
                    revurdert: false,
                    dagerArbeidsgiver: [],
                    dagerPerson: [
                        {
                            dato: '2024-03-21',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-22',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-23',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-24',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-25',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-26',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-27',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-28',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-29',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-30',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-03-31',
                            belop: 0,
                            grad: 0,
                            dagtype: 'NavHelgDag',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-01',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-02',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-03',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                        {
                            dato: '2024-04-04',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                    ],
                    sykepengebelopArbeidsgiver: 0,
                    sykepengebelopPerson: 17765,
                    andreArbeidsgivere: {},
                    organisasjoner: {
                        '817062652': 'Tropicos AS',
                    },
                },
                {
                    id: '6cd0a34b-a710-4238-8705-074dbf726672',
                    lest: true,
                    lestDato: '2024-04-24T09:13:13.435012+02:00',
                    vedtak: {
                        organisasjonsnummer: '817062652',
                        fom: '2024-02-29',
                        tom: '2024-02-29',
                        dokumenter: [
                            {
                                dokumentId: '32dad947-ec58-402d-8e4d-a5741ef3ad7c',
                                type: 'Inntektsmelding',
                            },
                            {
                                dokumentId: '448a080e-1a45-3e09-91db-52e261e8760a',
                                type: 'Søknad',
                            },
                            {
                                dokumentId: '543e1dba-3888-4f97-af77-c45d11457e6b',
                                type: 'Sykmelding',
                            },
                        ],
                        inntekt: 34991.666666666664,
                        sykepengegrunnlag: 419900,
                        utbetaling: {
                            organisasjonsnummer: '817062652',
                            utbetalingId: '6002e7a8-3ea1-4ba6-80ee-bf5338c6670c',
                            forbrukteSykedager: 0,
                            gjenståendeSykedager: 248,
                            automatiskBehandling: false,
                            foreløpigBeregnetSluttPåSykepenger: '2025-02-11',
                            utbetalingType: 'UTBETALING',
                        },
                        grunnlagForSykepengegrunnlag: 419900,
                        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
                            '817062652': 419900,
                        },
                        begrensning: 'ER_IKKE_6G_BEGRENSET',
                        vedtakFattetTidspunkt: '2024-04-23',
                        sykepengegrunnlagsfakta: {
                            fastsatt: 'EtterSkjønn',
                            omregnetÅrsinntekt: 0,
                            innrapportertÅrsinntekt: 501998.41000000003,
                            skjønnsfastsatt: 419900,
                            avviksprosent: 100,
                            '6G': 711720,
                            tags: [],
                            arbeidsgivere: [
                                {
                                    arbeidsgiver: '817062652',
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
                                        fom: '2024-02-29',
                                        tom: '2024-02-29',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagFritekst',
                                begrunnelse:
                                    'Du er sykmeldt ved overgang fra foreldrepenger, hvor du mottok en dagsats på 1 615 kroner før skatt, som gir 419 900 kroner i året.\n\nEttersom du ikke har rukket å komme tilbake til arbeid før du ble sykmeldt, er din inntekt 0 kroner på sykmeldingstidspunktet. Dette er årsaken til at det blir et avvik i inntektene når det sammenlignes.\n\nVi ser at du arbeidet fulltid i 2022, før du startet med ulike ytelser relatert til svangerskap. Inntektsnivået du hadde i dette året samsvarer med inntekten benyttet i din foreldrepengesak.\n\nVi anser at det er dette du mest sannsynlig ville hatt hvis du ikke ble sykmeldt.\n\n',
                                perioder: [
                                    {
                                        fom: '2024-02-29',
                                        tom: '2024-02-29',
                                    },
                                ],
                            },
                            {
                                type: 'SkjønnsfastsattSykepengegrunnlagKonklusjon',
                                begrunnelse: 'Vi har skjønnsfastsatt årsinntekten din til 419 900,00 kroner.',
                                perioder: [
                                    {
                                        fom: '2024-02-29',
                                        tom: '2024-02-29',
                                    },
                                ],
                            },
                        ],
                        tags: [],
                    },
                    opprettetTimestamp: '2024-04-23T12:23:13.019046Z',
                    orgnavn: 'Tropicos AS',
                    annullert: false,
                    revurdert: false,
                    dagerArbeidsgiver: [],
                    dagerPerson: [
                        {
                            dato: '2024-02-29',
                            belop: 1615,
                            grad: 100,
                            dagtype: 'NavDagSyk',
                            begrunnelser: [],
                        },
                    ],
                    sykepengebelopArbeidsgiver: 0,
                    sykepengebelopPerson: 1615,
                    andreArbeidsgivere: {},
                    organisasjoner: {
                        '817062652': 'Tropicos AS',
                    },
                },
            ],
            sykmeldtFnr: '14089520011',
        })
    }

    const accessToken = getToken(req)
    if (!accessToken) {
        return res.status(401).json({ message: 'Mangler autorisasjonstoken.' })
    }
    const validert = await validateAzureToken(accessToken)
    if (!validert.ok) {
        return res.status(401).json({ message: 'Feil i autorisasjonstoken.' })
    }

    const spinnsynObo = await requestAzureOboToken(accessToken, serverRuntimeConfig.spinnsynBackendClientId)
    if (!spinnsynObo.ok) {
        return res.status(401).json({ message: 'Kunne ikke hente spinnsyn obo token' })
    }

    const sykmeldtFnr = await hentModiaContext(req)
    if (!sykmeldtFnr) {
        return res.status(200).json({ vedtak: [], sykmeldtFnr: null })
    }

    const vedtakene = await hentVedtakFraSpinnsynBackendForInterne(spinnsynObo.token, sykmeldtFnr)
    return res.status(200).json({ vedtak: vedtakene, sykmeldtFnr })
}

export default handler
