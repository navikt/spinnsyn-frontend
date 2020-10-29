import { Vedtak } from '../../../types/vedtak'
import { arbeidstaker100 } from './soknader'

export const ulestRefusjonTilArbeidsgiver: Vedtak = {
    'id': 'c7763203-e20a-34b2-b035-2752d6a1e7c6',
    'lest': false,
    'opprettet': '2020-10-16',
    'vedtak': {
        'automatiskBehandling': true,
        'fom': '2020-10-09',
        'tom': '2020-10-15',
        'forbrukteSykedager': 19,
        'månedsinntekt': 22750,
        'gjenståendeSykedager': 229,
        'dokumenter': [
            {
                'type': 'Søknad',
                'dokumentId': arbeidstaker100.id
            }
        ],
        'utbetalinger': [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 19950,
                'utbetalingslinjer': [
                    {
                        'fom': '2020-09-21',
                        'tom': '2020-10-15',
                        'grad': 100.0,
                        'beløp': 1050,
                        'dagsats': 1050,
                        'sykedager': 19
                    }
                ]
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
        'id': 'b7763203-e20a-34b2-b035-2752d6a1e7c7',
        'lest': true
    }
}

export const lestRefusjonTilArbeidsgiverUtenInntektsmelding: Vedtak = {
    'id': 'a7763203-e20a-34b2-b035-2752d6a1e7c8',
    'lest': true,
    'opprettet': '2020-09-28',
    'vedtak': {
        'automatiskBehandling': false,
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
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
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
