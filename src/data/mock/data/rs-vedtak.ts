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
                            totalbeløp: 1404,
                            grad: 100
                        }
                    ]
                },
                utbetalingsdager: []
            }
        },
        opprettet: '2021-05-03',
        annullert: false
    }
]
