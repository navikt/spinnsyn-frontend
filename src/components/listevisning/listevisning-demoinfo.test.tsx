import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ListevisningDemoinfo from './listevisning-demoinfo'

describe('Listevisning demoinfo', () => {
    it('viser demoinfo om valgt testperson', () => {
        render(<ListevisningDemoinfo testperson="arbeidstaker" />)

        expect(screen.getByText('Demoinfo: Arbeidstaker – alle scenarioer')).toBeInTheDocument()
    })

    it('viser demoinfo for standard testperson når testperson mangler', () => {
        render(<ListevisningDemoinfo testperson={undefined} />)

        expect(screen.getByText('Demoinfo: Arbeidstaker – alle scenarioer')).toBeInTheDocument()
    })
})
