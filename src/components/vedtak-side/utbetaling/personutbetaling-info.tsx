import { BodyLong, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useContext } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { spinnsynFrontendInterne } from '../../../utils/environment'
import { tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import Vis from '../../vis'

import InntektInfo from './inntekt-info/inntekt-info'
import {Kontonummer} from './kontonummer/kontonummer'

export interface PersonutbetalingInfoProps {
    vedtak: RSVedtakWrapper
}

export const PersonutbetalingInfo = ({ vedtak }: PersonutbetalingInfoProps) => {
    const erArkivering = useContext(ArkiveringContext)
    const erInterne = spinnsynFrontendInterne()

    return (
        <section className="tekstinfo">
            <Heading spacing level="3" size="small">
                {tekst('utbetaling.person.når')}
            </Heading>

            <BodyLong spacing>
                {parser(tekst('utbetaling.person.når.innhold'))}
                <LenkeMedAmplitude
                    url={tekst('utbetaling.person.når.lenke.url')}
                    tekst={tekst('utbetaling.person.når.lenke.tekst')}
                />
            </BodyLong>

            <Vis hvis={!erInterne && !erArkivering} render={() => <Kontonummer />} />

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}
