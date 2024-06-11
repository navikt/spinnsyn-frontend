import { expect } from '@jest/globals'
import dayjs from 'dayjs'

import { delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo } from '../data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'

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
