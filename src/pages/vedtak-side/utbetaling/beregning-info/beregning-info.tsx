import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../../components/utvidbar/utvidbar'
import { tekst } from '../../../../utils/tekster'

const BeregningInfo = () => {
    return (
        <Utvidbar erApen={false} tittel="Mer om beregningen" type="intern" className="tekstinfo">
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.mndlonn.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.mndlonn.innhold')}
            </Normaltekst>
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.arslonn.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.arslonn.innhold')}
            </Normaltekst>
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.dagligbelop.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.dagligbelop.innhold')}
            </Normaltekst>
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.totalbelop.tittel')}
            </Element>
            <Normaltekst>
                {tekst('utbetaling.totalbelop.innhold')}
            </Normaltekst>
            <Normaltekst>
                {tekst('utbetaling.beregning.lese.mer')}
                <Lenke href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                    {tekst('utbetaling.beregning.lenke.tekst')}
                </Lenke>
            </Normaltekst>
        </Utvidbar>
    )
}

export default BeregningInfo
