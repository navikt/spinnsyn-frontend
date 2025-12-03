import { describe, it, expect } from 'vitest'
import dayjs from 'dayjs'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'

import { harVedtakEndringer } from './vedtak-utils'
import { jsonDeepCopy } from './json-deep-copy'
import { hentBegrunnelse } from './vedtak-utils'

describe('Tester estimering av sluttdato', () => {
    it('Numrene på ukedager er de samme', () => {
        expect(dayjs('2020-06-08').day()).toEqual(1) // mandag
        expect(dayjs('2020-06-12').day()).toEqual(5) // fredag
        expect(dayjs('2020-06-13').day()).toEqual(6) // lørdag
        expect(dayjs('2020-06-14').day()).toEqual(0) // søndag
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
