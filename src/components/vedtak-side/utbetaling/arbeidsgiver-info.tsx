import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'

export const ArbeidsgiverInfo = ({ vedtak }: VedtakProps) => {

    return (
        <section className="info">
            <Element tag="h3" className="info__tittel">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Element>
            <Normaltekst className="info__tekst">
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': vedtak.orgnavn
                })}
            </Normaltekst>
        </section>
    )
}

