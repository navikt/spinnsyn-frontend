import parser from 'html-react-parser'
import { Element,Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import InntektInfo from './inntekt-info/inntekt-info'

export interface PersonutbetalingInfoProps {
    vedtak: RSVedtakWrapper
}

export const PersonutbetalingInfo = ({ vedtak }: PersonutbetalingInfoProps) => {

    return (
        <section className="info">
            <Element tag="h3" className="info__tittel">
                {tekst('utbetaling.person.når')}
            </Element>

            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold'))}
            </Normaltekst>

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}
