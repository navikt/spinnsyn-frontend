import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { Soknad } from '../../types/types'
import { getLedetekst, tekst } from '../../utils/tekster'

export const arbeidsgiverListevisning = (vedtak: RSVedtakWrapper, soknader: Soknad[]) => {

    const soknadIder = vedtak?.vedtak.dokumenter
        .filter(dok => dok.type === 'Søknad')
        .map(dok => dok.dokumentId)

    const soknad = soknader.find(sok => soknadIder?.includes(sok.id))

    return (
        <Normaltekst className="inngangspanel__tekst">
            {getLedetekst(tekst('spinnsyn.teaser.sykmeldt-fra'), {
                '%ARBEIDSGIVER%': soknad?.arbeidsgiver?.navn
            })}
        </Normaltekst>
    )
}

export interface VedtakTeaserProps {
    vedtak: RSVedtakWrapper;
}
