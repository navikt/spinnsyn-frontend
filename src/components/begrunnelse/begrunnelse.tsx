import './begrunnelse.less'

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'

const Begrunnelse = () => {
    return (
        <section className="vedtak__begrunnelse">
            <Undertittel tag="h2">Begrunnelse</Undertittel>
            <Normaltekst className="vedtak__begrunnelse--tekst">
                {tekst('vedtak.begrunnelse')}
            </Normaltekst>
        </section>
    )
}

export default Begrunnelse
