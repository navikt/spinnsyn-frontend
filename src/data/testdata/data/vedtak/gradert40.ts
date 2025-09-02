import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakMed40Grad: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-b521a6a946af',
    lest: true,
    organisasjoner: {},
    lestDato: '1970-01-01T01:00:00+01:00',
    orgnavn: 'PENGELØS SPAREBANK',
    andreArbeidsgivere: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '972674818',
        fom: '2021-02-08',
        tom: '2021-02-21',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Søknad',
            },
        ],
        inntekt: 48513.47,
        vedtakFattetTidspunkt: '2021-02-22',
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
                utbetalingslinjer: [
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-21',
                        dagsats: 896,
                        stønadsdager: 10,
                        grad: 40.0,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-02-08',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-09',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-10',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-11',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-12',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-13',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-14',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-15',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-16',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-17',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-18',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-19',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-20',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-21',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-05-06T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
