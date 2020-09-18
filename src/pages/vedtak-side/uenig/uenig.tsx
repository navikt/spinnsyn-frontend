import './uenig.less'

import Lenke from 'nav-frontend-lenker'
import { Element,Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const Uenig = () => {
    return (
        <div className="uenig">
            <Undertittel className="uenig__tittel">
                {tekst('uenig.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('uenig.tekst')}
            </Normaltekst>
            <Element className="uenig__klagefrist">Klagefrist: 21. juli 2020</Element>
            <Normaltekst className="uenig__lesmer">
                Du kan lese mer om &nbsp;
                <Lenke href="#">dine klagerettigheter</Lenke> &nbsp;
                eller gå direkte til &nbsp;
                <Lenke href="#">skjemaveilederen for klage.</Lenke>
            </Normaltekst>
        </div>
    )
}

export default Uenig
