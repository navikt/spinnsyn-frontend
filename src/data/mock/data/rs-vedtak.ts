import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

export const nyeVedtak: RSVedtakWrapper[] = [
    {
        id: '99f389f2-0084-481b-bed8-47f6ac3491d4',
        lest: false,
        lestDato: undefined,
        vedtak: {
            organisasjonsnummer: 'org-nr',
            fom: '2021-03-22',
            tom: '2021-04-09',
            dokumenter: [
                {
                    dokumentId: '4391db7f-3046-4b71-a7b9-9ab5889cdad6',
                    type: 'Sykmelding'
                },
                {
                    dokumentId: '366294b0-e9b1-4556-9a15-4c20f5011ee9',
                    type: 'Søknad'
                }
            ],
            inntekt: 37500,
            sykepengegrunnlag: null as any,
            utbetaling: {
                organisasjonsnummer: 'org-nr',
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
    },
    {
        id: '9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
        lest: true,
        lestDato: '2021-05-05T11:50:56.812287Z',
        vedtak: {
            organisasjonsnummer: '972674818',
            fom: '2021-04-27',
            tom: '2021-05-04',
            dokumenter: [
                { dokumentId: 'f1c85505-e8db-4f6f-b049-ccd0cb051b7f', type: 'Sykmelding' },
                { dokumentId: 'c92de76d-e9aa-46d0-b10d-041a55b06913', type: 'Søknad' }
            ],
            inntekt: 37500.0,
            utbetaling: {
                organisasjonsnummer: '972674818',
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
]
