import { it, expect } from 'vitest'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak-felles'

import { jsonDeepCopy } from './json-deep-copy'
import { sorterEtterNyesteFom } from './sorter-vedtak'

it('Sorterer vedtak med tidligere fom før vedtak med senere fom i lista', () => {
    const eldre: RSVedtakWrapper = {
        id: '1',
        vedtak: { fom: '2020-06-13' },
        revurdert: false,
    } as any

    const nyere = jsonDeepCopy(eldre)
    nyere.vedtak.fom = '2020-06-14'

    const nyeste = jsonDeepCopy(eldre)
    nyeste.vedtak.fom = '2020-06-15'

    const sorterteVedtak = [eldre, nyeste, nyere].sort(sorterEtterNyesteFom)

    expect(sorterteVedtak[0]).toEqual(nyeste)
    expect(sorterteVedtak[1]).toEqual(nyere)
    expect(sorterteVedtak[2]).toEqual(eldre)
})
it('Sorterer gjeldende vedtak før revurderte i lista', () => {
    const gjeldende: RSVedtakWrapper = {
        id: '1',
        vedtak: { fom: '2020-06-13' },
        revurdert: false,
    } as any
    const revurdert = jsonDeepCopy(gjeldende)
    revurdert.revurdert = true

    const sorterteVedtak = [gjeldende, revurdert].sort(sorterEtterNyesteFom)

    expect(sorterteVedtak[0]).toEqual(gjeldende)
    expect(sorterteVedtak[1]).toEqual(revurdert)

    const sorterteVedtakMotsattStart = [revurdert, gjeldende].sort(sorterEtterNyesteFom)

    expect(sorterteVedtakMotsattStart[0]).toEqual(gjeldende)
    expect(sorterteVedtakMotsattStart[1]).toEqual(revurdert)
})

it('Sorterer gjeldende vedtak før annullerte i lista', () => {
    const gjeldende: RSVedtakWrapper = {
        id: '1',
        vedtak: { fom: '2020-06-13' },
        annullert: false,
    } as any
    const annullert = jsonDeepCopy(gjeldende)
    annullert.annullert = true

    const sorterteVedtak = [gjeldende, annullert].sort(sorterEtterNyesteFom)

    expect(sorterteVedtak[0]).toEqual(gjeldende)
    expect(sorterteVedtak[1]).toEqual(annullert)

    const sorterteVedtakMotsattStart = [annullert, gjeldende].sort(sorterEtterNyesteFom)

    expect(sorterteVedtakMotsattStart[0]).toEqual(gjeldende)
    expect(sorterteVedtakMotsattStart[1]).toEqual(annullert)
})
