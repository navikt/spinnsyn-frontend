import './klage.less'

import { Knapp } from 'nav-frontend-knapper'
import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const Klage = () => {
    const klageKnappTrykk = () => {
        //TODO: Send videre til klage
    }

    return (
        <>
            <Element tag="h2" className="klage-tittel">{tekst('klage.tittel')}</Element>
            <Normaltekst tag="span">{tekst('klage.behandlingstid')} </Normaltekst>
            <Normaltekst tag="span">{tekst('klage.frist')} </Normaltekst>
            <Lenke target="blank" href={tekst('klage.klagerettigheter.url')}>
                <Normaltekst tag="span">{tekst('klage.klagerettigheter.tekst')}</Normaltekst>
            </Lenke>
            <Knapp mini type="standard" onClick={() => klageKnappTrykk()}>{tekst('klage.knapp.uenig')}</Knapp>
        </>
    )
}

export default Klage
