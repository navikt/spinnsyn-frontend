import { Vedtak } from '../../../types/vedtak'
import { inntektsmelding } from './inntektsmeldinger'
import { arbeidstaker100 } from './soknader'

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

export const lestRefusjonTilArbeidsgiver = {
    ...ulestRefusjonTilArbeidsgiver, ...{
        'id': 'c7763203-e20a-34b2-b035-2752d6a1e7c6',
        'lest': true
    }
}

export const vedtakTestdata: Vedtak[] = [ ulestRefusjonTilArbeidsgiver, lestRefusjonTilArbeidsgiver ]
