import dayjs from 'dayjs'

import { nyeVedtak } from '../data/mock/data/rs-vedtak'
import { arbeidstaker100 } from '../data/mock/data/soknader'
import { jsonDeepCopy } from './json-deep-copy'
import { estimertSluttdato, refusjonTilArbeidsgiverBeløp, refusjonTilArbeidsgiverTotalBeløp, refusjonTilArbeidsgiverUtbetalingsdager } from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    const testVedtak = nyeVedtak[0]

    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1)    // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5)    // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6)    // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0)    // søndag
    })

    it('Neste uke på en fredag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 5 + 4   // Slutt neste fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('12. Jun 2020')
    })

    it('Neste mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 5       // Neste mandag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Fredag til mandag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 1       // Neste mandag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('8. Jun 2020')
    })

    it('Går over til neste måned', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 24      // Neste måneds fredag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('3. Jul 2020')
    })

    it('Ingen sykedager igjen på mandag', () => {
        const mandagsVedtak = jsonDeepCopy(testVedtak)
        mandagsVedtak.vedtak.tom = '2020-06-01'             // Mandag
        mandagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(mandagsVedtak)).toEqual('1. Jun 2020')
    })

    it('Ingen sykedager igjen på fredag', () => {
        const fredagsVedtak = jsonDeepCopy(testVedtak)
        fredagsVedtak.vedtak.tom = '2020-06-05'             // Fredag
        fredagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(fredagsVedtak)).toEqual('5. Jun 2020')
    })

    it('Siste dag var fredag, men tom er lørdag', () => {
        const lørdagsVedtak = jsonDeepCopy(testVedtak)
        lørdagsVedtak.vedtak.tom = '2020-06-06'             // Lørdag
        lørdagsVedtak.vedtak.utbetaling.gjenståendeSykedager = 0       // Samme dag
        expect(estimertSluttdato(lørdagsVedtak)).toEqual('6. Jun 2020')
    })

})


describe('Tester henting av refusjon til arbeidsgiver beløp', () => {
    it('Høyeste beløpet innenfor vedtak perioden', () => {
        const vedtakWrapper = jsonDeepCopy(nyeVedtak[0])
        vedtakWrapper.vedtak.fom = '2020-10-01'
        vedtakWrapper.vedtak.tom = '2020-10-15'
        vedtakWrapper.vedtak.utbetaling = {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver!.orgnummer!,
            forbrukteSykedager: 6,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 15000,
                utbetalingslinjer: [
                    {
                        fom: '2020-08-26',
                        tom: '2020-09-29',
                        dagsats: 2000,
                        totalbeløp: 6000,
                        grad: 100
                    },
                    {
                        fom: '2020-09-30',
                        tom: '2020-10-13',
                        dagsats: 3000,
                        totalbeløp: 15000,
                        grad: 100
                    },
                    {
                        fom: '2020-09-30',
                        tom: '2020-10-13',
                        dagsats: 2000,
                        totalbeløp: 12000,
                        grad: 100
                    }
                ]
            },
            utbetalingsdager: []
        }

        expect(refusjonTilArbeidsgiverBeløp(vedtakWrapper)).toEqual(3000)
    })
})

describe('Tester refusjon til arbeidsgiver', () => {
    it('Utbetalingslinje periode lengre enn vedtak periode', () => {
        const vedtak = jsonDeepCopy(nyeVedtak[0])
        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1404)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(15)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(21060)
    })

    it('2 utbetalinger med forskjellig grad', () => {
        const vedtakWrapper = jsonDeepCopy(nyeVedtak[0])
        vedtakWrapper.vedtak.fom = '2020-09-30'
        vedtakWrapper.vedtak.tom = '2020-10-13'
        vedtakWrapper.vedtak.utbetaling = {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver!.orgnummer!,
            forbrukteSykedager: 6,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 68620,
                utbetalingslinjer: [
                    {
                        fom: '2020-08-26',
                        tom: '2020-09-29',
                        dagsats: 2092,
                        totalbeløp: 52300,
                        grad: 100
                    },
                    {
                        fom: '2020-09-30',
                        tom: '2020-10-13',
                        dagsats: 1632,
                        totalbeløp: 16320,
                        grad: 78
                    }
                ]
            },
            utbetalingsdager: []
        }

        expect(refusjonTilArbeidsgiverBeløp(vedtakWrapper)).toEqual(1632)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtakWrapper)).toEqual(10)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtakWrapper)).toEqual(16320)
    })

    it('Flere utbetalinger der vedtaksperioden er del av siste utbetaling', () => {
        const vedtak = jsonDeepCopy(nyeVedtak[0])
        vedtak.vedtak.fom = '2020-10-13'
        vedtak.vedtak.tom = '2020-10-20'
        vedtak.vedtak.utbetaling = {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver!.orgnummer!,
            forbrukteSykedager: 6,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 134598,
                utbetalingslinjer: [
                    {
                        fom: '2020-07-01',
                        tom: '2020-07-20',
                        dagsats: 1221,
                        totalbeløp: 17094,
                        grad: 53
                    },
                    {
                        fom: '2020-08-11',
                        tom: '2020-10-20',
                        dagsats: 2304,
                        totalbeløp: 117504,
                        grad: 100
                    }
                ]
            },
            utbetalingsdager: []
        }

        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(2304)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(6)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(13824)
    })

    it('Lengre periode der vedtaksperioden er i månedskifte', () => {
        const vedtakWrapper = jsonDeepCopy(nyeVedtak[0])
        vedtakWrapper.vedtak.fom = '2020-09-23'
        vedtakWrapper.vedtak.tom = '2020-10-16'
        vedtakWrapper.vedtak.utbetaling = {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver!.orgnummer!,
            forbrukteSykedager: 6,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 47635,
                utbetalingslinjer: [
                    {
                        fom: '2020-08-29',
                        tom: '2020-10-16',
                        dagsats: 1361,
                        totalbeløp: 47635,
                        grad: 80
                    }
                ]
            },
            utbetalingsdager: []
        }
        expect(refusjonTilArbeidsgiverBeløp(vedtakWrapper)).toEqual(1361)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtakWrapper)).toEqual(18)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtakWrapper)).toEqual(24498)
    })

    it('Kort vedtak', () => {
        const vedtak = jsonDeepCopy(nyeVedtak[0])
        vedtak.vedtak.fom = '2020-10-19'
        vedtak.vedtak.tom = '2020-10-19'
        vedtak.vedtak.utbetaling = {
            organisasjonsnummer: arbeidstaker100.arbeidsgiver!.orgnummer!,
            forbrukteSykedager: 6,
            gjenståendeSykedager: 180,
            automatiskBehandling: true,
            arbeidsgiverOppdrag: {
                mottaker: 'org-nr',
                nettoBeløp: 21060,
                utbetalingslinjer: [
                    {
                        fom: '2020-10-12',
                        tom: '2020-10-19',
                        dagsats: 1317,
                        totalbeløp: 7902,
                        grad: 100
                    }
                ]
            },
            utbetalingsdager: []
        }

        expect(refusjonTilArbeidsgiverBeløp(vedtak)).toEqual(1317)
        expect(refusjonTilArbeidsgiverUtbetalingsdager(vedtak)).toEqual(1)
        expect(refusjonTilArbeidsgiverTotalBeløp(vedtak)).toEqual(1317)
    })
})
