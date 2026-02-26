import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'
import { jsonDeepCopy } from '../../../../utils/json-deep-copy'

export const innvilgelseMedBegrunnelseVedtak: RSVedtakWrapper = {
    id: 'bcd7b2ec-fcc1-4a8b-816c-42256138d0c4',
    lest: true,
    lestDato: '2024-12-02T12:58:53.342144+01:00',
    daglisteArbeidsgiver: [
        { dato: '2024-10-16', dagtype: 'NavDag', begrunnelser: [], belop: 1287, grad: 100.0 },
        { dato: '2024-10-17', dagtype: 'NavDag', begrunnelser: [], belop: 1287, grad: 100.0 },
        { dato: '2024-10-18', dagtype: 'NavDag', begrunnelser: [], belop: 1287, grad: 100.0 },
        { dato: '2024-10-19', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100.0 },
        { dato: '2024-10-20', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100.0 },
        { dato: '2024-10-21', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-22', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-23', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-24', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-25', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-26', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100.0 },
        { dato: '2024-10-27', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 100.0 },
        { dato: '2024-10-28', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-29', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-30', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
        { dato: '2024-10-31', dagtype: 'NavDag', begrunnelser: [], belop: 732, grad: 100.0 },
    ],
    daglisteSykmeldt: [],
    organisasjoner: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '896929119',
        fom: '2024-10-16',
        tom: '2024-10-31',
        dokumenter: [
            {
                dokumentId: '5979a380-843c-484f-a202-c7f6677e5bf1',
                type: 'Søknad',
            },
            {
                dokumentId: '819ba0a6-12c5-4545-a39a-aecc3aeea5f5',
                type: 'Sykmelding',
            },
        ],
        inntekt: 27890.0,
        sykepengegrunnlag: 334680.0,
        utbetaling: {
            organisasjonsnummer: '896929119',
            utbetalingId: '28348e61-1539-4d5b-b87c-e9e71bec8d5c',
            forbrukteSykedager: 23,
            gjenståendeSykedager: 225,
            automatiskBehandling: false,
            foreløpigBeregnetSluttPåSykepenger: '2025-09-11',
            utbetalingType: 'UTBETALING',
        },
        grunnlagForSykepengegrunnlag: 334680.0,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '896929119': 334680.0,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2024-12-02',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterHovedregel',
            omregnetÅrsinntekt: 334680.0,
            innrapportertÅrsinntekt: 334680.0,
            avviksprosent: 0.0,
            '6G': 744168.0,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '896929119',
                    omregnetÅrsinntekt: 334680.0,
                },
            ],
        },
        begrunnelser: [
            {
                type: 'Innvilgelse',
                begrunnelse: 'Her får du penger',
                perioder: [
                    {
                        fom: '2024-10-16',
                        tom: '2024-10-31',
                    },
                ],
            },
        ],
        tags: [],
        saksbehandler: {
            navn: 'Petter Smart',
            ident: 'L123456',
        },
        beslutter: {
            navn: 'Donald Duck',
            ident: 'L654321',
        },
    },
    opprettetTimestamp: '2024-12-02T11:56:57.472998Z',
    orgnavn: 'Sauefabrikk',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
    sykepengebelopArbeidsgiver: 10449,
    sykepengebelopSykmeldt: 0,
}

export const innvilgelseMedTomBegrunnelseVedtak = jsonDeepCopy(innvilgelseMedBegrunnelseVedtak)
innvilgelseMedTomBegrunnelseVedtak.vedtak.begrunnelser?.forEach((b) => (b.begrunnelse = ''))
innvilgelseMedTomBegrunnelseVedtak.id = 'bcd7b2ec-fcc1-4a8b-816c-42256138d088'
