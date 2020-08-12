import './klage.less'

import { Knapp } from 'nav-frontend-knapper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const Klage = () => {
    const klageKnappTrykk = () => {
        //TODO: Send videre til klage
    }

    return (
        <section className="vedtak__klage">
            <Undertittel tag="h2" className="klage__tittel">{tekst('klage.tittel')}</Undertittel>
            <Normaltekst>{tekst('klage.behandlingstid')}</Normaltekst>
            <Normaltekst>{tekst('klage.frist')}</Normaltekst>
            <Lenke className="vedtak__klage--uenig" target="_blank" href={tekst('klage.klagerettigheter.url')}>
                <Normaltekst tag="span">{tekst('klage.klagerettigheter.tekst')}</Normaltekst>
            </Lenke>
            <Knapp mini type="standard" onClick={() => klageKnappTrykk()}>
                {tekst('klage.knapp.uenig')}
            </Knapp>
        </section>
    )
}

export default Klage
