import { describe, it, expect } from 'vitest'
import { getDay } from 'date-fns'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMedFlereArbeidsgivere } from '../data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'

import { harVedtakEndringer } from './vedtak-utils'
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
    it('Oppdager forskjellig beløp', () => {
        const original = jsonDeepCopy(vedtakMedFlereArbeidsgivere)
        const endret = jsonDeepCopy(vedtakMedFlereArbeidsgivere)
        endret.sykepengebelopSykmeldt = original.sykepengebelopSykmeldt + 100
        expect(harVedtakEndringer(endret, original)).toBe(true)
    })

    it('Ingen endring gir false', () => {
        const original = jsonDeepCopy(vedtakMedFlereArbeidsgivere)
        const kopi = jsonDeepCopy(vedtakMedFlereArbeidsgivere)
        expect(harVedtakEndringer(kopi, original)).toBe(false)
    })
})
