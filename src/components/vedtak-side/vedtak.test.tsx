import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { kunDirekte } from '../../data/testdata/data/vedtak/kunDirekte'
import { FlagProvider } from '../../toggles/context'
import { localDevelopmentToggles } from '../../toggles/utils'

import Vedtak from './vedtak'

vi.mock('../../hooks/useBreadcrumbs', () => ({
    useUpdateBreadcrumbs: vi.fn(),
    vedtakBreadcrumb: {},
}))

vi.mock('../../hooks/useStudyStatus', () => ({
    useStudyStatus: () => ({ data: false }),
}))

vi.mock('../person/Person', () => ({
    default: () => null,
}))

vi.mock('../flexjar/flexjar-var-siden-nyttig', () => ({
    FlexjarVarSidenNyttig: () => <div>Var siden nyttig</div>,
}))

vi.mock('../flexjar/flexjar-pohelse-helsemetrikk', () => ({
    FlexjarPohelseHelsemetrikk: () => <div>PO Helse helsemetrikk</div>,
}))

describe('Flexjar-killswitch på vedtak', () => {
    beforeEach(() => {
        vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    })

    it.each([
        { variant: 'standard', frontend: true, pohelse: false, jul: false, forventet: 'Var siden nyttig' },
        { variant: 'PO Helse', frontend: false, pohelse: true, jul: false, forventet: 'PO Helse helsemetrikk' },
        { variant: 'julesøknad', frontend: false, pohelse: true, jul: true, forventet: 'Var siden nyttig' },
        { variant: 'begge toggles', frontend: true, pohelse: true, jul: false, forventet: 'Var siden nyttig' },
        { variant: 'ingen toggles', frontend: false, pohelse: false, jul: false, forventet: undefined },
    ])('$variant krever aktivert killswitch', ({ frontend, pohelse, jul, forventet }) => {
        const vedtak = jul
            ? {
                  ...kunDirekte,
                  opprettetTimestamp: '2021-12-15T12:00:00.000Z',
                  vedtak: { ...kunDirekte.vedtak, fom: '2021-12-01', tom: '2021-12-31' },
              }
            : kunDirekte
        const queryClient = new QueryClient()
        const toggles = localDevelopmentToggles(
            `/?flexjar-spinnsyn-frontend=${frontend}&flexjar-spinnsyn-pohelse-helsemetrikk=${pohelse}`,
        )
        const innhold = (aktivert: boolean | undefined) => (
            <QueryClientProvider client={queryClient}>
                <FlagProvider
                    toggles={toggles.flatMap((toggle) =>
                        toggle.name === 'flexjar-spinsyn-frontend-enabled'
                            ? aktivert === undefined
                                ? []
                                : [{ ...toggle, enabled: aktivert }]
                            : [toggle],
                    )}
                >
                    <Vedtak vedtak={vedtak} alleVedtak={[vedtak]} />
                </FlagProvider>
            </QueryClientProvider>
        )
        const { rerender } = render(innhold(true))

        for (const variant of ['Var siden nyttig', 'PO Helse helsemetrikk']) {
            if (variant === forventet) {
                expect(screen.getByText(variant)).toBeInTheDocument()
            } else {
                expect(screen.queryByText(variant)).not.toBeInTheDocument()
            }
        }

        for (const aktivert of [false, undefined]) {
            rerender(innhold(aktivert))
            expect(screen.queryByText('Var siden nyttig')).not.toBeInTheDocument()
            expect(screen.queryByText('PO Helse helsemetrikk')).not.toBeInTheDocument()
        }
    })
})
