import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../../../utils/store-små'
import { tekst } from '../../../../../utils/tekster'
import { formaterValuta } from '../../../../../utils/valuta-utils'
import { VedtakProps } from '../../../vedtak'

const BeregningÅrslønnFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {
    const alleÅrsLønn = vedtak.andreArbeidsgivere
    const arbeidsgivere = Object.keys(alleÅrsLønn!)

    return (
        <>
            {arbeidsgivere.map((arbeidsgiverNavn, idx) => (
                <div key={idx}>
                    <Label data-cy={`annen-arbeidsgiver-${idx}`}>{storeTilStoreOgSmå(arbeidsgiverNavn)}</Label>
                    <section
                        className="arkivering-flex-fix flex justify-between"
                        data-cy={`annen-arbeidsgiver-årslønn-${idx}`}
                    >
                        <BodyShort as="div" size="small">
                            {tekst('utbetaling.inntekt.årslønn')}
                        </BodyShort>
                        <BodyShort as="div" size="small">
                            {formaterValuta(alleÅrsLønn![arbeidsgiverNavn])}
                        </BodyShort>
                    </section>
                </div>
            ))}
        </>
    )
}

export default BeregningÅrslønnFlereArbeidsgivere
