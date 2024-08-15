import { it, expect } from 'vitest'

import { jsonDeepCopy } from './json-deep-copy'

it('Kopierer json', () => {
    const original = { hei: '123' }
    const kopi = jsonDeepCopy(original)
    expect(original).toEqual(kopi)
})
