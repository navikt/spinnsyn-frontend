import { expect } from '@jest/globals'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'

import { VedtakObjekt } from './vedtakObjekt'

describe('VedtakObject test', () => {
    const vedtak = new VedtakObjekt(delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo)

    test('Vedtak er delvis innvilget', () => {
        expect(vedtak.erAvslag()).toBe(false)
        expect(vedtak.erDelvisInnvilgelse()).toBe(true)
    })

    test('Vedtak har oppsumert avslag begrunnelser', () => {
        expect(vedtak.oppsumertAvslagBegrunnelser('refusjon')).toEqual(new Set(['Sykmeldt i for liten grad']))
        expect(vedtak.oppsumertAvslagBegrunnelser('personutbetaling')).toEqual(new Set([]))
    })
})
