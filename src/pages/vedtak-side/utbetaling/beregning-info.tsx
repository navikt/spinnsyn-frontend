import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const BeregningInfo = () => {
    return (
        <Ekspanderbartpanel apen={false} className="tekstinfo" tittel={
            <Element tag="span">Mer om beregningen</Element>
        }>
            <>
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
                    {tekst('utbetaling.utbetalingsdager.tittel')}
                </Element>
                <Normaltekst>
                    {tekst('utbetaling.utbetalingsdager.innhold')}
                </Normaltekst>

                <Element tag="h2" className="tekstinfo__avsnitt">
                    {tekst('utbetaling.totalbelop.tittel')}
                </Element>
                <Normaltekst>
                    {tekst('utbetaling.totalbelop.innhold')}
                </Normaltekst>
                <Normaltekst className="tekstinfo__avsnitt">
                    {tekst('utbetaling.totalbelop.innhold-2')}
                </Normaltekst>
                <Element tag="h2" className="tekstinfo__avsnitt">
                    {tekst('utbetaling.delvis.tittel')}
                </Element>
                <Normaltekst>
                    {tekst('utbetaling.delvis.innhold')}
                </Normaltekst>
                <Normaltekst className="tekstinfo__avsnitt">
                    {tekst('utbetaling.beregning.les.mer')}
                    <Lenke href={tekst('utbetaling.beregning.lenke.url')} target="_blank">
                        {tekst('utbetaling.beregning.lenke.tekst')}
                    </Lenke>
                </Normaltekst>
            </>
        </Ekspanderbartpanel>
    )
}

export default BeregningInfo
