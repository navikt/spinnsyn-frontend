import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const kunDirekte: RSVedtakWrapper = {
    id: '348a5462-456a-4bfc-9b54-11cd77a9937f',
    lest: false,
    organisasjoner: {},
    orgnavn: 'MATBUTIKKEN AS',
    andreArbeidsgivere: {},
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopSykmeldt: 24550,
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [
        { dato: '2021-02-08', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-09', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-10', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-11', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-12', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-13', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2021-02-14', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2021-02-15', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-16', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-17', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-18', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-19', dagtype: 'NavDagSyk', begrunnelser: [], belop: 2455, grad: 100 },
        { dato: '2021-02-20', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
        { dato: '2021-02-21', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100 },
    ],
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
        inntekt: 55000,
        sykepengegrunnlag: 638394,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '972674818': 660000,
        },
        begrensning: 'ER_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2021-02-21',
        utbetaling: {
            organisasjonsnummer: '972674818',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-3ca944f0e979',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            personOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-21',
                        dagsats: 2455,
                        grad: 100,
                        stønadsdager: 10,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-02-08',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-09',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-10',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-11',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },

                {
                    dato: '2021-02-12',
                    type: 'NavDagSyk',
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
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-16',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-17',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-18',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-19',
                    type: 'NavDagSyk',
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
        tags: ['IngenNyArbeidsgiverperiode', 'SykepengegrunnlagUnder2G'],
    },
    opprettetTimestamp: '2021-05-06T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
