import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'
import InntektInfo from './inntekt-info/inntekt-info'

export const ArbeidsgiverInfo = ({ vedtak }: VedtakProps) => {

    return (
        <section className="info">
            <Undertittel tag="h3" className="info__tittel">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Undertittel>

            <Normaltekst className="info__tekst">
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                })}
            </Normaltekst>

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}

