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
            <Undertittel tag="h2">{tekst('klage.tittel')}</Undertittel>
            <Normaltekst className="vedtak__klage--tekst">{tekst('klage.behandlingstid')} </Normaltekst>
            <Normaltekst className="vedtak__klage--tekst">{tekst('klage.frist')} </Normaltekst>
            <Lenke target="blank" href={tekst('klage.klagerettigheter.url')}>
                <Normaltekst className="vedtak__klage--tekst">{tekst('klage.klagerettigheter.tekst')}</Normaltekst>
            </Lenke>
            <Knapp mini type="standard" onClick={() => klageKnappTrykk()}>{tekst('klage.knapp.uenig')}</Knapp>
        </section>
    )
}

export default Klage
