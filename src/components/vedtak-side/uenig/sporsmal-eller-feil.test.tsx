import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Dokument } from '../../../types/rs-types/rs-vedtak-felles'

import { SporsmalEllerFeil } from './sporsmal-eller-feil'

describe('Spørsmål eller feil', () => {
    it('Viser lenke til inntektsmelding oversikt for arbeidstaker', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [
                    {
                        type: 'Inntektsmelding',
                        dokumentId: 'id-1',
                    } as Dokument,
                ],
                tags: [],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        const link = await screen.findByText('inntektsmeldinger')
        expect(link).toBeInTheDocument()
        expect(link).toHaveAttribute('href', '/syk/sykefravaer/inntektsmeldinger')
        expect(screen.getByText(/Hvis du vil se inntektsopplysningene arbeidsgiveren din har sendt inn/)).toBeInTheDocument()

        const contactLink = screen.getByText('ta kontakt med Nav')
        expect(contactLink).toHaveAttribute('href', 'https://innboks.nav.no/s/skriv-til-oss?category=Helse')
    })

    it('Viser kontakt Nav tekst for arbeidstaker med InntektFraAOrdningenLagtTilGrunn', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [],
                tags: ['InntektFraAOrdningenLagtTilGrunn'],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        expect(screen.queryByText('inntektsmeldinger')).not.toBeInTheDocument()
        expect(screen.getByText(/Hvis du vil se opplysningene svaret er basert på, eller har andre spørsmål/)).toBeInTheDocument()
        const link = screen.getByText('ta kontakt med Nav')
        expect(link).toHaveAttribute('href', 'https://innboks.nav.no/s/skriv-til-oss?category=Helse')
    })

    it('Viser kontakt Nav tekst for selvstendig næringsdrivende', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'SELVSTENDIG' as const,
                dokumenter: [],
                tags: [],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        expect(screen.queryByText('inntektsmeldinger')).not.toBeInTheDocument()
        expect(screen.getByText(/Hvis du vil se opplysningene svaret er basert på, eller har andre spørsmål/)).toBeInTheDocument()
        const link = screen.getByText('ta kontakt med Nav')
        expect(link).toHaveAttribute('href', 'https://innboks.nav.no/s/skriv-til-oss?category=Helse')
    })

    it('Viser lenke til spesifikk søknad', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [
                    {
                        type: 'Søknad',
                        dokumentId: 'soknad-id-1',
                    } as Dokument,
                ],
                tags: [],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        const link = screen.getByText('endre svarene i søknaden')
        expect(link).toHaveAttribute('href', '/syk/sykepengesoknad/sendt/soknad-id-1')
    })

    it('Viser generell lenke til søknad når ingen spesifikk søknad finnes', async () => {
        const vedtak = {
            vedtak: {
                yrkesaktivitetstype: 'ARBEIDSTAKER' as const,
                dokumenter: [],
                tags: [],
            },
        }
        render(<SporsmalEllerFeil vedtak={vedtak} />)

        const link = screen.getByText('endre svarene i søknaden')
        expect(link).toHaveAttribute('href', '/syk/sykepengesoknad')
    })
})
