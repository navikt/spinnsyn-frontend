import parser from 'html-react-parser'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import Utvidbar from '../../utvidbar/utvidbar'
import { VedtakProps } from '../vedtak'
import InntektInfo from './inntekt-info/inntekt-info'

const BeregningInfo = ({ vedtak }: VedtakProps) => {
    return (
        <Utvidbar erApen={false} visLukk={true} type="intern" className="blokkinfo"
            tittel={tekst('utbetaling.beregning.tittel')}
        >
            <InntektInfo vedtak={vedtak} />

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.mndlonn.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.mndlonn.innhold')}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.arslonn.tittel')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.arslonn.innhold'))}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.dagligbelop.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.dagligbelop.innhold')}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.totalbelop.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.totalbelop.innhold')}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.flere-arbeidsforhold.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.flere-arbeidsforhold.innhold')}
            </Normaltekst>

            <Element tag="h4" className="blokkinfo__avsnitt">
                {tekst('utbetaling.utbetalingsdager.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.utbetalingsdager.innhold')}
            </Normaltekst>


            <Normaltekst className="blokkinfo__avsnitt">
                {tekst('utbetaling.beregning.les.mer')}
                <Lenke href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                    {tekst('utbetaling.beregning.lenke.tekst')}
                </Lenke>
            </Normaltekst>
        </Utvidbar>
    )
}

export default BeregningInfo
