import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

export const DirekteutbetalingInfo = () => {

    return (
        <section className="arbeidsgiver-info">
            <Element tag="h3" className="arbeidsgiver-info__tittel" style={{ paddingBottom: '1em' }}>
                {tekst('utbetaling.til-kontonummer.tittel')}
            </Element>
            <Element tag="h3" className="blokkinfo__avsnitt" style={{ fontSize: '18px', paddingBottom: '0em' }}>
                Når får du pengene?
            </Element>
            <Normaltekst>
                <p>Pengene blir utbetalt innen fem dager.</p>


                Da kan du se beløpet i <a href={'https://tjenester.nav.no/utbetalingsoversikt/'} target={'_blank'} rel="noreferrer">Din utbetalingsoversikt</a> med
                skattetrekk og
                eventuelle andre trekk.
            </Normaltekst>
        </section>
    )
}
