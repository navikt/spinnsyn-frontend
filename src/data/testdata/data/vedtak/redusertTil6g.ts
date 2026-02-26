import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakRedusertTil6G: RSVedtakWrapper = {
    id: '1ae568bd-71ff-4e31-b73f-c0c4ed85e01b',
    lest: true,
    organisasjoner: {},
    lestDato: '2020-11-02T10:17:38.197496+01:00',
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '12345725',
        fom: '2021-10-18',
        tom: '2021-10-24',
        dokumenter: [
            {
                dokumentId: 'TODO',
                type: 'Søknad',
            },
            {
                dokumentId: 'TODO',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'TODO',
                type: 'Inntektsmelding',
            },
        ],
        inntekt: 67033,
        sykepengegrunnlag: 638394,
        vedtakFattetTidspunkt: '2021-02-24',
        utbetaling: {
            organisasjonsnummer: '12345725',
            utbetalingId: '26dc7822-351d-469d-934f-a5e9e50c7ca6',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-10-18',
                        tom: '2021-10-24',
                        grad: 80,
                        dagsats: 1964,
                        stønadsdager: 6,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-10-18',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-19',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-20',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-21',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-22',
                    type: 'NavDagDelvisSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-23',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-24',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 804396,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '12345725': 804396,
        },
        begrensning: 'ER_6G_BEGRENSET',
    },
    opprettetTimestamp: '2021-11-04T12:42:42.000Z',
    orgnavn: 'JOBB AS',
    andreArbeidsgivere: {},
    annullert: false,
    revurdert: false,
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopSykmeldt: 0,
}
