import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Behandling } from './behandling'

vi.mock('../../../utils/dato-utils', () => ({
    tilLesbarDatoMedArstall: vi.fn(() => '1. januar 2024'),
}))

describe('Behandling', () => {
    const baseVedtak = {
        utbetaling: { automatiskBehandling: false, forbrukteSykedager: 0, gjenståendeSykedager: 0 },
        vedtakFattetTidspunkt: '2024-01-01T12:00:00Z',
        yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
        tags: [] as string[],
        saksbehandler: { navn: 'Ola Nordmann', ident: 'Z123456' },
        beslutter: { navn: 'Kari Nordmann', ident: 'Z654321' },
    }

    it('viser automatisk behandling', () => {
        render(
            <Behandling
                vedtak={{
                    ...baseVedtak,
                    utbetaling: { automatiskBehandling: true, forbrukteSykedager: 0, gjenståendeSykedager: 0 },
                    saksbehandler: undefined,
                    beslutter: undefined,
                }}
            />,
        )
        expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Søknaden ble behandlet automatisk')
        expect(screen.getByText(/Søknaden ble behandlet 1. januar 2024/)).toBeInTheDocument()
    })

    it('viser tekst for selvstendig næringsdrivende', () => {
        render(
            <Behandling
                vedtak={{
                    ...baseVedtak,
                    yrkesaktivitetstype: 'SELVSTENDIG' as const,
                    tags: [] as string[],
                }}
            />,
        )
        expect(screen.getByText(/offentlige registre/)).toBeInTheDocument()
        expect(screen.queryByText(/arbeidsgiveren din/)).not.toBeInTheDocument()
    })

    it('viser tekst for arbeidstaker med a-ordning', () => {
        render(
            <Behandling
                vedtak={{
                    ...baseVedtak,
                    yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                    tags: ['InntektFraAOrdningenLagtTilGrunn'],
                }}
            />,
        )
        expect(screen.queryByText(/arbeidsgiveren din/)).not.toBeInTheDocument()
    })

    it('viser tekst for arbeidstaker uten a-ordning', () => {
        render(
            <Behandling
                vedtak={{
                    ...baseVedtak,
                    yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                    tags: [] as string[],
                }}
            />,
        )
        expect(screen.getByText(/arbeidsgiveren din/)).toBeInTheDocument()
    })

    it('viser manuell behandling med saksbehandler og beslutter', () => {
        render(<Behandling vedtak={baseVedtak} />)
        expect(screen.getByRole('heading', { level: 2 }).textContent).toContain('Søknaden ble behandlet manuelt')
        expect(screen.getByText(/Ola Nordmann/)).toBeInTheDocument()
        expect(screen.getByText(/Kari Nordmann/)).toBeInTheDocument()
        expect(screen.getByText(/Søknaden ble behandlet 1. januar 2024/)).toBeInTheDocument()
    })

    it('viser kun saksbehandler hvis beslutter mangler', () => {
        render(<Behandling vedtak={{ ...baseVedtak, beslutter: undefined }} />)
        expect(screen.getByText(/av Ola Nordmann\./)).toBeInTheDocument()
        expect(screen.queryByText(/Kari Nordmann/)).not.toBeInTheDocument()
    })
})
