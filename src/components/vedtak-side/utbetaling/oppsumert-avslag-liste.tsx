import { Link, List } from '@navikt/ds-react'
import React from 'react'

import { useScroll } from '../../../context/scroll-context'

export interface OppsumertAvslagListeProps {
    oppsumertAvslag: Set<string>
    title: string
    description: string
}

export const OppsumertAvslagListe = (oppsumertAvslag: OppsumertAvslagListeProps) => {
    const { blaTilElement } = useScroll()

    const alleAvslag: React.JSX.Element[] = []
    oppsumertAvslag.oppsumertAvslag?.forEach((begrunnelse) => {
        alleAvslag.push(<List.Item key={begrunnelse}>{begrunnelse}</List.Item>)
    })

    if (alleAvslag.length === 0) return null
    return (
        <section className="mb-8">
            <List as="ul" title={oppsumertAvslag.title} description={oppsumertAvslag.description}>
                {alleAvslag}
            </List>
            <Link as="button" type="button" className="cursor-pointer" onClick={() => blaTilElement('begrunnelse')}>
                Se nærmere begrunnelse her
            </Link>
        </section>
    )
}
