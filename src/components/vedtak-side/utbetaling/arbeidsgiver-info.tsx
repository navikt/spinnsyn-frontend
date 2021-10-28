import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { getLedetekst, tekst } from '../../../utils/tekster'

const ArbeidsgiverInfo = () => {
    const { valgtVedtak } = useAppStore()

    return (
        <section className="arbeidsgiver-info">
            <Element tag="h3" className="arbeidsgiver-info__tittel">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Element>
            <Normaltekst className="arbeidsgiver-info__tekst">
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': valgtVedtak?.orgnavn
                })}
            </Normaltekst>
        </section>
    )
}

export default ArbeidsgiverInfo
