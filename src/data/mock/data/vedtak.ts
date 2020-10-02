import { Vedtak } from '../../../types/vedtak'
import { inntektsmelding } from './inntektsmeldinger'
import { arbeidstaker } from './soknader-opplaering'
import { arbeidstaker100 } from './sykmeldinger'

export const lestMedEnSykmeldingOgSoknad: Vedtak = {
    'id': '57896853-d5c3-4599-a77f-aff1f2cbc411',
    'lest': true,
    'opprettet': '2020-06-19',
    'vedtak': {
        'fom': '2020-04-03',
        'tom': '2020-06-19',
        'dokumenter': [
            {
                'dokumentId': arbeidstaker100.id,
                'type': 'Sykmelding'
            },
            {
                'dokumentId': arbeidstaker.id,
                'type': 'Søknad'
            },
            {
                'dokumentId': inntektsmelding.id,
                'type': 'Inntektsmelding'
            }
        ], 'utbetalinger': [ {
            'mottaker': 'Bruker',
            'fagområde': 'Sykepenger',
            'totalbeløp': 13317,
            'utbetalingslinjer': [ {
                'fom': '2020-03-05',
                'tom': '2020-04-04',
                'grad': 0.17292301879845517,
                'beløp': 13317,
                'dagsats': 774,
                'sykedager': 9817
            } ]
        } ],
        'forbrukteSykedager': 4,
        'gjenståendeSykedager': 12
    }
}

export const ulestRefusjonTilArbeidsgiver: Vedtak = {
    'id': 'c7763203-e20a-34b2-b035-2752d6a1e7c6',
    'lest': false,
    'opprettet': '2020-09-28',
    'vedtak': {
        'fom': '2020-09-12',
        'tom': '2020-09-27',
        'forbrukteSykedager': 10,
        'gjenståendeSykedager': 185,
        'dokumenter': [
            {
                'type': 'Søknad',
                'dokumentId': arbeidstaker100.id
            }, {
                'type': 'Inntektsmelding',
                'dokumentId': inntektsmelding.id
            }
        ],
        'utbetalinger': [
            {
                'mottaker': '995816598',
                'fagområde': 'SPREF',
                'totalbeløp': 15000,
                'utbetalingslinjer': [ {
                    'fom': '2020-09-12',
                    'tom': '2020-09-27',
                    'grad': 100,
                    'beløp': 1500,
                    'dagsats': 1500,
                    'sykedager': 10
                } ]
            }, {
                'mottaker': '01010112345',
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
    }
}

export const lestRefusjonTilArbeidsgiver: Vedtak = {
    ...ulestRefusjonTilArbeidsgiver, ...{
        'id': 'c7763203-e20a-34b2-b035-2752d6a1e7c7',
        'lest': true
    }
}

export const lestRefusjonTilArbeidsgiverUtenInntektsmelding: Vedtak = {
    'id': 'c7763203-e20a-34b2-b035-2752d6a1e7c8',
    'lest': true,
    'opprettet': '2020-09-28',
    'vedtak': {
        'fom': '2020-09-12',
        'tom': '2020-09-27',
        'forbrukteSykedager': 10,
        'gjenståendeSykedager': 185,
        'dokumenter': [
            {
                'type': 'Søknad',
                'dokumentId': arbeidstaker100.id
            }, {
                'type': 'Inntektsmelding',
                'dokumentId': 'en-id-som-ikke-finnes'
            }
        ],
        'utbetalinger': [
            {
                'mottaker': '995816598',
                'fagområde': 'SPREF',
                'totalbeløp': 15000,
                'utbetalingslinjer': [ {
                    'fom': '2020-09-12',
                    'tom': '2020-09-27',
                    'grad': 100,
                    'beløp': 1500,
                    'dagsats': 1500,
                    'sykedager': 10
                } ]
            }, {
                'mottaker': '01010112345',
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
    }
}

export const vedtakTestdata: Vedtak[] = [ ulestRefusjonTilArbeidsgiver, lestRefusjonTilArbeidsgiver, lestRefusjonTilArbeidsgiverUtenInntektsmelding ]
