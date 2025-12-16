import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { getLedetekst, tekst } from '../../../utils/tekster'
import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak-felles'

type ArbeidsgiverInfoProps = {
    vedtak: RSVedtakWrapperUtvidet
}

export const ArbeidsgiverInfo = ({ vedtak }: ArbeidsgiverInfoProps) => {
    return (
        <>
            <Heading spacing size="xsmall" level="3">
                {tekst('utbetaling.arbeidsgiver.tittel')}
            </Heading>
            <BodyLong spacing>
                {getLedetekst(tekst('utbetaling.arbeidsgiver.tekst'), {
                    '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn),
                })}
            </BodyLong>
        </>
    )
}
