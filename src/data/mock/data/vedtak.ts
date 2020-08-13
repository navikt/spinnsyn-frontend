import { Vedtak } from '../../../types/vedtak'
import { arbeidstaker } from './soknader-opplaering'
import { arbeidstaker100 } from './sykmeldinger'

export const vedtakTestdata: Vedtak[] = [ {
    'id': '57896853-d5c3-4599-a77f-aff1f2cbc411',
    'lest': true,
    'vedtak': {
        'fom': '2020-04-03',
        'tom': '2020-06-19',
        'dokumenter': [],
        'utbetalinger': [ {
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
}, {
    'id': '85f1273f-497e-4f25-97ba-a913614d1d9a',
    'lest': true,
    'vedtak': {
        'fom': '2020-07-03',
        'tom': '2020-07-15',
        'dokumenter': [],
        'utbetalinger': [ {
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
}, {
    'id': '85f1273f-497e-4f25-97ba-abc123',
    'lest': false,
    'vedtak': {
        'fom': '2020-04-01',
        'tom': '2020-04-24',
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
            'mottaker': 'Bruker',
            'fagområde': 'Sykepenger',
            'totalbeløp': 1800,
            'utbetalingslinjer': [ {
                'fom': '2020-04-01',
                'tom': '2020-04-19',
                'grad': 1.00,
                'beløp': 1300,
                'dagsats': 100,
                'sykedager': 13
            }, {
                'fom': '2020-04-20',
                'tom': '2020-04-24',
                'grad': 1.00,
                'beløp': 500,
                'dagsats': 100,
                'sykedager': 5
            } ]
        } ],
        'forbrukteSykedager': 18,
        'gjenståendeSykedager': 177
    }
} ]
