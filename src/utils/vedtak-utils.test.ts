import dayjs from 'dayjs'

import { inntektsmelding } from '../data/mock/data/inntektsmeldinger'
import { arbeidstaker100 } from '../data/mock/data/soknader'
import { ulestRefusjonTilArbeidsgiver } from '../data/mock/data/vedtak'
import { jsonDeepCopy } from './json-deep-copy'
import {
    estimertSluttdato,
    refusjonTilArbeidsgiverBeløp,
    refusjonTilArbeidsgiverTotalBeløp,
    refusjonTilArbeidsgiverUtbetalingsdager
} from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    const testVedtak = ulestRefusjonTilArbeidsgiver

    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1)    // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5)    // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6)    // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0)    // søndag
    })

    it('Neste uke på en fredag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 5 + 4   // Slutt neste fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('12. Jun 2020')
    })

    it('Neste mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 5       // Neste mandag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Fredag til mandag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.gjenståendeSykedager = 1       // Neste mandag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Går over til neste måned', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 24      // Neste måneds fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('3. Jul 2020')
    })

    it('Ingen sykedager igjen på mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('1. Jun 2020')
    })

    it('Ingen sykedager igjen på fredag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('5. Jun 2020')
    })

    it('Siste dag var fredag, men tom er lørdag', () => {
        const lørdagsVedtak = jsonDeepCopy(testVedtak)
        lørdagsVedtak.vedtak.tom = '2020-06-06'             // Lørdag
        lørdagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(lørdagsVedtak)).toEqual('6. Jun 2020')
    })

})


describe('Tester henting av refusjon til arbeidsgiver beløp', () => {
    it('Høyeste beløpet innenfor vedtak perioden', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        vedtak.vedtak.fom = '2020-10-01'
        vedtak.vedtak.tom = '2020-10-15'
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 15000,
                'utbetalingslinjer': [ {
                    'fom': '2020-10-01',
                    'tom': '2020-10-05',
                    'grad': 100,
                    'beløp': 2000,
                    'dagsats': 2000,
                    'sykedager': 3
                }, {
                    'fom': '2020-10-09',
                    'tom': '2020-10-15',
                    'grad': 100,
                    'beløp': 3000,
                    'dagsats': 3000,
                    'sykedager': 5
                }, {
                    'fom': '2020-10-16',
                    'tom': '2020-10-20',
                    'grad': 100,
                    'beløp': 4000,
                    'dagsats': 4000,
                    'sykedager': 3
                } ]
            }
        ]
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(3000)
    })
})

describe('Tester refusjon til arbeidsgiver', () => {
    it('Utbetalingslinje periode lengre enn vedtak periode', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1050)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(5)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(5250)
    })

    it('2 utbetalinger med forskjellig grad', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        vedtak.vedtak.fom = '2020-09-30'
        vedtak.vedtak.tom = '2020-10-13'
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 68620,
                'utbetalingslinjer': [ {
                    'fom': '2020-08-26',
                    'tom': '2020-09-29',
                    'grad': 100.0,
                    'dagsats': 2092,
                    'beløp': 2092,
                    'sykedager': 25
                }, {
                    'fom': '2020-09-30',
                    'tom': '2020-10-13',
                    'grad': 78.0,
                    'dagsats': 2092,
                    'beløp': 1632,
                    'sykedager': 10
                } ]
            }, {
                'mottaker': inntektsmelding.fnr,
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1632)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(10)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(16320)
    })

    it('Flere utbetalinger der vedtaksperioden er del av siste utbetaling', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        vedtak.vedtak.fom = '2020-10-13'
        vedtak.vedtak.tom = '2020-10-20'
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 134598,
                'utbetalingslinjer': [ {
                    'fom': '2020-07-01',
                    'tom': '2020-07-20',
                    'grad': 53.0,
                    'dagsats': 2304,
                    'beløp': 1221,
                    'sykedager': 14
                }, {
                    'fom': '2020-08-11',
                    'tom': '2020-10-20',
                    'grad': 100.0,
                    'dagsats': 2304,
                    'beløp': 2304,
                    'sykedager': 51
                } ]
            }, {
                'mottaker': inntektsmelding.fnr,
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(2304)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(6)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(13824)
    })

    it('Lengre periode der vedtaksperioden er i månedskifte', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        vedtak.vedtak.fom = '2020-09-23'
        vedtak.vedtak.tom = '2020-10-16'
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 47635,
                'utbetalingslinjer': [ {
                    'fom': '2020-08-29',
                    'tom': '2020-10-16',
                    'grad': 80.0,
                    'dagsats': 1701,
                    'beløp': 1361,
                    'sykedager': 35
                } ]
            }, {
                'mottaker': inntektsmelding.fnr,
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1361)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(18)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(24498)
    })

    it('Kort vedtak', () => {
        const vedtak = jsonDeepCopy(ulestRefusjonTilArbeidsgiver)
        vedtak.vedtak.fom = '2020-10-19'
        vedtak.vedtak.tom = '2020-10-19'
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 7902,
                'utbetalingslinjer': [ {
                    'fom': '2020-10-12',
                    'tom': '2020-10-19',
                    'grad': 100.0,
                    'dagsats': 1314,
                    'beløp': 1317,
                    'sykedager': 6
                } ]
            }, {
                'mottaker': inntektsmelding.fnr,
                'fagområde': 'SP',
                'totalbeløp': 0,
                'utbetalingslinjer': []
            }
        ]
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1317)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(1)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(1317)
    })
})
