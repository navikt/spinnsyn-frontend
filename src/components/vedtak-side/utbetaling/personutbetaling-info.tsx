import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import InntektInfo from './inntekt-info/inntekt-info'

export const PersonutbetalingInfo = () => {
export interface PersonutbetalingInfoProps {
    vedtak: RSVedtakWrapper
}

export const PersonutbetalingInfo = ({ vedtak }: PersonutbetalingInfoProps) => {

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

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}
