import { Link, List } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'

export interface OppsummertAvslagListeProps {
    oppsummertAvslag: Set<string>
    title: string
    harBegrunnelseFraBomlo: boolean
    vedtak: RSVedtakWrapper
    dagTabellScrollElement: string
}

export const OppsumertAvslagListe = (oppsumertAvslag: OppsummertAvslagListeProps) => {
    const harInnvilgelseBegrunnelse = hentBegrunnelse(oppsumertAvslag.vedtak, 'Innvilgelse') !== undefined
    if (oppsumertAvslag.oppsummertAvslag.size === 0 && !harInnvilgelseBegrunnelse) return null

    const alleAvslag: React.JSX.Element[] = []
    oppsumertAvslag.oppsummertAvslag?.forEach((begrunnelse) => {
        alleAvslag.push(<List.Item key={begrunnelse}>{begrunnelse}</List.Item>)
    })

    const hentMalId = () => {
        if (oppsumertAvslag.harBegrunnelseFraBomlo || harInnvilgelseBegrunnelse) {
            return 'begrunnelse-vedtak'
        }
        return oppsumertAvslag.dagTabellScrollElement
    }

    return (
        <section className="mb-8">
            {oppsumertAvslag.oppsummertAvslag.size > 0 && (
                <List as="ul" title={oppsumertAvslag.title}>
                    {alleAvslag}
                </List>
            )}

            <Link href={`#${hentMalId()}`}>Se nærmere begrunnelse her</Link>
        </section>
    )
}
