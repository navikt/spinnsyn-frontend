import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import ListevisningLenkepanel from './listevisning-lenkepanel'

describe('Listevisning lenkepanel', () => {
    it('Viser etikett for en revurdering', async () => {
        const vedtak = {
            id: 'id-1',
            annullert: false,
            revurdert: false,
            lest: false,
            opprettetTimestamp: '2023-01-01T00:00:00Z',
            orgnavn: 'Test AS',
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                fom: '2023-01-01',
                tom: '2023-01-31',
                utbetaling: {
                    utbetalingType: 'REVURDERING',
                },
            },
        }

        render(<ListevisningLenkepanel vedtak={vedtak} />)

        const etikett = await screen.findByText('Nytt svar')
        expect(etikett).toBeInTheDocument()
    })

    it('Viser etikett for et revurdert vedtak', async () => {
        const vedtak = {
            id: 'id-1',
            annullert: false,
            revurdert: true,
            lest: false,
            opprettetTimestamp: '2023-01-01T00:00:00Z',
            orgnavn: 'Test AS',
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                fom: '2023-01-01',
                tom: '2023-01-31',
                utbetaling: {
                    utbetalingType: 'UTBETALING',
                },
            },
        }

        render(<ListevisningLenkepanel vedtak={vedtak} />)

        const etikett = await screen.findByText('Erstattet med nytt svar')
        expect(etikett).toBeInTheDocument()
    })

    it('Viser etikett for et annullert vedtak', async () => {
        const vedtak = {
            id: 'id-1',
            annullert: true,
            revurdert: false,
            lest: false,
            opprettetTimestamp: '2023-01-01T00:00:00Z',
            orgnavn: 'Test AS',
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                fom: '2023-01-01',
                tom: '2023-01-31',
                utbetaling: {
                    utbetalingType: 'UTBETALING',
                },
            },
        }

        render(<ListevisningLenkepanel vedtak={vedtak} />)

        const etikett = await screen.findByText('Erstattet med nytt svar')
        expect(etikett).toBeInTheDocument()
    })
})
