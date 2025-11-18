import { RSVedtakWrapper } from '../../../../types/rs-types/rs-vedtak-felles'

export const alleAvvisteDager: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-93gh93rugh93',
    lest: false,
    organisasjoner: {},
    lestDato: '1970-01-01T01:00:00+01:00',
    orgnavn: 'INTEGRASJON AS',
    andreArbeidsgivere: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999998',
        fom: '2021-01-25',
        tom: '2021-03-06',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'dsfgew4fq43',
                type: 'Søknad',
            },
        ],
        inntekt: 30000,
        sykepengegrunnlag: 370000,
        vedtakFattetTidspunkt: '2021-02-22',
        utbetaling: {
            organisasjonsnummer: '999999998',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-asfafwq',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                utbetalingslinjer: [
                    {
                        fom: '2021-01-30',
                        tom: '2021-02-07',
                        dagsats: 1000,
                        grad: 100,
                        stønadsdager: 10,
                    },
                    {
                        fom: '2021-02-08',
                        tom: '2021-02-09',
                        dagsats: 400,
                        grad: 40,
                        stønadsdager: 2,
                    },
                    {
                        fom: '2021-02-10',
                        tom: '2021-02-10',
                        dagsats: 400,
                        grad: 17,
                        stønadsdager: 1,
                    },
                ],
            },
            utbetalingsdager: [
                {
                    dato: '2021-01-25',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-26',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-27',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-28',
                    type: 'Arbeidsdag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-29',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-30',
                    type: 'Arbeidsdag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-01-31',
                    type: 'ArbeidsgiverperiodeDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-01',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-02',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-03',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-04',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-05',
                    type: 'NavDagSyk',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-06',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-07',
                    type: 'NavHelgDag',
                    begrunnelser: [],
                },
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
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-12',
                    type: 'Feriedag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-13',
                    type: 'ForeldetDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-14',
                    type: 'UkjentDag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-15',
                    type: 'AvvistDag',
                    begrunnelser: ['SykepengedagerOppbrukt'],
                },
                {
                    dato: '2021-02-16',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumInntekt'],
                },
                {
                    dato: '2021-02-17',
                    type: 'AvvistDag',
                    begrunnelser: ['EgenmeldingUtenforArbeidsgiverperiode'],
                },
                {
                    dato: '2021-02-18',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumSykdomsgrad'],
                },
                {
                    dato: '2021-02-19',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerOpptjening'],
                },
                {
                    dato: '2021-02-20',
                    type: 'AvvistDag',
                    begrunnelser: ['ManglerMedlemskap'],
                },
                {
                    dato: '2021-02-21',
                    type: 'AvvistDag',
                    begrunnelser: ['EtterDødsdato'],
                },
                {
                    dato: '2021-02-22',
                    type: 'AvvistDag',
                    begrunnelser: ['UKJENT'],
                },
                {
                    dato: '2021-02-23',
                    type: 'AvvistDag',
                    begrunnelser: ['Over70'],
                },
                {
                    dato: '2021-02-24',
                    type: 'AvvistDag',
                    begrunnelser: ['MinimumInntektOver67'],
                },
                {
                    dato: '2021-02-25',
                    type: 'AvvistDag',
                    begrunnelser: ['SykepengedagerOppbruktOver67'],
                },
                {
                    dato: '2021-02-26',
                    type: 'Permisjonsdag',
                    begrunnelser: [],
                },
                {
                    dato: '2021-02-27',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserAap'],
                },
                {
                    dato: '2021-02-28',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserDagpenger'],
                },
                {
                    dato: '2021-03-01',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserForeldrepenger'],
                },
                {
                    dato: '2021-03-02',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserOmsorgspenger'],
                },
                {
                    dato: '2021-03-03',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserOpplaringspenger'],
                },
                {
                    dato: '2021-03-04',
                    type: 'AvvistDag',
                    begrunnelser: ['AndreYtelserPleiepenger'],
                },
                {
                    dato: '2021-03-05',
                    type: 'AndreYtelser',
                    begrunnelser: ['AndreYtelserSvangerskapspenger'],
                },

                {
                    dato: '2021-03-06',
                    type: 'Ventetidsdag',
                    begrunnelser: [],
                },
            ],
        },
    },
    opprettetTimestamp: '2021-05-06T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}

export const alleAvvisteDagerFraBomlo: RSVedtakWrapper = {
    id: 'dff11217-31ea-404a-86ab-93gh93rkeh93',
    lest: false,
    organisasjoner: {},
    lestDato: '1970-01-01T01:00:00+01:00',
    orgnavn: 'INTEGRASJON AS (BØMLO)',
    andreArbeidsgivere: {},
    vedtak: {
        yrkesaktivitetstype: 'ARBEIDSTAKER',
        organisasjonsnummer: '999999998',
        fom: '2021-01-30',
        tom: '2021-02-22',
        dokumenter: [
            {
                dokumentId: 'b2d44a54-b320-4a70-a2c3-a6ce35fd2f00',
                type: 'Sykmelding',
            },
            {
                dokumentId: 'dsfgew4fq43',
                type: 'Søknad',
            },
        ],
        inntekt: 30000,
        sykepengegrunnlag: 370000,
        vedtakFattetTidspunkt: '2021-02-22',
        utbetaling: {
            organisasjonsnummer: '999999998',
            utbetalingId: '2b60ba06-7ddb-45e6-991b-asfafwq',
            forbrukteSykedager: 10,
            gjenståendeSykedager: 238,
            automatiskBehandling: true,
        },
        begrunnelser: [
            {
                type: 'DelvisInnvilgelse',
                begrunnelse: 'Avslått fordi det er for mange grunner.\n\nNy linje.',
                perioder: [{ fom: '2021-01-30', tom: '2021-02-22' }],
            },
        ],
    },
    opprettetTimestamp: '2021-05-06T12:42:42.000Z',
    annullert: false,
    revurdert: false,
}
