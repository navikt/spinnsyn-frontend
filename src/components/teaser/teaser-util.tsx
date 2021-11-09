import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { getLedetekst, tekst } from '../../utils/tekster'

export const arbeidsgiverListevisning = (vedtak: RSVedtakWrapper) => {

    return (
        <Normaltekst className="inngangspanel__tekst">
            {getLedetekst(tekst('spinnsyn.teaser.sykmeldt-fra'), {
                '%ARBEIDSGIVER%': vedtak.orgnavn
            })}
        </Normaltekst>
    )
}

export interface VedtakTeaserProps {
    vedtak: RSVedtakWrapper;
}
