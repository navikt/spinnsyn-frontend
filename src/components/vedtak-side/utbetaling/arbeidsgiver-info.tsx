import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'

export const ArbeidsgiverInfo = ({ vedtak }: VedtakProps) => {

    return (
        <section className="tekstinfo">
            <Element tag="h3">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Element>
            <Normaltekst>
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                })}
            </Normaltekst>
        </section>
    )
}

