import './behandling.less'

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
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
            <div className="behandling__utvidbar">
                <Utvidbar type="intern" erApen={false} tittel={tekst('behandling.manuell')}>
                    Manuell behandling
                </Utvidbar>
                <Utvidbar type="intern" erApen={false} tittel={tekst('behandling.saken')}>
                    Sakens opplysninger
                </Utvidbar>
            </div>
        </div>
    )
}

export default Behandling
