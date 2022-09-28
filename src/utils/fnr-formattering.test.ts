import { expect } from '@jest/globals'

import { vedtakMed40Grad } from '../data/testdata/data/rs-vedtak'
import { fnrForVisning } from './fnr-for-visning'
import { harFlereArbeidsgivere } from './har-flere-arbeidsgivere'
import { jsonDeepCopy } from './json-deep-copy'

describe('Tester formattering av fnr', () => {
    it('Formatteres riktig', () => {
        expect(fnrForVisning('13068712345')).toEqual('130687 12345')
    })
})
