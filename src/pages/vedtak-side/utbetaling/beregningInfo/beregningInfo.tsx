import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../../components/utvidbar/utvidbar'
import { tekst } from '../../../../utils/tekster'

const BeregningInfo = () => {
    return (
        <Utvidbar erApen={false} tittel="Mer om beregningen" type="intern">
            <section>
                <Element>{tekst('vedtak.utbetaling.mndlonn.tittel')}</Element>
                <Normaltekst>{tekst('vedtak.utbetaling.mndlonn.innhold')}</Normaltekst>
            </section>
            <section>
                <Element>{tekst('vedtak.utbetaling.arslonn.tittel')}</Element>
                <Normaltekst>{tekst('vedtak.utbetaling.arslonn.innhold')}</Normaltekst>
            </section>
            <section>
                <Element>{tekst('vedtak.utbetaling.dagligbelop.tittel')}</Element>
                <Normaltekst>{tekst('vedtak.utbetaling.dagligbelop.innhold')}</Normaltekst>
            </section>
            <section>
                <Element>{tekst('vedtak.utbetaling.totalbelop.tittel')}</Element>
                <Normaltekst>{tekst('vedtak.utbetaling.totalbelop.innhold')}</Normaltekst>
            </section>
            <section>
                <Normaltekst>
                    {'Du kan lese mer om hvordan sykepengene beregnes i '}
                    <Lenke href="https://lovdata.no/lov/1997-02-28-19/§8-28" target="_blank">
                        folketrygdloven § 8-28 til 30.
                    </Lenke>
                </Normaltekst>
            </section>
        </Utvidbar>
    )
}

export default BeregningInfo
