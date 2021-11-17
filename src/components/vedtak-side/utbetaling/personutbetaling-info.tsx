import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'


export const PersonutbetalingInfo = () => {

    return (
        <section className="info">
            <Element tag="h3" className="info__tittel">
                {tekst('utbetaling.person.når')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold'))}
            </Normaltekst>
        </section>
    )
}
