import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const AutomatiskBehandling = () => {
    return (
        <div className="behandling">
            <Undertittel className="behandling__tittel">
                {tekst('behandling.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('behandling.tekst1')}
                <Lenke href={tekst('behandling.lenke.url')} target="_blank" rel="noopener noreferrer">
                    {tekst('behandling.lenke')}
                </Lenke>
                {tekst('behandling.tekst2')}
            </Normaltekst>
            <Normaltekst>
                {tekst('behandling.tekst3')}
                <Lenke href={tekst('behandling.lenke2.url')} target="_blank" rel="noopener noreferrer">
                    {tekst('behandling.lenke2')}
                </Lenke>
            </Normaltekst>
        </div>
    )
}

export default AutomatiskBehandling
