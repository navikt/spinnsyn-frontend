import 'dayjs/locale/nb'

import { expect } from '@jest/globals'

import { tekst } from '../../utils/tekster'

it('Returns text from bundle', () => {
    const text = tekst('spinnsyn.sidetittel.liste')
    expect(text).toEqual('Svar på søknader')
})
