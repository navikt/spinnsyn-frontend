import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { arbeidstaker100, arbeidstaker100SoknadForNyttVedtak } from './soknader'

export const vedtakMed100Grad: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: true,
    lestDato: '1970-01-01T01:00:00+01:00',
    vedtak: {
        organisasjonsnummer: '972674818',
        fom: '2021-04-01',
        tom: '2021-04-30',
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
        inntekt: 37500.0,
        sykepengegrunnlag: 450000.0,
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 22,
            gjenståendeSykedager: 173,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: '972674818',
                nettoBeløp: 30888,
                utbetalingslinjer: [
                    {
                        fom: '2021-04-01',
                        tom: '2021-04-30',
                        dagsats: 1404,
                        totalbeløp: 30888,
                        grad: 100.0,
                        stønadsdager: 22
                    }
                ]
            },
            utbetalingsdager: [
                {
                    dato: '2021-04-01',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-02',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-03',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-04',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-05',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-06',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-07',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-08',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-09',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-10',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-11',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-12',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-13',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-14',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-15',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-16',
                    type: 'ArbeidsgiverperiodeDag'
                },
                {
                    dato: '2021-04-17',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-04-18',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-04-19',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-20',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-21',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-22',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-23',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-24',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-04-25',
                    type: 'NavHelgDag'
                },
                {
                    dato: '2021-04-26',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-27',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-28',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-29',
                    type: 'NavDag'
                },
                {
                    dato: '2021-04-30',
                    type: 'NavDag'
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

export const nyeVedtak: RSVedtakWrapper[] = [
    vedtakMed100Grad,
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert
]
