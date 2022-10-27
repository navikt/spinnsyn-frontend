import { expect } from '@jest/globals'

import { fnrForVisning } from './fnr-for-visning'

describe('Tester formattering av fnr', () => {
    it('Formatteres riktig', () => {
        expect(fnrForVisning('13068712345')).toEqual('130687 12345')
    })
})
