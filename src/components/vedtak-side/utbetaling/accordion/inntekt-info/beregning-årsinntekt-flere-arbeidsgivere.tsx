import { Label } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../../../utils/store-små'
import { tekst } from '../../../../../utils/tekster'
import { formaterValuta } from '../../../../../utils/valuta-utils'
import { VedtakProps } from '../../../vedtak'

import { InfoSection } from './info-seksjon'

const BeregningÅrsinntektFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {
    const alleÅrsLønn = vedtak.andreArbeidsgivere
    const arbeidsgivere = Object.keys(alleÅrsLønn!)

    return (
        <>
            {arbeidsgivere.map((arbeidsgiverNavn, idx) => (
                <div key={idx}>
                    <Label data-cy={`annen-arbeidsgiver-${idx}`}>{storeTilStoreOgSmå(arbeidsgiverNavn)}</Label>
                    <InfoSection
                        ariaLabel={`${storeTilStoreOgSmå(arbeidsgiverNavn)} ${tekst('utbetaling.inntekt.årsinntekt')}`}
                        label={tekst('utbetaling.inntekt.årsinntekt')}
                        value={formaterValuta(alleÅrsLønn![arbeidsgiverNavn])}
                    />
                </div>
            ))}
        </>
    )
}

export default BeregningÅrsinntektFlereArbeidsgivere
