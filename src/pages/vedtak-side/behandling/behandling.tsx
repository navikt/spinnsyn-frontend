import './behandling.less'

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const Behandling = () => {
    return (
        <div className="behandling">
            <Undertittel className="behandling__tittel">
                {tekst('behandling.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('behandling.tekst')}
            </Normaltekst>
        </div>
    )
}

export default Behandling
