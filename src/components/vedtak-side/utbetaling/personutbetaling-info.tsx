import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import Kontonummer from './kontonummer/kontonummer'

export const PersonutbetalingInfo = () => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()

    return (
        <section className="info">
            <Element tag="h3" className="info__tittel">
                {tekst('utbetaling.person.når')}
            </Element>
            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold'))}
            </Normaltekst>

            <Vis hvis={!erInterne && !erArkivering} render={() =>
                <Kontonummer />
            } />

        </section>
    )
}
