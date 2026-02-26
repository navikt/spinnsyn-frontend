import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const kunAgPeriode: RSVedtakWrapper = {
    id: '4e044d03-2dfe-45e9-a904-77777723',
    lest: false,
    organisasjoner: {},
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '123456789',
        fom: '2021-10-04',
        tom: '2021-10-19',
        dokumenter: [],
        inntekt: 74675,
        vedtakFattetTidspunkt: '2021-10-24',
        sykepengegrunnlag: 638394,
        utbetaling: {
            organisasjonsnummer: '123456789',
            utbetalingId: '4f649298-b308-4057-9654-abcd123',
            forbrukteSykedager: 4,
            gjenståendeSykedager: 244,
            automatiskBehandling: true,
            foreløpigBeregnetSluttPåSykepenger: '2022-09-30',
            utbetalingsdager: [
                {
                    dato: '2021-10-04',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-05',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-06',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-07',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-08',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-09',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-10',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-11',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-12',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-13',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-14',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-15',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-16',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-17',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-18',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-10-19',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
            ],
        },
        grunnlagForSykepengegrunnlag: 1091881.6,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '123456789': 896100,
            '987654321': 195781.6,
        },
        begrensning: 'ER_6G_BEGRENSET',
    },
    opprettetTimestamp: '2021-11-18T12:42:42.000Z',
    orgnavn: 'POSTEN NORGE AS, BÆRUM',
    andreArbeidsgivere: {
        'THE MINISTRY OF MAGIC AS': 195781.6,
    },
    annullert: false,
    revurdert: false,
    sykepengebelopArbeidsgiver: 0,
    sykepengebelopSykmeldt: 0,
}
