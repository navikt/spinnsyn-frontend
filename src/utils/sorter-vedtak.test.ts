import { expect } from '@jest/globals'

import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { jsonDeepCopy } from './json-deep-copy'
import { sorterEtterNyesteTom } from './sorter-vedtak'

it('Sorterer gjeldende vedtak før revurderte i lista', () => {
    const gjeldende: RSVedtakWrapper = {
        id: '1',
        vedtak: { tom: '2020-06-13' },
        revurdert: false,
    } as any
    const revurdert = jsonDeepCopy(gjeldende)
    revurdert.revurdert = true

    const sorterteVedtak = [gjeldende, revurdert].sort(sorterEtterNyesteTom)

    expect(sorterteVedtak[0]).toEqual(gjeldende)
    expect(sorterteVedtak[1]).toEqual(revurdert)

    const sorterteVedtakMotsattStart = [revurdert, gjeldende].sort(sorterEtterNyesteTom)

    expect(sorterteVedtakMotsattStart[0]).toEqual(gjeldende)
    expect(sorterteVedtakMotsattStart[1]).toEqual(revurdert)
})

it('Sorterer gjeldende vedtak før annullerte i lista', () => {
    const gjeldende: RSVedtakWrapper = {
        id: '1',
        vedtak: { tom: '2020-06-13' },
        annullert: false,
    } as any
    const annullert = jsonDeepCopy(gjeldende)
    annullert.annullert = true

    const sorterteVedtak = [gjeldende, annullert].sort(sorterEtterNyesteTom)

    expect(sorterteVedtak[0]).toEqual(gjeldende)
    expect(sorterteVedtak[1]).toEqual(annullert)

    const sorterteVedtakMotsattStart = [annullert, gjeldende].sort(sorterEtterNyesteTom)

    expect(sorterteVedtakMotsattStart[0]).toEqual(gjeldende)
    expect(sorterteVedtakMotsattStart[1]).toEqual(annullert)
})
