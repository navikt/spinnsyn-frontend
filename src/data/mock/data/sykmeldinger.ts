import { Sykmelding } from '../../../types/types'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

export const arbeidstaker100: Sykmelding = {
    'id': '7e90121c-b64b-4a1c-b7a5-93c9d95aba47',
    'startLegemeldtFravaer': '2020-04-01',
    'skalViseSkravertFelt': true,
    'identdato': '2020-04-01',
    'status': 'SENDT',
    'naermesteLederStatus': null,
    'erEgenmeldt': false,
    'erPapirsykmelding': false,
    'innsendtArbeidsgivernavn': 'POSTEN NORGE AS, BÆRUM',
    'valgtArbeidssituasjon': 'ARBEIDSTAKER',
    'mottakendeArbeidsgiver': {
        'navn': 'POSTEN NORGE AS, BÆRUM',
        'virksomhetsnummer': '974654458',
        'juridiskOrgnummer': '984661185'
    },
    'orgnummer': '974654458',
    'sendtdato': '2020-05-13T13:21:21',
    'sporsmal': {
        'arbeidssituasjon': 'ARBEIDSTAKER',
        'harForsikring': null,
        'fravaersperioder': [],
        'harAnnetFravaer': null
    },
    'pasient': {
        'fnr': '31057023263',
        'fornavn': 'Frida',
        'mellomnavn': 'Perma',
        'etternavn': 'Frost'
    },
    'arbeidsgiver': 'LOMMEN BARNEHAVE',
    'stillingsprosent': 100,
    'diagnose': {
        'hoveddiagnose': {
            'diagnose': 'TENDINITT INA',
            'diagnosekode': 'L87',
            'diagnosesystem': 'ICPC-2'
        },
        'bidiagnoser': [
            {
                'diagnose': 'GANGLION SENE',
                'diagnosekode': 'L87',
                'diagnosesystem': 'ICPC-2'
            }
        ],
        'fravaersgrunnLovfestet': null,
        'fravaerBeskrivelse': null,
        'svangerskap': false,
        'yrkesskade': false,
        'yrkesskadeDato': '2020-04-01'
    },
    'mulighetForArbeid': {
        'perioder': [
            {
                'fom': '2020-04-01',
                'tom': '2020-04-24',
                'grad': 100,
                'behandlingsdager': null,
                'reisetilskudd': null,
                'avventende': null,
                'redusertVenteperiode': null
            }
        ],
        'aktivitetIkkeMulig433': [
            'Annet'
        ],
        'aktivitetIkkeMulig434': [
            'Annet'
        ],
        'aarsakAktivitetIkkeMulig433': 'andre årsaker til sykefravær',
        'aarsakAktivitetIkkeMulig434': 'andre årsaker til sykefravær'
    },
    'friskmelding': {
        'arbeidsfoerEtterPerioden': true,
        'hensynPaaArbeidsplassen': 'Må ta det pent',
        'antarReturSammeArbeidsgiver': true,
        'antattDatoReturSammeArbeidsgiver': '2020-04-01',
        'antarReturAnnenArbeidsgiver': true,
        'tilbakemeldingReturArbeid': '2020-04-01',
        'utenArbeidsgiverAntarTilbakeIArbeid': false,
        'utenArbeidsgiverAntarTilbakeIArbeidDato': null,
        'utenArbeidsgiverTilbakemelding': null
    },
    'utdypendeOpplysninger': {
        'sykehistorie': 'Langvarig korsryggsmerter. Ømhet og smerte',
        'paavirkningArbeidsevne': 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: d6eca6d8-1a57-46b9-bb96-10d8ff96c419',
        'resultatAvBehandling': 'Nei',
        'henvisningUtredningBehandling': 'Henvist til fysio',
        'grupper': [
            {
                'id': '6.2',
                'sporsmal': [
                    {
                        'id': '6.2.1',
                        'svar': 'Langvarig korsryggsmerter. Ømhet og smerte'
                    },
                    {
                        'id': '6.2.2',
                        'svar': 'Kan ikke utføre arbeidsoppgaver 100% som kreves fra yrket. Duplikatbuster: d6eca6d8-1a57-46b9-bb96-10d8ff96c419'
                    },
                    {
                        'id': '6.2.3',
                        'svar': 'Nei'
                    },
                    {
                        'id': '6.2.4',
                        'svar': 'Henvist til fysio'
                    }
                ]
            }
        ]
    },
    'arbeidsevne': {
        'tilretteleggingArbeidsplass': 'Fortsett som sist.',
        'tiltakNAV': 'Pasienten har plager som er kommet tilbake etter operasjon. Det er nylig tatt MR bildet som viser forandringer i hånd som mulig må opereres. Venter på time. Det er mulig sykemledingen vil vare utover aktuell sm periode. ',
        'tiltakAndre': null
    },
    'meldingTilNav': {
        'navBoerTaTakISaken': false,
        'navBoerTaTakISakenBegrunnelse': null
    },
    'innspillTilArbeidsgiver': null,
    'tilbakedatering': {
        'dokumenterbarPasientkontakt': null,
        'tilbakedatertBegrunnelse': null
    },
    'bekreftelse': {
        'utstedelsesdato': '2020-03-31',
        'sykmelder': 'Frida Perma Frost',
        'sykmelderTlf': '94431152'
    }
}

export const arbeidstaker100nr2 = jsonDeepCopy(arbeidstaker100)
arbeidstaker100nr2.id = '7e90121c-b64b-4a1c-b7a5-93c9d95aba48'

export const sykmeldinger: Sykmelding[] = [
    arbeidstaker100, arbeidstaker100nr2
]
