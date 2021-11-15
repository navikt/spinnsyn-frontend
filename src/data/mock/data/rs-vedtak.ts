import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

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
        }
    },
    opprettet: '2021-05-06',
    annullert: false,
    revurdert: false,
    dager: [
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
    antallDagerMedUtbetaling: 2,
    antallDagerMedDirekteUtbetaling: 10,
    sykepengebelop: 2455*2,
    sykepengebelopDirekteUtbetaling: 24550,
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
