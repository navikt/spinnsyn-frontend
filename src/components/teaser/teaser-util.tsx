import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { Soknad } from '../../types/types'
import { Vedtak } from '../../types/vedtak'
import { getLedetekst, tekst } from '../../utils/tekster'

export const arbeidsgiverListevisning = (vedtak: Vedtak, soknader: Soknad[]) => {

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

export interface SykepengesoknadTeaserProps {
    vedtak: Vedtak;
}
