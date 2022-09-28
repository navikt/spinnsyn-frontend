import { expect } from '@jest/globals'
import dayjs from 'dayjs'

import { ulestVedtakUtenUtbetalingsdager } from '../data/testdata/data/rs-vedtak'
import { jsonDeepCopy } from './json-deep-copy'
import { fallbackEstimertSluttdato } from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    const testVedtak = ulestVedtakUtenUtbetalingsdager

    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1) // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5) // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6) // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0) // søndag
    })

    it('Neste uke på en fredag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01' // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 5 + 4 // Slutt neste fredag
        expect(fallbackEstimertSluttdato(mandagsVedtak).format('D. MMM YYYY')).toEqual('12. Jun 2020')
    })

    it('Neste mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01' // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 5 // Neste mandag
        expect(fallbackEstimertSluttdato(mandagsVedtak).format('D. MMM YYYY')).toEqual('8. Jun 2020')
    })

    it('Fredag til mandag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05' // Fredag
        fredagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 1 // Neste mandag
        expect(fallbackEstimertSluttdato(fredagsVedtak).format('D. MMM YYYY')).toEqual('8. Jun 2020')
    })

    it('Går over til neste måned', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01' // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 24 // Neste måneds fredag
        expect(fallbackEstimertSluttdato(mandagsVedtak).format('D. MMM YYYY')).toEqual('3. Jul 2020')
    })

    it('Ingen sykedager igjen på mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01' // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0 // Samme dag
        expect(fallbackEstimertSluttdato(mandagsVedtak).format('D. MMM YYYY')).toEqual('1. Jun 2020')
    })

    it('Ingen sykedager igjen på fredag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05' // Fredag
        fredagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0 // Samme dag
        expect(fallbackEstimertSluttdato(fredagsVedtak).format('D. MMM YYYY')).toEqual('5. Jun 2020')
    })

    it('Siste dag var fredag, men tom er lørdag', () => {
        const lørdagsVedtak = jsonDeepCopy(testVedtak)
        lørdagsVedtak.vedtak.tom = '2020-06-06' // Lørdag
        lørdagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0 // Samme dag
        expect(fallbackEstimertSluttdato(lørdagsVedtak).format('D. MMM YYYY')).toEqual('6. Jun 2020')
    })
    it('Tester om vi regner likt som bømlo', () => {
        const lørdagsVedtak = jsonDeepCopy(testVedtak)
        lørdagsVedtak.vedtak.tom = '2021-11-10'
        lørdagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 187
        expect(fallbackEstimertSluttdato(lørdagsVedtak).format('D. MMM YYYY')).toEqual('29. Jul 2022')
    })
})
