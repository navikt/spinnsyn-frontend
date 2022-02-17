import { BodyLong } from '@navikt/ds-react'
import React from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { storeTilStoreOgSmå } from '../../utils/store-små'
import { getLedetekst, tekst } from '../../utils/tekster'

export const arbeidsgiverListevisning = (vedtak: RSVedtakWrapper) => {

    return (
        <BodyLong spacing className="inngangspanel__tekst">
            {getLedetekst(tekst('spinnsyn.teaser.sykmeldt-fra'), {
                '%ARBEIDSGIVER%': storeTilStoreOgSmå(vedtak.orgnavn)
            })}
        </BodyLong>
    )
}

export interface VedtakTeaserProps {
    vedtak: RSVedtakWrapper;
}
