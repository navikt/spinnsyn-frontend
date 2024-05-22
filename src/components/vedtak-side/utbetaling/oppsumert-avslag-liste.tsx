import { Link, List } from '@navikt/ds-react'
import React from 'react'

import { oppsumertAvslagBegrunnelser } from '../../../utils/vedtak-utils'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { useScroll } from '../../../context/scroll-context'

export const OppsumertAvslagListe = ({
    vedtak,
    dager,
}: {
    vedtak: RSVedtakWrapper
    dager: 'dagerArbeidsgiver' | 'dagerPerson' | 'alleDager'
}) => {
    const { blaTilElement } = useScroll()

    let title: string
    let description: string
    let oppsumertAvslag: Set<string>
    if (dager === 'alleDager') {
        title = 'Hvorfor er vedtaket avslått?'
        description = 'Du har fått avvist vedtak på søknaden fordi'
        oppsumertAvslag = new Set<string>([
            ...oppsumertAvslagBegrunnelser(vedtak, 'dagerArbeidsgiver'),
            ...oppsumertAvslagBegrunnelser(vedtak, 'dagerPerson'),
        ])
    } else {
        title = 'Hvorfor er vedtaket delvis innvilget?'
        description = 'Du har ikke fått innvilget penger for'
        oppsumertAvslag = oppsumertAvslagBegrunnelser(vedtak, dager)
    }

    const alleAvslag: React.JSX.Element[] = []
    oppsumertAvslag.forEach((begrunnelse) => {
        alleAvslag.push(<List.Item key={begrunnelse}>{begrunnelse}</List.Item>)
    })

    if (alleAvslag.length === 0) return null
    return (
        <section className="mb-8">
            <List as="ul" title={title} description={description}>
                {alleAvslag}
            </List>
            <Link as="button" type="button" className="cursor-pointer" onClick={blaTilElement}>
                Se nærmere begrunnelse her
            </Link>
        </section>
    )
}
