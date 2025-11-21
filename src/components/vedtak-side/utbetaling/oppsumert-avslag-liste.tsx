import { Link, List } from '@navikt/ds-react'
import React from 'react'

import { useScroll } from '../../../context/scroll-context'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'

export interface OppsummertAvslagListeProps {
    oppsummertAvslag: Set<string>
    title: string
    harBegrunnelseFraBomlo: boolean
    vedtak: RSVedtakWrapper
}

export const OppsumertAvslagListe = (oppsumertAvslag: OppsummertAvslagListeProps) => {
    const { blaTilElement } = useScroll()

    const harInnvilgelseBegrunnelse = hentBegrunnelse(oppsumertAvslag.vedtak, 'Innvilgelse') !== undefined
    if (oppsumertAvslag.oppsummertAvslag.size === 0 && !harInnvilgelseBegrunnelse) return null

    const alleAvslag: React.JSX.Element[] = []
    oppsumertAvslag.oppsummertAvslag?.forEach((begrunnelse) => {
        alleAvslag.push(<List.Item key={begrunnelse}>{begrunnelse}</List.Item>)
    })

    return (
        <section className="mb-8">
            {oppsumertAvslag.oppsummertAvslag.size > 0 && (
                <List as="ul" title={oppsumertAvslag.title}>
                    {alleAvslag}
                </List>
            )}

            <Link
                as="button"
                type="button"
                className="cursor-pointer"
                onClick={() => {
                    if (oppsumertAvslag.harBegrunnelseFraBomlo) {
                        blaTilElement('begrunnelse_vedtak')
                    } else if (harInnvilgelseBegrunnelse) {
                        blaTilElement('begrunnelse_vedtak')
                    } else {
                        blaTilElement('dager_ikke_nav')
                    }
                }}
            >
                Se nærmere begrunnelse her
            </Link>
        </section>
    )
}
