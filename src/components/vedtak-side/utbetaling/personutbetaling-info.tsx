import parser from 'html-react-parser'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
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
            <Undertittel tag="h3" className="info__tittel">
                {tekst('utbetaling.person.når')}
            </Undertittel>

            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold'))}
            </Normaltekst>

            <Normaltekst className="blokkinfo__avsnitt">
                {parser(tekst('utbetaling.person.når.beløp'))}
            </Normaltekst>

            <Undertittel tag="h3" className="info__tittel">
                {tekst('utbetaling.inntekt.info.tittel')}
            </Undertittel>

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}
