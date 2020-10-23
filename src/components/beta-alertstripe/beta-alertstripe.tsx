import parser from 'html-react-parser'
import AlertStripe from 'nav-frontend-alertstriper'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'


const BetaAlertstripe = () => {
    return (
        <AlertStripe type="info" style={{ marginBottom: '2rem' }}>
            <Element style={{ marginBottom: 5 }}>{tekst('vedtak.betatittel')}</Element>
            <Normaltekst>{parser(tekst('vedtak.betatekst'))}</Normaltekst>
        </AlertStripe>
    )
}

export default BetaAlertstripe
