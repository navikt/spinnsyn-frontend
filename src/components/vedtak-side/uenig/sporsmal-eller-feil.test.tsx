import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Dokument } from '../../../types/rs-types/rs-vedtak-felles'

import { SporsmalEllerFeil } from './sporsmal-eller-feil'

describe('Spørsmål eller feil', () => {
    it('Viser lenke til spesifikk inntektsmelding', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [
                    {
                        type: 'Inntektsmelding',
                        dokumentId: 'id-1',
                    } as Dokument,
                ],
                tags: [''],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        const link = await screen.findByText('inntektsmeldingen')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/syk/sykefravaer/inntektsmeldinger/id-1')
    })

    it('Viser lenke til inntektsmelding oversikt dersom flere inntektsmeldinger', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [
                    {
                        type: 'Inntektsmelding',
                        dokumentId: 'id-1',
                    } as Dokument,
                    {
                        type: 'Inntektsmelding',
                        dokumentId: 'id-2',
                    } as Dokument,
                ],
                tags: [''],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        const link = await screen.findByText('inntektsmeldingen')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/syk/sykefravaer/inntektsmeldinger')
    })
})
