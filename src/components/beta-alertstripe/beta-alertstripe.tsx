import parser from 'html-react-parser'
import AlertStripe from 'nav-frontend-alertstriper'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'


const BetaAlertstripe = () => {
    return (
        <AlertStripe type="info" style={{ marginBottom: '2rem' }}>
            <Element style={{ marginBottom: 5 }}>Du er kommet til en side som er under utvikling.</Element>
            <Normaltekst>{tekst('vedtak.betatekst')}</Normaltekst>
            <Normaltekst>{parser(tekst('vedtak.betalenke'))}</Normaltekst>
        </AlertStripe>
    )
}

export default BetaAlertstripe
