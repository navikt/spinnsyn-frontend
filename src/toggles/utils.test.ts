import { describe, expect, it } from 'vitest'

import { disabledToggles, localDevelopmentToggles } from './utils'

describe('Flexjar-toggle i mock og Playwright', () => {
    it('er default aktivert', () => {
        expect(localDevelopmentToggles(undefined)).toContainEqual(
            expect.objectContaining({ name: 'flexjar-spinsyn-frontend-enabled', enabled: true }),
        )
    })

    it('kan deaktiveres via URL', () => {
        expect(localDevelopmentToggles('/?flexjar-spinsyn-frontend-enabled=false')).toContainEqual(
            expect.objectContaining({ name: 'flexjar-spinsyn-frontend-enabled', enabled: false }),
        )
    })

    it('er deaktivert', () => {
        expect(disabledToggles()).toContainEqual(
            expect.objectContaining({ name: 'flexjar-spinsyn-frontend-enabled', enabled: false }),
        )
    })
})
