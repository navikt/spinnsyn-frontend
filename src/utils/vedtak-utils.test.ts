import { describe, it, expect } from 'vitest'
import { getDay } from 'date-fns'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { RSDag } from '../types/rs-types/rs-vedtak-felles'

import { harVedtakEndringer, erKunArbeidsgiverPeriode } from './vedtak-utils'
import { jsonDeepCopy } from './json-deep-copy'
import { hentBegrunnelse } from './vedtak-utils'
import { toDate } from './dato-utils'

describe('Tester estimering av sluttdato', () => {
    it('Numrene på ukedager er de samme', () => {
        expect(getDay(toDate('2020-06-08'))).toEqual(1) // mandag
        expect(getDay(toDate('2020-06-12'))).toEqual(5) // fredag
        expect(getDay(toDate('2020-06-13'))).toEqual(6) // lørdag
        expect(getDay(toDate('2020-06-14'))).toEqual(0) // søndag
    })

    it('Tester at vi finner begrunnelse i vedtak', () => {
        const delvisInnvilglseVedtak = jsonDeepCopy(delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo)
        const begrunnelse = hentBegrunnelse(delvisInnvilglseVedtak, 'DelvisInnvilgelse')
        expect(begrunnelse?.type).toEqual('DelvisInnvilgelse')
        expect(begrunnelse?.begrunnelse).toEqual('Delvis innvilgelse.\n\nNy linje.')
    })
})

describe('Tester harVedtakEndringer', () => {
    it('Returnerer false når vedtakene er identiske', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(false)
    })

    it('Returnerer true ved forskjellig beløp', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 2000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })

    it('Returnerer true ved forskjellig vedtakstype', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 1000,
            sykepengebelopArbeidsgiver: 0,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })

    it('Returnerer true ved forskjellig antall sykepengedager igjen', () => {
        const nyttVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
            vedtak: {
                ...vedtakMedFlereArbeidsgivere.vedtak,
                utbetaling: { ...vedtakMedFlereArbeidsgivere.vedtak.utbetaling, gjenståendeSykedager: 100 },
            },
        }
        const gammeltVedtak = {
            ...vedtakMedFlereArbeidsgivere,
            sykepengebelopPerson: 0,
            sykepengebelopArbeidsgiver: 1000,
            dagerArbeidsgiver: [],
            dagerPerson: [],
            vedtak: {
                ...vedtakMedFlereArbeidsgivere.vedtak,
                utbetaling: { ...vedtakMedFlereArbeidsgivere.vedtak.utbetaling, gjenståendeSykedager: 200 },
            },
        }
        expect(harVedtakEndringer(nyttVedtak, gammeltVedtak)).toBe(true)
    })
})

describe('Tester erKunArbeidsgiverPeriode', () => {
    it('Returnerer true når alle dager er ArbeidsgiverperiodeDag', () => {
        const dager: RSDag[] = [
            { dato: '2024-01-01', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-02', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
        ]
        expect(erKunArbeidsgiverPeriode(dager)).toBe(true)
    })

    it('Returnerer true når arbeidsgiverperiode slutter med en helg', () => {
        const dager: RSDag[] = [
            { dato: '2024-01-01', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-02', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-03', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        ]
        expect(erKunArbeidsgiverPeriode(dager)).toBe(true)
    })

    it('Returnerer true når arbeidsgiverperiode har helg inni', () => {
        const dager: RSDag[] = [
            { dato: '2024-01-01', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-03', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-02', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
        ]
        expect(erKunArbeidsgiverPeriode(dager)).toBe(false)
    })

    it('Returnerer false når perioden er kun helg', () => {
        const dager: RSDag[] = [
            { dato: '2024-01-01', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-02', dagtype: 'NavHelgDag', begrunnelser: [], belop: 0, grad: 0 },
        ]
        expect(erKunArbeidsgiverPeriode(dager)).toBe(false)
    })

    it('Returnerer false når minst én dag ikke er ArbeidsgiverperiodeDag', () => {
        const dager: RSDag[] = [
            { dato: '2024-01-01', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-02', dagtype: 'ArbeidsgiverperiodeDag', begrunnelser: [], belop: 0, grad: 0 },
            { dato: '2024-01-03', dagtype: 'NavDag', begrunnelser: [], belop: 500, grad: 100 },
        ]
        expect(erKunArbeidsgiverPeriode(dager)).toBe(false)
    })

    it('Returnerer true for tom liste', () => {
        expect(erKunArbeidsgiverPeriode([])).toBe(true)
    })
})
