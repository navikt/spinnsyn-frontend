import { Vedtak } from '../../../types/Vedtak'

export const vedtakTestdata: Vedtak[] = [ {
    'id': '57896853-d5c3-4599-a77f-aff1f2cbc411',
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
} ]
