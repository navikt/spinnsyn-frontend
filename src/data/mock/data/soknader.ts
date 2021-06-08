import { RSSoknad } from '../../../types/rs-types/rs-soknad'

export const arbeidstaker100: RSSoknad = {
    'id': 'ab42de49-bbf3-4e95-9b25-bb30d795dacb',
    'sykmeldingId': 'bfc81767-042e-46fe-a49f-9dbce122113c',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'SENDT',
    'fom': '2020-09-12',
    'tom': '2020-09-27',
    'opprettetDato': '2020-09-28',
    'sendtTilNAVDato': null,
    'sendtTilArbeidsgiverDato': '2020-09-28T15:11:05.094857',
    'avbruttDato': null,
    'startSykeforlop': '2020-09-12',
    'sykmeldingUtskrevet': '2020-09-12',
    'arbeidsgiver': {
        'navn': 'POSTEN NORGE AS, BÆRUM',
        'orgnummer': '995816598'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [ {
        'fom': '2020-09-12',
        'tom': '2020-09-27',
        'grad': 100,
        'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
    } ],
    'sporsmal': [ {
        'id': '1',
        'tag': 'ANSVARSERKLARING',
        'sporsmalstekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'CHECKED', 'avgittAv': null } ],
        'undersporsmal': []
    }, {
        'id': '2',
        'tag': 'PERMITTERT_NAA',
        'sporsmalstekst': 'Er du permittert nå?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '3',
            'tag': 'PERMITTERT_NAA_NAR',
            'sporsmalstekst': 'Velg første dag i permitteringen',
            'undertekst': null,
            'svartype': 'DATO',
            'min': '2020-02-01',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '4',
        'tag': 'PERMITTERT_PERIODE',
        'sporsmalstekst': 'Har du vært permittert i noen perioder etter 1. februar 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '5',
            'tag': 'PERMITTERT_PERIODE_NAR',
            'sporsmalstekst': null,
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-02-01',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '6',
        'tag': 'EGENMELDINGER',
        'sporsmalstekst': 'Vi har registrert at du ble sykmeldt lørdag 12. september 2020. Var du syk og borte fra jobb i perioden 27. august - 11. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '7',
            'tag': 'TIDLIGERE_SYK',
            'sporsmalstekst': null,
            'undertekst': null,
            'svartype': 'CHECKBOX_GRUPPE',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': [ {
                'id': '8',
                'tag': 'TIDLIGERE_EGENMELDING',
                'sporsmalstekst': 'Jeg var syk med egenmelding',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '9',
                    'tag': 'EGENMELDINGER_NAR',
                    'sporsmalstekst': 'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 12. september 2020.',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-03-12',
                    'max': '2020-09-11',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '10',
                'tag': 'TIDLIGERE_PAPIRSYKMELDING',
                'sporsmalstekst': 'Jeg var syk med papirsykmelding',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '11',
                    'tag': 'PAPIRSYKMELDING_NAR',
                    'sporsmalstekst': 'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 12. september 2020.',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2020-03-12',
                    'max': '2020-09-11',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            } ]
        } ]
    }, {
        'id': '12',
        'tag': 'TILBAKE_I_ARBEID',
        'sporsmalstekst': 'Var du tilbake i fullt arbeid hos POSTEN NORGE AS, BÆRUM i løpet av perioden 12. - 27. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': true,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '13',
            'tag': 'TILBAKE_NAR',
            'sporsmalstekst': 'Når begynte du å jobbe igjen?',
            'undertekst': null,
            'svartype': 'DATO',
            'min': '2020-09-12',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '14',
        'tag': 'FERIE_V2',
        'sporsmalstekst': 'Tok du ut ferie mens du var sykmeldt 12. - 27. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '15',
            'tag': 'FERIE_NAR_V2',
            'sporsmalstekst': 'Når tok du ut ferie?',
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-09-12',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '16',
        'tag': 'PERMISJON_V2',
        'sporsmalstekst': 'Tok du permisjon mens du var sykmeldt 12. - 27. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '17',
            'tag': 'PERMISJON_NAR_V2',
            'sporsmalstekst': 'Når tok du permisjon?',
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-09-12',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '18',
        'tag': 'UTLAND_V2',
        'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 12. - 27. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '19',
            'tag': 'UTLAND_NAR_V2',
            'sporsmalstekst': 'Når var du utenfor EØS?',
            'undertekst': null,
            'svartype': 'PERIODER',
            'min': '2020-09-12',
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '20',
        'tag': 'ARBEID_UTENFOR_NORGE',
        'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': []
    }, {
        'id': '21',
        'tag': 'JOBBET_DU_100_PROSENT_0',
        'sporsmalstekst': 'I perioden 12. - 27. september 2020 var du 100 % sykmeldt fra POSTEN NORGE AS, BÆRUM. Jobbet du noe i denne perioden?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '22',
            'tag': 'HVOR_MANGE_TIMER_PER_UKE_0',
            'sporsmalstekst': 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
            'undertekst': 'timer per uke',
            'svartype': 'TALL',
            'min': '1',
            'max': '150',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }, {
            'id': '23',
            'tag': 'HVOR_MYE_HAR_DU_JOBBET_0',
            'sporsmalstekst': 'Hvor mye jobbet du totalt 12. - 27. september 2020 hos POSTEN NORGE AS, BÆRUM?',
            'undertekst': null,
            'svartype': 'RADIO_GRUPPE_TIMER_PROSENT',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': [ {
                'id': '24',
                'tag': 'HVOR_MYE_PROSENT_0',
                'sporsmalstekst': 'prosent',
                'undertekst': null,
                'svartype': 'RADIO',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '25',
                    'tag': 'HVOR_MYE_PROSENT_VERDI_0',
                    'sporsmalstekst': null,
                    'undertekst': 'prosent',
                    'svartype': 'TALL',
                    'min': '1',
                    'max': '99',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '26',
                'tag': 'HVOR_MYE_TIMER_0',
                'sporsmalstekst': 'timer',
                'undertekst': null,
                'svartype': 'RADIO',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '27',
                    'tag': 'HVOR_MYE_TIMER_VERDI_0',
                    'sporsmalstekst': null,
                    'undertekst': 'timer totalt',
                    'svartype': 'TALL',
                    'min': '1',
                    'max': '343',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            } ]
        } ]
    }, {
        'id': '28',
        'tag': 'ANDRE_INNTEKTSKILDER',
        'sporsmalstekst': 'Har du andre inntektskilder enn POSTEN NORGE AS, BÆRUM?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '29',
            'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Hvilke andre inntektskilder har du?',
            'undertekst': 'Du trenger ikke oppgi penger fra NAV',
            'svartype': 'CHECKBOX_GRUPPE',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': [ {
                'id': '30',
                'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                'sporsmalstekst': 'andre arbeidsforhold',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '31',
                    'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '32',
                'tag': 'INNTEKTSKILDE_SELVSTENDIG',
                'sporsmalstekst': 'selvstendig næringsdrivende',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '33',
                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '34',
                'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                'sporsmalstekst': 'dagmamma',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '35',
                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '36',
                'tag': 'INNTEKTSKILDE_JORDBRUKER',
                'sporsmalstekst': 'jordbruk / fiske / reindrift',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '37',
                    'tag': 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '38',
                'tag': 'INNTEKTSKILDE_FRILANSER',
                'sporsmalstekst': 'frilanser',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': 'CHECKED',
                'svar': [],
                'undersporsmal': [ {
                    'id': '39',
                    'tag': 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                } ]
            }, {
                'id': '40',
                'tag': 'INNTEKTSKILDE_ANNET',
                'sporsmalstekst': 'annet',
                'undertekst': null,
                'svartype': 'CHECKBOX',
                'min': null,
                'max': null,
                'pavirkerAndreSporsmal': false,
                'kriterieForVisningAvUndersporsmal': null,
                'svar': [],
                'undersporsmal': []
            } ]
        } ]
    }, {
        'id': '41',
        'tag': 'UTDANNING',
        'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 12. - 27. september 2020?',
        'undertekst': null,
        'svartype': 'JA_NEI',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': 'JA',
        'svar': [ { 'verdi': 'NEI', 'avgittAv': null } ],
        'undersporsmal': [ {
            'id': '42',
            'tag': 'UTDANNING_START',
            'sporsmalstekst': 'Når startet du på utdanningen?',
            'undertekst': null,
            'svartype': 'DATO',
            'min': null,
            'max': '2020-09-27',
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        }, {
            'id': '43',
            'tag': 'FULLTIDSSTUDIUM',
            'sporsmalstekst': 'Er utdanningen et fulltidsstudium?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        } ]
    }, {
        'id': '44',
        'tag': 'VAER_KLAR_OVER_AT',
        'sporsmalstekst': 'Viktig å være klar over:',
        'undertekst': '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</p>',
        'svartype': 'IKKE_RELEVANT',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [],
        'undersporsmal': []
    }, {
        'id': '45',
        'tag': 'BEKREFT_OPPLYSNINGER',
        'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
        'undertekst': null,
        'svartype': 'CHECKBOX_PANEL',
        'min': null,
        'max': null,
        'pavirkerAndreSporsmal': false,
        'kriterieForVisningAvUndersporsmal': null,
        'svar': [ { 'verdi': 'CHECKED', 'avgittAv': null } ],
        'undersporsmal': []
    } ],
    'egenmeldtSykmelding': false
}

export const arbeidstaker100SoknadForNyttVedtak: RSSoknad = {
    'id': 'ddaf9bd6-e31b-4ece-b16a-dcf4452bddce',
    'sykmeldingId': 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
    'soknadstype': 'ARBEIDSTAKERE',
    'status': 'SENDT',
    'fom': '2021-04-01',
    'tom': '2021-04-30',
    'opprettetDato': '2021-05-06',
    'sendtTilNAVDato': '2021-05-06T13:07:36.840406',
    'sendtTilArbeidsgiverDato': '2021-05-06T13:07:36.840406',
    'avbruttDato': null,
    'startSykeforlop': '2021-04-01',
    'sykmeldingUtskrevet': '2021-04-01',
    'arbeidsgiver': {
        'navn': 'PENGELØS SPAREBANK',
        'orgnummer': '972674818'
    },
    'korrigerer': null,
    'korrigertAv': null,
    'arbeidssituasjon': 'ARBEIDSTAKER',
    'soknadPerioder': [
        {
            'fom': '2021-04-01',
            'tom': '2021-04-30',
            'grad': 100,
            'sykmeldingstype': 'AKTIVITET_IKKE_MULIG'
        }
    ],
    'sporsmal': [
        {
            'id': '1518282',
            'tag': 'ANSVARSERKLARING',
            'sporsmalstekst': 'Jeg vet at jeg kan miste retten til sykepenger hvis opplysningene jeg gir ikke er riktige eller fullstendige. Jeg vet også at NAV kan holde igjen eller kreve tilbake penger, og at å gi feil opplysninger kan være straffbart.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'CHECKED',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        },
        {
            'id': '1518309',
            'tag': 'EGENMELDINGER',
            'sporsmalstekst': 'Vi har registrert at du ble sykmeldt torsdag 1. april 2021. Var du syk og borte fra jobb i perioden 16. - 31. mars 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518310',
                    'tag': 'TIDLIGERE_SYK',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '1518311',
                            'tag': 'TIDLIGERE_EGENMELDING',
                            'sporsmalstekst': 'Jeg var syk med egenmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518312',
                                    'tag': 'EGENMELDINGER_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med egenmelding? Du trenger bare oppgi dager før 1. april 2021.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2020-10-01',
                                    'max': '2021-03-31',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518313',
                            'tag': 'TIDLIGERE_PAPIRSYKMELDING',
                            'sporsmalstekst': 'Jeg var syk med papirsykmelding',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518314',
                                    'tag': 'PAPIRSYKMELDING_NAR',
                                    'sporsmalstekst': 'Hvilke dager var du syk med papirsykmelding? Du trenger bare oppgi dager før 1. april 2021.',
                                    'undertekst': null,
                                    'svartype': 'PERIODER',
                                    'min': '2020-10-01',
                                    'max': '2021-03-31',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'id': '1518283',
            'tag': 'TILBAKE_I_ARBEID',
            'sporsmalstekst': 'Var du tilbake i fullt arbeid hos PENGELØS SPAREBANK i løpet av perioden 1. - 30. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': true,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518284',
                    'tag': 'TILBAKE_NAR',
                    'sporsmalstekst': 'Når begynte du å jobbe igjen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2021-04-01',
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': true,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518285',
            'tag': 'FERIE_V2',
            'sporsmalstekst': 'Hadde du ferie i tidsrommet 1. - 30. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518286',
                    'tag': 'FERIE_NAR_V2',
                    'sporsmalstekst': 'Når tok du ut ferie?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2021-04-01',
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518287',
            'tag': 'PERMISJON_V2',
            'sporsmalstekst': 'Tok du permisjon mens du var sykmeldt 1. - 30. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518288',
                    'tag': 'PERMISJON_NAR_V2',
                    'sporsmalstekst': 'Når tok du permisjon?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2021-04-01',
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518289',
            'tag': 'UTLAND_V2',
            'sporsmalstekst': 'Var du på reise utenfor EØS mens du var sykmeldt 1. - 30. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518290',
                    'tag': 'UTLAND_NAR_V2',
                    'sporsmalstekst': 'Når var du utenfor EØS?',
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2021-04-01',
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518315',
            'tag': 'ARBEID_UTENFOR_NORGE',
            'sporsmalstekst': 'Utfører du arbeid andre steder enn i Norge?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        },
        {
            'id': '1518320',
            'tag': 'JOBBET_DU_100_PROSENT_0',
            'sporsmalstekst': 'I perioden 1. - 30. april 2021 var du 100 % sykmeldt fra PENGELØS SPAREBANK. Jobbet du noe i denne perioden?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518321',
                    'tag': 'HVOR_MANGE_TIMER_PER_UKE_0',
                    'sporsmalstekst': 'Hvor mange timer i uken jobber du vanligvis når du er frisk? Varierer det, kan du oppgi gjennomsnittet.',
                    'undertekst': 'timer per uke',
                    'svartype': 'TALL',
                    'min': '1',
                    'max': '150',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '1518322',
                    'tag': 'HVOR_MYE_HAR_DU_JOBBET_0',
                    'sporsmalstekst': 'Hvor mye jobbet du totalt 1. - 30. april 2021 hos PENGELØS SPAREBANK?',
                    'undertekst': null,
                    'svartype': 'RADIO_GRUPPE_TIMER_PROSENT',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '1518323',
                            'tag': 'HVOR_MYE_PROSENT_0',
                            'sporsmalstekst': 'prosent',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518324',
                                    'tag': 'HVOR_MYE_PROSENT_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'prosent',
                                    'svartype': 'TALL',
                                    'min': '1',
                                    'max': '99',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518325',
                            'tag': 'HVOR_MYE_TIMER_0',
                            'sporsmalstekst': 'timer',
                            'undertekst': null,
                            'svartype': 'RADIO',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518326',
                                    'tag': 'HVOR_MYE_TIMER_VERDI_0',
                                    'sporsmalstekst': null,
                                    'undertekst': 'timer totalt',
                                    'svartype': 'TALL',
                                    'min': '1',
                                    'max': '643',
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            'id': '1518291',
            'tag': 'ANDRE_INNTEKTSKILDER',
            'sporsmalstekst': 'Har du andre inntektskilder enn PENGELØS SPAREBANK? Du trenger ikke oppgi penger fra NAV.',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518292',
                    'tag': 'HVILKE_ANDRE_INNTEKTSKILDER',
                    'sporsmalstekst': 'Hvilke andre inntektskilder har du?',
                    'undertekst': null,
                    'svartype': 'CHECKBOX_GRUPPE',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': [
                        {
                            'id': '1518293',
                            'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD',
                            'sporsmalstekst': 'andre arbeidsforhold',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518294',
                                    'tag': 'INNTEKTSKILDE_ANDRE_ARBEIDSFORHOLD_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518295',
                            'tag': 'INNTEKTSKILDE_SELVSTENDIG',
                            'sporsmalstekst': 'selvstendig næringsdrivende',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518296',
                                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518297',
                            'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA',
                            'sporsmalstekst': 'dagmamma',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518298',
                                    'tag': 'INNTEKTSKILDE_SELVSTENDIG_DAGMAMMA_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518299',
                            'tag': 'INNTEKTSKILDE_JORDBRUKER',
                            'sporsmalstekst': 'jordbruk / fiske / reindrift',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518300',
                                    'tag': 'INNTEKTSKILDE_JORDBRUKER_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518301',
                            'tag': 'INNTEKTSKILDE_FRILANSER',
                            'sporsmalstekst': 'frilanser',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': 'CHECKED',
                            'svar': [],
                            'undersporsmal': [
                                {
                                    'id': '1518302',
                                    'tag': 'INNTEKTSKILDE_FRILANSER_ER_DU_SYKMELDT',
                                    'sporsmalstekst': 'Er du sykmeldt fra dette?',
                                    'undertekst': null,
                                    'svartype': 'JA_NEI',
                                    'min': null,
                                    'max': null,
                                    'pavirkerAndreSporsmal': false,
                                    'kriterieForVisningAvUndersporsmal': null,
                                    'svar': [],
                                    'undersporsmal': []
                                }
                            ]
                        },
                        {
                            'id': '1518303',
                            'tag': 'INNTEKTSKILDE_ANNET',
                            'sporsmalstekst': 'annet',
                            'undertekst': null,
                            'svartype': 'CHECKBOX',
                            'min': null,
                            'max': null,
                            'pavirkerAndreSporsmal': false,
                            'kriterieForVisningAvUndersporsmal': null,
                            'svar': [],
                            'undersporsmal': []
                        }
                    ]
                }
            ]
        },
        {
            'id': '1518304',
            'tag': 'UTDANNING',
            'sporsmalstekst': 'Har du vært under utdanning i løpet av perioden 1. - 30. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518305',
                    'tag': 'UTDANNING_START',
                    'sporsmalstekst': 'Når startet du på utdanningen?',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': null,
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                },
                {
                    'id': '1518306',
                    'tag': 'FULLTIDSSTUDIUM',
                    'sporsmalstekst': 'Er utdanningen et fulltidsstudium?',
                    'undertekst': null,
                    'svartype': 'JA_NEI',
                    'min': null,
                    'max': null,
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518316',
            'tag': 'PERMITTERT_NAA',
            'sporsmalstekst': 'Var du permittert av arbeidsgiveren din da du ble sykmeldt 1. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518317',
                    'tag': 'PERMITTERT_NAA_NAR',
                    'sporsmalstekst': 'Velg første dag i permitteringen',
                    'undertekst': null,
                    'svartype': 'DATO',
                    'min': '2020-02-01',
                    'max': '2021-04-30',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518318',
            'tag': 'PERMITTERT_PERIODE',
            'sporsmalstekst': 'Har du vært permittert av arbeidsgiveren din i mer enn 14 sammenhengende dager mellom 1. mars - 1. april 2021?',
            'undertekst': null,
            'svartype': 'JA_NEI',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': 'JA',
            'svar': [
                {
                    'verdi': 'NEI',
                    'avgittAv': null
                }
            ],
            'undersporsmal': [
                {
                    'id': '1518319',
                    'tag': 'PERMITTERT_PERIODE_NAR',
                    'sporsmalstekst': null,
                    'undertekst': null,
                    'svartype': 'PERIODER',
                    'min': '2021-03-01',
                    'max': '2021-04-01',
                    'pavirkerAndreSporsmal': false,
                    'kriterieForVisningAvUndersporsmal': null,
                    'svar': [],
                    'undersporsmal': []
                }
            ]
        },
        {
            'id': '1518307',
            'tag': 'VAER_KLAR_OVER_AT',
            'sporsmalstekst': 'Viktig å være klar over:',
            'undertekst': '<ul><li>Du kan bare få sykepenger hvis det er din egen sykdom eller skade som hindrer deg i å jobbe. Sosiale eller økonomiske problemer gir ikke rett til sykepenger.</li><li>Du kan miste retten til sykepenger hvis du nekter å opplyse om din egen arbeidsevne, eller hvis du ikke tar imot behandling eller tilrettelegging.</li><li>Retten til sykepenger gjelder bare inntekt du har mottatt som lønn og betalt skatt av på sykmeldingstidspunktet.</li><li>NAV kan innhente opplysninger som er nødvendige for å behandle søknaden.</li><li>Du må melde fra til NAV hvis du satt i varetekt, sonet straff eller var under forvaring i sykmeldingsperioden.</li><li>Fristen for å søke sykepenger er som hovedregel 3 måneder</li></ul><p>Du kan lese mer om rettigheter og plikter på <a href="https://www.nav.no/sykepenger" target="_blank">nav.no/sykepenger</a>.</p>',
            'svartype': 'IKKE_RELEVANT',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [],
            'undersporsmal': []
        },
        {
            'id': '1518308',
            'tag': 'BEKREFT_OPPLYSNINGER',
            'sporsmalstekst': 'Jeg har lest all informasjonen jeg har fått i søknaden og bekrefter at opplysningene jeg har gitt er korrekte.',
            'undertekst': null,
            'svartype': 'CHECKBOX_PANEL',
            'min': null,
            'max': null,
            'pavirkerAndreSporsmal': false,
            'kriterieForVisningAvUndersporsmal': null,
            'svar': [
                {
                    'verdi': 'CHECKED',
                    'avgittAv': null
                }
            ],
            'undersporsmal': []
        }
    ],
    'egenmeldtSykmelding': false
}

export const integrasjonsSoknad: RSSoknad = {
    ...arbeidstaker100SoknadForNyttVedtak,
    ...{
        'id': 'ddaf9bd6-e31b-4ece-b16a-wefwe',
        'arbeidsgiver': {
            'navn': 'INTEGRASJON AS',
            'orgnummer': '972674818'
        }
    }
}

export const soknader: RSSoknad[] = [ arbeidstaker100, arbeidstaker100SoknadForNyttVedtak, integrasjonsSoknad ]
