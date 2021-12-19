import parser from 'html-react-parser'
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import Vis from '../../vis'
import InntektInfo from './inntekt-info/inntekt-info'
import Kontonummer from './kontonummer/kontonummer'

export interface PersonutbetalingInfoProps {
    vedtak: RSVedtakWrapper
}

export const PersonutbetalingInfo = ({ vedtak }: PersonutbetalingInfoProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()

    return (
        <section className="tekstinfo">
            <Element tag="h3">
                {tekst('utbetaling.person.når')}
            </Element>

            <Normaltekst>
                {parser(tekst('utbetaling.person.når.innhold'))}
            </Normaltekst>

            <Vis hvis={!erInterne && !erArkivering} render={() =>
                <Kontonummer />
            } />

            <InntektInfo vedtak={vedtak} />

        </section>
    )
}
