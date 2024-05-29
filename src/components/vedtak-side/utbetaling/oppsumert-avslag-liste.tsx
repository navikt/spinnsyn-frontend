import { Link, List } from '@navikt/ds-react'
import React from 'react'

import { useScroll } from '../../../context/scroll-context'

export interface OppsumertAvslagListeProps {
    oppsumertAvslag: Set<string>
    title: string
    harBegrunnelseFraBomlo: boolean
}

export const OppsumertAvslagListe = ({ oppsumertAvslag }: { oppsumertAvslag: OppsumertAvslagListeProps }) => {
    const { blaTilElement } = useScroll()

    if (oppsumertAvslag.oppsumertAvslag.size === 0) return null

    const alleAvslag: React.JSX.Element[] = []
    oppsumertAvslag.oppsumertAvslag?.forEach((begrunnelse) => {
        alleAvslag.push(<List.Item key={begrunnelse}>{begrunnelse}</List.Item>)
    })

    return (
        <section className="mb-8">
            <List as="ul" title={oppsumertAvslag.title}>
                {alleAvslag}
            </List>
            <Link
                as="button"
                type="button"
                className="cursor-pointer"
                onClick={() =>
                    blaTilElement(oppsumertAvslag.harBegrunnelseFraBomlo ? 'begrunnelse_vedtak' : 'dager_ikke_nav')
                }
            >
                Se nærmere begrunnelse her
            </Link>
        </section>
    )
}
