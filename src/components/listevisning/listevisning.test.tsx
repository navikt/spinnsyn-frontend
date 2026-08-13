import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/router', () => ({
    useRouter: () => ({
        asPath: '/syk/sykepenger?testperson=arbeidstaker',
        query: { testperson: 'arbeidstaker' },
    }),
}))

vi.mock('../../hooks/useBreadcrumbs', () => ({
    useUpdateBreadcrumbs: vi.fn(),
}))

vi.mock('../../utils/environment', () => ({
    arkiverteVedtakUrl: () => '#',
    isMockBackend: () => true,
    isOpplaering: () => false,
    spinnsynFrontendInterne: () => true,
}))

vi.mock('../person/Person', () => ({
    default: () => null,
}))

vi.mock('./lenkepanel-gruppering', () => ({
    default: () => null,
}))

import Listevisning from './listevisning'

describe('Listevisning', () => {
    it('viser demoinfo om valgt testperson', () => {
        render(<Listevisning />)

        expect(screen.getByText('Demoinfo: Arbeidstaker – alle scenarioer')).toBeInTheDocument()
    })
})
