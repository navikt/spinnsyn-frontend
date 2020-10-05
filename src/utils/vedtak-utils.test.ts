import dayjs from 'dayjs'

import { arbeidstaker100 } from '../data/mock/data/soknader'
import { ulestRefusjonTilArbeidsgiver } from '../data/mock/data/vedtak'
import { estimertSluttdato, refusjonTilArbeidsgiverDagsats } from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    const testVedtak = ulestRefusjonTilArbeidsgiver

    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1)    // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5)    // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6)    // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0)    // søndag
    })

    it('Neste uke på en fredag', () => {
        const mandagsVedtak = testVedtak
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 5 + 4   // Slutt neste fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('12. Jun 2020')
    })

    it('Neste mandag', () => {
        const mandagsVedtak = testVedtak
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 5       // Neste mandag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Fredag til mandag', () => {
        const fredagsVedtak = testVedtak
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.gjenståendeSykedager = 1       // Neste mandag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Går over til neste måned', () => {
        const mandagsVedtak = testVedtak
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 24      // Neste måneds fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('3. Jul 2020')
    })

    it('Ingen sykedager igjen på mandag', () => {
        const mandagsVedtak = testVedtak
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('1. Jun 2020')
    })

    it('Ingen sykedager igjen på fredag', () => {
        const fredagsVedtak = testVedtak
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('5. Jun 2020')
    })

    it('Siste dag var fredag, men tom er lørdag', () => {
        const lørdagsVedtak = testVedtak
        lørdagsVedtak.vedtak.tom = '2020-06-06'             // Lørdag
        lørdagsVedtak.vedtak.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(lørdagsVedtak)).toEqual('6. Jun 2020')
    })

    it('Høyeste beløpet i betalingslinjer blir returnert', () => {
        const vedtak = testVedtak
        vedtak.vedtak.utbetalinger = [
            {
                'mottaker': arbeidstaker100.arbeidsgiver!.orgnummer!,
                'fagområde': 'SPREF',
                'totalbeløp': 15000,
                'utbetalingslinjer': [ {
                    'fom': '2020-09-12',
                    'tom': '2020-09-27',
                    'grad': 100,
                    'beløp': 2000,
                    'dagsats': 2000,
                    'sykedager': 10
                }, {
                    'fom': '2020-09-12',
                    'tom': '2020-09-27',
                    'grad': 100,
                    'beløp': 3000,
                    'dagsats': 3000,
                    'sykedager': 10
                } ]
            }
        ]
        expect(refusjonTilArbeidsgiverDagsats(testVedtak)).toEqual(3000)
    })
})
