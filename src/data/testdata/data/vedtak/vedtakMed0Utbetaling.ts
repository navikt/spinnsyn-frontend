import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const vedtakMed0Utbetaling: RSVedtakWrapper = {
    id: 'b40ac0ce-8ff3-4218-b981-825f2e139ab1',
    lest: true,
    lestDato: '2023-11-19T20:32:04.858958+01:00',
    organisasjoner: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999999',
        fom: '2023-11-11',
        tom: '2023-11-12',
        dokumenter: [
            {
                dokumentId: 'b40ac0ce-8ff3-4218-b981-825f2e139ab1',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'b40ac0ce-8ff3-4218-b981-825f2e139ab1',
                type: 'Søknad',
            },
        ],
        inntekt: 38815,
        sykepengegrunnlag: 465780,
        utbetaling: {
            organisasjonsnummer: '999999999',
            utbetalingId: 'b89cfec9-9fa8-46e9-8a31-06d434698bf8',
            forbrukteSykedager: 53,
            gjenståendeSykedager: 195,
            automatiskBehandling: true,
            foreløpigBeregnetSluttPåSykepenger: '2024-08-09',
            utbetalingType: 'UTBETALING',
        },
        grunnlagForSykepengegrunnlag: 465780,
        grunnlagForSykepengegrunnlagPerArbeidsgiver: {
            '999999999': 465780,
        },
        begrensning: 'ER_IKKE_6G_BEGRENSET',
        vedtakFattetTidspunkt: '2023-11-19',
        sykepengegrunnlagsfakta: {
            fastsatt: 'EtterHovedregel',
            omregnetÅrsinntekt: 465780,
            innrapportertÅrsinntekt: 415559.32,
            avviksprosent: 12.09,
            '6G': 711720,
            tags: [],
            arbeidsgivere: [
                {
                    arbeidsgiver: '999999999',
                    omregnetÅrsinntekt: 465780,
                },
            ],
        },
        begrunnelser: [],
        tags: [],
    },
    opprettetTimestamp: '2023-11-19T19:30:23.752180Z',
    orgnavn: 'Coop Extra Brumunddal',
    annullert: false,
    revurdert: false,
    andreArbeidsgivere: {},
}
