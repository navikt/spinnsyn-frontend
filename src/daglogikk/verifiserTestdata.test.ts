import { kunDirekte } from '../data/testdata/data/vedtak/rs-vedtak'

import { verifiserDaglogikk } from './verifiserDaglogikk'

describe('Verifisering av testdata', () => {
    test('Kun direkte vedtak', () => {
        const prossesertVedtak = verifiserDaglogikk(kunDirekte)
        expect(prossesertVedtak.opprinneligBeregning).toEqual(prossesertVedtak.nyBeregning)
    })
})
