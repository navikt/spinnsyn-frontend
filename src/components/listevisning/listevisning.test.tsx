import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('next/router', () => ({
    useRouter: () => ({
        asPath: '/syk/sykepenger?testperson=arbeidstaker',
        query: { testperson: 'arbeidstaker' },
    }),
}))

vi.mock('../../hooks/useBreadcrumbs', () => ({
    useUpdateBreadcrumbs: vi.fn(),
}))

vi.mock('../person/Person', () => ({
    default: () => null,
}))

vi.mock('./lenkepanel-gruppering', () => ({
    default: () => null,
}))

vi.mock('./listevisning-demoinfo', () => ({
    default: ({ testperson }: { testperson: string | undefined }) => <div>Demoinfo: {testperson}</div>,
}))

const miljø = vi.hoisted(() => ({
    mockBackend: true,
    opplaering: false,
    frontendInterne: false,
}))

vi.mock('../../utils/environment', () => ({
    arkiverteVedtakUrl: () => '#',
    isMockBackend: () => miljø.mockBackend,
    isOpplaering: () => miljø.opplaering,
    spinnsynFrontendInterne: () => miljø.frontendInterne,
}))

import Listevisning from './listevisning'

describe('Listevisning', () => {
    beforeEach(() => {
        miljø.mockBackend = true
        miljø.opplaering = true
        miljø.frontendInterne = false
    })

    it('viser demoinfo om valgt testperson', () => {
        render(<Listevisning />)

        expect(screen.getByText('Demoinfo: arbeidstaker')).toBeInTheDocument()
    })

    it('viser ikke demoinfo om valgt testperson når ikke demo miljø', () => {
        miljø.mockBackend = false
        miljø.opplaering = false
        render(<Listevisning />)

        expect(screen.queryByText('Demoinfo: arbeidstaker')).not.toBeInTheDocument()
    })
})
