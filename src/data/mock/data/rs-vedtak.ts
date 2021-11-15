import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { kunDirektePerson } from './personas'

export const kombinertDirekteOgRefusjon: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: false,
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
    annullert: false,
    revurdert: false,
    dager: [
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
    dagerDirekteutbetaling: [
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
    antallDagerMedUtbetaling: 10,
    antallDagerMedDirekteUtbetaling: 5,
    sykepengebelop: 8960,
    sykepengebelopDirekteUtbetaling: 12543,
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
    annullert: false,
    revurdert: false,
    dager: [],
    dagerDirekteutbetaling: [
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
    antallDagerMedUtbetaling: 0,
    antallDagerMedDirekteUtbetaling: 10,
    sykepengebelop: 0,
    sykepengebelopDirekteUtbetaling: 24550,
}

export const alleVedtak = [ kunDirekte, kombinertDirekteOgRefusjon ]
