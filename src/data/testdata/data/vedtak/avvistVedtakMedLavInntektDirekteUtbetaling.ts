import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak'

export const avvistVedtakMedLavInntektDirekteUtbetaling: RSVedtakWrapper = {
    id: '55d8b14f-e1a6-45a8-bc64-b7af2e845b68',
    lest: false,
    organisasjoner: {},
    lestDato: '2021-08-30T13:05:17.337442+02:00',
    orgnavn: 'POSTEN NORGE AS, BÆRUM (direkte utbetaling)',
    andreArbeidsgivere: {},
    vedtak: {
        organisasjonsnummer: '999999999',
        fom: '2021-08-01',
        tom: '2021-08-21',
        dokumenter: [
            {
                dokumentId: '1aaaf28e-af69-4c9d-8e91-d14a3906361f',
                type: 'Sykmelding',
            },
            {
                dokumentId: '6b1e5fff-3d99-48b9-8ddf-f121da4d88af',
                type: 'Inntektsmelding',
            },
        ],
        inntekt: 20000,
        sykepengegrunnlag: 240000,
        vedtakFattetTidspunkt: '2021-08-22',
        utbetaling: {
            organisasjonsnummer: '896929119',
            utbetalingId: 'b3f4d38e-a68e-4951-9d35-ee1bd6f37736',
            forbrukteSykedager: 0,
            gjenståendeSykedager: 248,
            automatiskBehandling: false,
        },
    },
    opprettetTimestamp: '2021-08-30T12:42:42.000Z',
    annullert: false,
    revurdert: false,
    dagerArbeidsgiver: [],
    dagerPerson: [
        {
            dato: '2021-08-18',
            belop: 0,
            grad: 0,
            dagtype: 'Fridag',
            begrunnelser: [],
        },
        {
            dato: '2021-08-19',
            belop: 0,
            grad: 0,
            dagtype: 'Fridag',
            begrunnelser: [],
        },
        {
            dato: '2021-08-20',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: ['MinimumInntekt'],
        },
        {
            dato: '2021-08-21',
            belop: 0,
            grad: 0,
            dagtype: 'AvvistDag',
            begrunnelser: ['EtterDødsdato'],
        },
    ],
    sykepengebelopPerson: 0,
    sykepengebelopArbeidsgiver: 0,
}
