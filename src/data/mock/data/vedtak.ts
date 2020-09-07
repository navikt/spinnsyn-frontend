import { Vedtak } from '../../../types/vedtak'
import { inntektsmelding } from './inntektsmeldinger'
import { arbeidstaker, arbeidstakerNr2 } from './soknader-opplaering'
import { arbeidstaker100, arbeidstaker100nr2 } from './sykmeldinger'

const lestMedEnSykmeldingOgSoknad: Vedtak = {
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
const lestMedToSykmeldingerOgSoknader: Vedtak = {
    'id': '85f1273f-497e-4f25-97ba-a913614d1d9a',
    'lest': true,
    'opprettet': '2020-07-15',
    'vedtak': {
        'fom': '2020-07-03',
        'tom': '2020-07-15',
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
                'dokumentId': arbeidstaker100nr2.id,
                'type': 'Sykmelding'
            },
            {
                'dokumentId': arbeidstakerNr2.id,
                'type': 'Søknad'
            }
        ], 'utbetalinger': [ {
            'mottaker': 'Bruker',
            'fagområde': 'Sykepenger',
            'totalbeløp': 3854,
            'utbetalingslinjer': [ {
                'fom': '2020-04-25',
                'tom': '2020-06-30',
                'grad': 0.3641242662845945,
                'beløp': 3854,
                'dagsats': 788,
                'sykedager': 13266
            } ]
        } ],
        'forbrukteSykedager': 4,
        'gjenståendeSykedager': 12
    }
}

export const ulestMedEnSykmeldingOgSoknad: Vedtak = {
    'id': '85f1273f-497e-4f25-97ba-abc123',
    'lest': false,
    'opprettet': '2020-04-24',
    'vedtak': {
        'fom': '2020-04-01',
        'tom': '2020-04-24',
        'forbrukteSykedager': 18,
        'gjenståendeSykedager': 177,
        'dokumenter': [
            {
                'dokumentId': arbeidstaker100.id,
                'type': 'Sykmelding'
            },
            {
                'dokumentId': arbeidstaker.id,
                'type': 'Søknad'
            }
        ],
        'utbetalinger': [ {
            'mottaker': arbeidstaker.arbeidsgiver!.orgnummer,
            'fagområde': 'SPREF',
            'totalbeløp': 15500,
            'utbetalingslinjer': [ {
                'fom': '2020-04-01',
                'tom': '2020-04-19',
                'dagsats': 1000,
                'beløp': 1000,
                'grad': 100.0,
                'sykedager': 13
            }, {
                'fom': '2020-04-20',
                'tom': '2020-04-24',
                'dagsats': 1000,
                'beløp': 500,
                'grad': 50.0,
                'sykedager': 5
            } ]
        }, {
            'mottaker': 'fnr',
            'fagområde': 'SP',
            'totalbeløp': 0,
            'utbetalingslinjer': []
        } ]
    }
}
export const vedtakTestdata: Vedtak[] = [ lestMedEnSykmeldingOgSoknad, lestMedToSykmeldingerOgSoknader, ulestMedEnSykmeldingOgSoknad ]
