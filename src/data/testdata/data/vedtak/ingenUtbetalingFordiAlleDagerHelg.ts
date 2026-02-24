import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const ingenUtbetalingFordiAlleDagerHelg: RSVedtakWrapper = {
    id: '66d8b14f-e1a6-45a8-bc64-b7af2e845b68',
    lest: false,
    organisasjoner: {},
    lestDato: '2021-08-30T13:05:17.337442+02:00',
    orgnavn: 'POSTEN NORGE AS, BÆRUM (direkte utbetaling)',
    andreArbeidsgivere: {},
    daglisteArbeidsgiver: [],
    daglisteSykmeldt: [],
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999999',
        fom: '2024-10-26',
        tom: '2024-10-27',
        dokumenter: [
            {
                dokumentId: '6c45c273-934e-45d7-8988-3dc7ccf8e30a',
                type: 'Søknad',
            },
            { dokumentId: '221598e4-2721-43b1-ad1f-e4f9c02765aa', type: 'Sykmelding' },
        ],
        inntekt: 56000,
        sykepengegrunnlag: 670000,
        vedtakFattetTidspunkt: '2021-08-22',
        utbetaling: {
            organisasjonsnummer: '999999999',
            utbetalingId: 'b3f4d38e-a68e-3850-9d35-ee1bd6f37736',
            forbrukteSykedager: 0,
            gjenståendeSykedager: 172,
            automatiskBehandling: false,
        },
    },
    opprettetTimestamp: '2021-08-30T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
