import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from '../../../utils/json-deep-copy'

export const vedtakMed40Grad: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: true,
    lestDato: '1970-01-01T01:00:00+01:00',
    orgnavn: 'PENGELØS SPAREBANK',
    vedtak: {
        organisasjonsnummer: '972674818',
        fom: '2021-02-08',
        tom: '2021-02-21',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding'
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad'
            }
        ],
        inntekt: 48513.47,
        sykepengegrunnlag: 582161.64,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '972674818': 582161.64,
        },
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
        }
    },
    opprettet: '2021-05-06',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [
        {
            dato: '2021-02-08',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-09',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-10',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-11',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-12',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-13',
            belop: 0,
            grad: 40.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-14',
            belop: 0,
            grad: 40.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-15',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-16',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-17',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-18',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-19',
            belop: 896,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-20',
            belop: 0,
            grad: 40.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-21',
            belop: 0,
            grad: 40.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        }
    ],
    sykepengebelopArbeidsgiver: 8960,
    dagerPerson: [],
    sykepengebelopPerson: 0,
}

export const ulestVedtakUtenUtbetalingsdager: RSVedtakWrapper = {
    id: '99f389f2-0084-481b-bed8-47f6ac3491d4',
    lest: false,
    lestDato: undefined,
    orgnavn: 'PENGELØS SPAREBANK',
    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-03-22',
        tom: '2021-04-09',
        dokumenter: [
            {
                dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                type: 'Sykmelding'
            },
            {
                dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                type: 'Søknad'
            }
        ],
        inntekt: 37500,
        sykepengegrunnlag: 455000,
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 15,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
        }
    },
    opprettet: '2021-05-03',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [
        {
            dato: '2021-03-22',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-23',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-24',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-25',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-26',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-26',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-27',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-28',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-29',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-30',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-03-31',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-01',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-02',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-03',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-04',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-05',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-06',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-07',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-08',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-09',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 21060,
}

export const ulestGammeltVedtak = jsonDeepCopy(ulestVedtakUtenUtbetalingsdager)
ulestGammeltVedtak.vedtak.sykepengegrunnlag = undefined
ulestGammeltVedtak.vedtak.inntekt = undefined

export const vedtakAnnullert: RSVedtakWrapper = {
    id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
    lest: true,
    lestDato: '2021-05-05T11:50:56.812287Z',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',

    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-04-27',
        tom: '2021-05-04',
        dokumenter: [
            { dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f', type: 'Sykmelding' },
            { dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00', type: 'Søknad' }
        ],
        inntekt: 37500.0,
        sykepengegrunnlag: 450000,
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: true,
        }
    },
    opprettet: '2021-05-05',
    annullert: true,
    revurdert: false,
    dagerArbeidsgiver: [
        {
            dato: '2021-04-27',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-28',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-29',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-30',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-01',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-02',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-03',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-04',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-05',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 8424,
}

export const vedtakRevurdert: RSVedtakWrapper = {
    id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634338',
    lest: true,
    lestDato: '2021-05-03T11:50:56.812287Z',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-04-26',
        tom: '2021-05-03',
        dokumenter: [
            { dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f', type: 'Sykmelding' },
            { dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6', type: 'Søknad' }
        ],
        inntekt: 37500.0,
        utbetaling: {
            organisasjonsnummer: '999999999',
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: true,
            foreløpigBeregnetSluttPåSykepenger: '1918-11-11',
        }
    },
    opprettet: '2021-05-03',
    annullert: false,
    revurdert: true,
    dagerArbeidsgiver: [
        {
            dato: '2021-04-26',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-27',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-28',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-29',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-04-30',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-01',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-02',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-05-03',
            belop: 1404,
            grad: 100,
            dagtype: 'NavDag',
            begrunnelser: []
        },
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 8424,
}

export const integrasjonsVedtak: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-fwefwwef',
    lest: true,
    lestDato: '1970-01-01T01:00:00+01:00',
    orgnavn: 'INTEGRASJON AS',
    vedtak: {
        organisasjonsnummer: '999999998',
        fom: '2021-01-30',
        tom: '2021-02-22',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding'
            },
            {
                dokumentId: 'dsfgew4fq43',
                type: 'Søknad'
            }
        ],
        inntekt: 30000,
        sykepengegrunnlag: 370000,
        utbetaling: {
            organisasjonsnummer: '999999998',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-asfafwq',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
        }
    },
    opprettet: '2021-05-06',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [
        {
            dato: '2021-01-25',
            belop: 0,
            grad: 0,
            dagtype: 'ArbeidsgiverperiodeDag',
            begrunnelser: []
        },
        {
            dato: '2021-01-26',
            belop: 0,
            grad: 0,
            dagtype: 'ArbeidsgiverperiodeDag',
            begrunnelser: []
        },
        {
            dato: '2021-01-27',
            belop: 0,
            grad: 0,
            dagtype: 'ArbeidsgiverperiodeDag',
            begrunnelser: []
        },
        {
            dato: '2021-01-28',
            belop: 0,
            grad: 0,
            dagtype: 'Arbeidsdag',
            begrunnelser: []
        },
        {
            dato: '2021-01-29',
            belop: 0,
            grad: 0,
            dagtype: 'ArbeidsgiverperiodeDag',
            begrunnelser: []
        },
        {
            dato: '2021-01-30',
            belop: 0,
            grad: 0,
            dagtype: 'Arbeidsdag',
            begrunnelser: []
        },
        {
            dato: '2021-01-31',
            belop: 0,
            grad: 0,
            dagtype: 'ArbeidsgiverperiodeDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-01',
            belop: 1000,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-02',
            belop: 1000,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-03',
            belop: 1000,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-04',
            belop: 1000,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-05',
            belop: 1000,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-06',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-07',
            belop: 0,
            grad: 0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-08',
            belop: 400,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-09',
            belop: 400,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-10',
            belop: 400,
            grad: 40.0,
            dagtype: 'NavDagDelvisSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-11',
            belop: 0,
            grad: 0,
            dagtype: 'Fridag',
            begrunnelser: []
        },
        {
            dato: '2021-02-12',
            belop: 0,
            grad: 0,
            dagtype: 'Fridag',
            begrunnelser: []
        },
        {
            dato: '2021-02-13',
            belop: 0,
            grad: 0,
            dagtype: 'ForeldetDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-14',
            belop: 0,
            grad: 0,
            dagtype: 'UkjentDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-15',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'SykepengedagerOppbrukt' ]
        },
        {
            dato: '2021-02-16',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'MinimumInntekt' ]
        },
        {
            dato: '2021-02-17',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'EgenmeldingUtenforArbeidsgiverperiode' ]
        },
        {
            dato: '2021-02-18',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'MinimumSykdomsgrad' ]
        },
        {
            dato: '2021-02-19',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'ManglerOpptjening' ]
        },
        {
            dato: '2021-02-20',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'ManglerMedlemskap' ]
        },
        {
            dato: '2021-02-21',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'EtterDødsdato' ]
        },
        {
            dato: '2021-02-22',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'UKJENT' ]
        },
        {
            dato: '2021-02-23',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'Over70' ]
        },
        {
            dato: '2021-02-24',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'MinimumInntektOver67' ]
        },
        {
            dato: '2021-02-25',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: [ 'SykepengedagerOppbruktOver67' ]
        }
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 6200,
}

export const avvistVedtak: RSVedtakWrapper = {
    'id': '55d8b14f-e1a6-45a8-ac64-b7af1e845b06',
    'lest': true,
    'lestDato': '2021-08-30T13:05:17.337442+02:00',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    'vedtak': {
        'organisasjonsnummer': '999999999',
        'fom': '2021-08-01',
        'tom': '2021-08-20',
        'dokumenter': [
            {
                'dokumentId': '1aaaf28e-af69-4c9d-8e91-d14a3906361f',
                'type': 'Sykmelding'
            },
            {
                'dokumentId': '6b1e5fff-3d99-48b9-8ddf-f121da4d88af',
                'type': 'Inntektsmelding'
            }
        ],
        'inntekt': 20000,
        'sykepengegrunnlag': 240000,
        'utbetaling': {
            'organisasjonsnummer': '896929119',
            'utbetalingId': 'b3f4d38e-a68e-4951-9d35-ee1bd6f37736',
            'forbrukteSykedager': 0,
            'gjenståendeSykedager': 248,
            'automatiskBehandling': false,

        }
    },
    'opprettet': '2021-08-30',
    'annullert': false,
    'revurdert': false,
    'dagerArbeidsgiver': [
        {
            'dato': '2021-08-01',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-02',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-03',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-04',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-05',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-06',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-07',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-08',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-09',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-10',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-11',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-12',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-13',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-14',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-15',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-16',
            'belop': 0,
            'grad': 0,
            'dagtype': 'ArbeidsgiverperiodeDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-17',
            'belop': 0,
            'grad': 0,
            'dagtype': 'Fridag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-18',
            'belop': 0,
            'grad': 0,
            'dagtype': 'Fridag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-19',
            'belop': 0,
            'grad': 0,
            'dagtype': 'Fridag',
            'begrunnelser': []
        },
        {
            'dato': '2021-08-20',
            'belop': 0,
            'grad': 0,
            'dagtype': 'AvvistDag',
            'begrunnelser': [ 'EtterDødsdato' ]
        }
    ],
    dagerPerson: [],
    sykepengebelopPerson: 0,
    'sykepengebelopArbeidsgiver': 0
}

export const vedtakRedusertTil6G: RSVedtakWrapper = {
    'id': '1ae568bd-71ff-4e31-b73f-c0c4ed85e01b',
    'lest': true,
    'lestDato': '2020-11-02T10:17:38.197496+01:00',
    'vedtak': {
        'organisasjonsnummer': '12345725',
        'fom': '2021-10-18',
        'tom': '2021-10-24',
        'dokumenter': [
            {
                'dokumentId': 'TODO',
                'type': 'Søknad'
            },
            {
                'dokumentId': 'TODO',
                'type': 'Sykmelding'
            },
            {
                'dokumentId': 'TODO',
                'type': 'Inntektsmelding'
            }
        ],
        'inntekt': 67033,
        'sykepengegrunnlag': 638394,
        'utbetaling': {
            'organisasjonsnummer': '12345725',
            'utbetalingId': '26dc7822-351d-469d-934f-a5e9e50c7ca6',
            'forbrukteSykedager': 10,
            'gjenståendeSykedager': 238,
            'automatiskBehandling': true
        },
        'grunnlagForSykepengegrunnlag': 804396,
        'grunnlagForSykepengegrunnlagPerArbeidsgiver': {
            '12345725': 804396
        },
        'begrensning': 'ER_6G_BEGRENSET'
    },
    'opprettet': '2021-11-04',
    'orgnavn': 'JOBB AS',
    'annullert': false,
    'revurdert': false,
    'dagerArbeidsgiver': [
        {
            'dato': '2021-10-18',
            'belop': 1964,
            'grad': 80,
            'dagtype': 'NavDagDelvisSyk',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-19',
            'belop': 1964,
            'grad': 80,
            'dagtype': 'NavDagDelvisSyk',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-20',
            'belop': 1964,
            'grad': 80,
            'dagtype': 'NavDagDelvisSyk',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-21',
            'belop': 1964,
            'grad': 80,
            'dagtype': 'NavDagDelvisSyk',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-22',
            'belop': 1964,
            'grad': 80,
            'dagtype': 'NavDagDelvisSyk',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-23',
            'belop': 0,
            'grad': 0,
            'dagtype': 'NavHelgDag',
            'begrunnelser': []
        },
        {
            'dato': '2021-10-24',
            'belop': 0,
            'grad': 0,
            'dagtype': 'NavHelgDag',
            'begrunnelser': []
        }
    ],
    'sykepengebelopArbeidsgiver': 9820,
    dagerPerson: [],
    sykepengebelopPerson: 0,
}

export const kombinertDirekteOgRefusjon: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: false,
    orgnavn: 'KIOSKEN AS',
    vedtak: {
        organisasjonsnummer: '972674818',
        fom: '2021-02-08',
        tom: '2021-02-21',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding'
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad'
            }
        ],
        inntekt: 55000,
        sykepengegrunnlag: 638394,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '972674818': 660000,
        },
        begrensning: 'ER_6G_BEGRENSET',
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 12,
            gjenståendeSykedager: 248,
            automatiskBehandling: true,
        }
    },
    opprettet: '2021-05-06',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [
        {
            dato: '2021-02-04',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-05',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        }
    ],
    dagerPerson: [
        {
            dato: '2021-02-08',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-09',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-10',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-11',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-12',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-13',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-14',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-15',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-16',
            belop: 2455,
            grad: 100,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-17',
            belop: 2455,
            grad: 100,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-18',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-19',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-20',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-21',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        }
    ],
    sykepengebelopArbeidsgiver: 2455 * 2,
    sykepengebelopPerson: 24550,
}

export const kunDirekte: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946ac',
    lest: false,
    orgnavn: 'MATBUTIKKEN AS',
    vedtak: {
        organisasjonsnummer: '972674818',
        fom: '2021-02-08',
        tom: '2021-02-21',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding'
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad'
            }
        ],
        inntekt: 55000,
        sykepengegrunnlag: 638394,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '972674818': 660000,
        },
        begrensning: 'ER_6G_BEGRENSET',
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true
        }
    },
    opprettet: '2021-05-06',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [],
    dagerPerson: [
        {
            dato: '2021-02-08',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-09',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-10',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-11',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-12',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-13',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-14',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-15',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-16',
            belop: 2455,
            grad: 100,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-17',
            belop: 2455,
            grad: 100,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-18',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-19',
            belop: 2455,
            grad: 100.0,
            dagtype: 'NavDagSyk',
            begrunnelser: []
        },
        {
            dato: '2021-02-20',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        },
        {
            dato: '2021-02-21',
            belop: 0,
            grad: 100.0,
            dagtype: 'NavHelgDag',
            begrunnelser: []
        }
    ],
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopPerson: 24550,
}


export const alleVedtak: RSVedtakWrapper[] = [
    vedtakMed40Grad,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakRevurdert,
    integrasjonsVedtak,
    avvistVedtak,
    vedtakRedusertTil6G,
    kunDirekte,
    kombinertDirekteOgRefusjon
]
