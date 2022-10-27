import { BodyLong, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'

import InntektInfo from './inntekt-info/inntekt-info'

export interface PersonutbetalingInfoProps {
    vedtak: RSVedtakWrapper
}

export const PersonutbetalingInfo = ({ vedtak }: PersonutbetalingInfoProps) => {
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

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}
