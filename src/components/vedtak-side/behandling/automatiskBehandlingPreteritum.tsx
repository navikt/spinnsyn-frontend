import Lenke from 'nav-frontend-lenker'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const AutomatiskBehandlingPreteritum = () => {
    return (
        <div className="behandling">
            <Undertittel className="behandling__tittel">
                {tekst('behandling.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('behandling.preteritum.tekst1')}
                <Lenke href={tekst('behandling.lenke.url')} target="_blank">
                    {tekst('behandling.lenke')}
                </Lenke>
                {tekst('behandling.tekst2')}
            </Normaltekst>
            <Normaltekst>
                {tekst('behandling.preteritum.tekst2')}
            </Normaltekst>
        </div>
    )
}

export default AutomatiskBehandlingPreteritum
