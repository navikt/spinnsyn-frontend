import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../../components/utvidbar/utvidbar'
import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { klagefrist } from '../../../../utils/vedtak-utils'

const FeilOpplysningerInfo = () => {
    const { valgtVedtak } = useAppStore()

    return (
        <Utvidbar erApen={false} tittel="Ved feil opplysninger" type="intern">
            <section>
                <Normaltekst>
                    {tekst('vedtak.utbetaling.opplysninger.inntektsmelding')}
                </Normaltekst>
            </section>
            <section>
                <Normaltekst>
                    {tekst('vedtak.utbetaling.opplysninger.beslutning')}
                </Normaltekst>
            </section>
            <section>
                <Element>
                    {'Klagefrist: ' + klagefrist(valgtVedtak)}
                </Element>
            </section>
        </Utvidbar>
    )
}

export default FeilOpplysningerInfo
