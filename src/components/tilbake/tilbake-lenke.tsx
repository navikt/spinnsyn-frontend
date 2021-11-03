import { VenstreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { sykefravaerUrl } from '../../utils/environment'
import { tekst } from '../../utils/tekster'

const TilbakeLenke = () => {
    return (
        <Lenke className="vedtak__tilbake" href={sykefravaerUrl()}>
            <VenstreChevron />
            <Normaltekst tag="span" className="vedtak__tilbake--lenke">
                {tekst('vedtak.tilbake')}
            </Normaltekst>
        </Lenke>
    )
}

export default TilbakeLenke
