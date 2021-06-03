import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { arbeidstaker100, arbeidstaker100SoknadForNyttVedtak, integrasjonsSoknad } from './soknader'

export const vedtakMed40Grad: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: true,
    lestDato: '1970-01-01T01:00:00+01:00',
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
                dokumentId: arbeidstaker100SoknadForNyttVedtak.id,
                type: 'Søknad'
            }
        ],
        inntekt: 48513.47,
        sykepengegrunnlag: 582161.64,
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: '972674818',
                nettoBeløp: 8960,
                utbetalingslinjer: [
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-21',
                        dagsats: 896,
                        totalbeløp: 8960,
                        grad: 40.0,
                        stønadsdager: 10
                    }
                ]
            },
            utbetalingsdager: [
                {
                    dato: '2021-01-21',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-22',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-23',
                    type: 'Arbeidsdag'
                },
                {
                    dato: '2021-01-24',
                    type: 'Arbeidsdag'
                },
                {
                    dato: '2021-01-25',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-26',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-27',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-28',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-29',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-30',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-31',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-01',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-02',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-03',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-04',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-05',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-06',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-07',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-08',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-09',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-10',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-11',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-12',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-13',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-02-14',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-02-15',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-16',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-17',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-18',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-19',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-20',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-02-21',
                    type: 'NavHelgDag'
                }
            ]
        }
    },
    opprettet: '2021-05-06',
    annullert: false
}

export const ulestVedtakUtenUtbetalingsdager: RSVedtakWrapper = {
    id: '99f389f2-0084-481b-bed8-47f6ac3491d4',
    lest: false,
    lestDato: undefined,
    vedtak: {
        organisasjonsnummer: arbeidstaker100.arbeidsgiver?.orgnummer,
        fom: '2021-03-22',
        tom: '2021-04-09',
        dokumenter: [
            {
                dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                type: 'Sykmelding'
            },
            {
                dokumentId: arbeidstaker100.id,
                type: 'Søknad'
            }
        ],
        inntekt: 37500,
        sykepengegrunnlag: null as any,
        utbetaling: {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver?.orgnummer,
            forbrukteSykedager: 15,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 21060,
                utbetalingslinjer: [
                    {
                        fom: '2021-03-22',
                        tom: '2021-04-09',
                        dagsats: 1404,
                        totalbeløp: 21060,
                        grad: 100,
                        stønadsdager: 15,
                    }
                ]
            },
            utbetalingsdager: []
        }
    },
    opprettet: '2021-05-03',
    annullert: false
}

export const vedtakAnnullert: RSVedtakWrapper = {
    id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
    lest: true,
    lestDato: '2021-05-05T11:50:56.812287Z',
    vedtak: {
        organisasjonsnummer: arbeidstaker100.arbeidsgiver?.orgnummer,
        fom: '2021-04-27',
        tom: '2021-05-04',
        dokumenter: [
            { dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f', type: 'Sykmelding' },
            { dokumentId: arbeidstaker100.id, type: 'Søknad' }
        ],
        inntekt: 37500.0,
        utbetaling: {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver?.orgnummer,
            forbrukteSykedager: 9,
            gjenståendeSykedager: 186,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: '972674818',
                nettoBeløp: 8424,
                utbetalingslinjer: [
                    {
                        fom: '2021-04-27',
                        tom: '2021-05-04',
                        dagsats: 1404,
                        totalbeløp: 8424,
                        grad: 100.0,
                        stønadsdager: 6,
                    }
                ]
            },
            utbetalingsdager: []
        }
    },
    opprettet: '2021-05-05',
    annullert: true
}

export const integrasjonsVedtak: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-fwefwwef',
    lest: true,
    lestDato: '1970-01-01T01:00:00+01:00',
    vedtak: {
        organisasjonsnummer: integrasjonsSoknad.arbeidsgiver?.orgnummer,
        fom: '2021-02-01',
        tom: '2021-02-22',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding'
            },
            {
                dokumentId: integrasjonsSoknad.id,
                type: 'Søknad'
            }
        ],
        inntekt: 30000,
        sykepengegrunnlag: 120000,
        utbetaling: {
            organisasjonsnummer: integrasjonsSoknad.arbeidsgiver?.orgnummer,
            utbetalingId: '2b60ba06-7ddb-45e6-991b-asfafwq',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: integrasjonsSoknad.arbeidsgiver!.orgnummer,
                nettoBeløp: 8000,
                utbetalingslinjer: [
                    {
                        fom: '2021-02-01',
                        tom: '2021-02-05',
                        dagsats: 1000,
                        totalbeløp: 5000,
                        grad: 100.0,
                        stønadsdager: 5
                    },
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-10',
                        dagsats: 400,
                        totalbeløp: 1200,
                        grad: 40.0,
                        stønadsdager: 3
                    }
                ]
            },
            utbetalingsdager: [
                {
                    dato: '2021-01-25',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-26',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-27',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-28',
                    type: 'Arbeidsdag'
                },
                {
                    dato: '2021-01-29',
                    type: 'Arbeidsdag'
                },
                {
                    dato: '2021-01-30',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-01-31',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-02-01',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-02',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-03',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-04',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-05',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-06',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-02-07',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-02-08',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-09',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-10',
                    type: 'NavDag'
                },
                {
                    dato: '2021-02-11',
                    type: 'Fridag'
                },
                {
                    dato: '2021-02-12',
                    type: 'Fridag'
                },
                {
                    dato: '2021-02-13',
                    type: 'ForeldetDag'
                },
                {
                    dato: '2021-02-14',
                    type: 'UkjentDag'
                },
                {
                    dato: '2021-02-15',
                    type: 'AvvistDag',
                    begrunnelser: [ 'SykepengedagerOppbrukt' ]
                },
                {
                    dato: '2021-02-16',
                    type: 'AvvistDag',
                    begrunnelser: [ 'MinimumInntekt' ]
                },
                {
                    dato: '2021-02-17',
                    type: 'AvvistDag',
                    begrunnelser: [ 'EgenmeldingUtenforArbeidsgiverperiode' ]
                },
                {
                    dato: '2021-02-18',
                    type: 'AvvistDag',
                    begrunnelser: [ 'MinimumSykdomsgrad' ]
                },
                {
                    dato: '2021-02-19',
                    type: 'AvvistDag',
                    begrunnelser: [ 'ManglerOpptjening' ]
                },
                {
                    dato: '2021-02-20',
                    type: 'AvvistDag',
                    begrunnelser: [ 'ManglerMedlemskap' ]
                },
                {
                    dato: '2021-02-21',
                    type: 'AvvistDag',
                    begrunnelser: [ 'EtterDødsdato' ]
                },
                {
                    dato: '2021-02-22',
                    type: 'AvvistDag',
                    begrunnelser: [ 'UKJENT' ]
                },
                {
                    dato: '2021-02-23',
                    type: 'AvvistDag',
                    begrunnelser: [ 'UKJENT' ]
                },
                {
                    dato: '2021-02-24',
                    type: 'AvvistDag',
                    begrunnelser: [ 'UKJENT' ]
                },
                {
                    dato: '2021-02-28',
                    type: 'AvvistDag',
                    begrunnelser: [ 'UKJENT' ]
                }
            ]
        }
    },
    opprettet: '2021-05-06',
    annullert: false
}

export const nyeVedtak: RSVedtakWrapper[] = [
    vedtakMed40Grad,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    integrasjonsVedtak,
]
