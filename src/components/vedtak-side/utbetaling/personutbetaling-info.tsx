import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

export const PersonutbetalingInfo = () => {
    return (
        <section className="tekstinfo">
            <Element tag="h3">
                {tekst('utbetaling.person.når')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold1'))}
            </Normaltekst>
            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold2'))}
            </Normaltekst>
        </section>
    )
}
