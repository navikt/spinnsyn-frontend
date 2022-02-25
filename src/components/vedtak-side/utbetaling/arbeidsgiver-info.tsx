import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'
import InntektInfo from './inntekt-info/inntekt-info'

export const ArbeidsgiverInfo = ({ vedtak }: VedtakProps) => {

    return (
        <section className="tekstinfo">
            <Heading spacing size="xsmall" level="3">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Heading>
            <BodyLong spacing>
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
                })}
            </BodyLong>

            <InntektInfo vedtak={vedtak} />
        </section>
    )
}

