import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../../utils/store-små'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { VedtakProps } from '../../vedtak'

const BeregningÅrslønnFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {
    const alleÅrsLønn = vedtak.andreArbeidsgivere
    const arbeidsgivere = Object.keys(alleÅrsLønn!)

    return (
        <>
            {arbeidsgivere.map((arbeidsgiverNavn, idx) => (
                <div key={idx}>
                    <Label className="arbgiver_navn">{storeTilStoreOgSmå(arbeidsgiverNavn)}</Label>
                    <section>
                        <BodyShort as="div" size="small" className="tekst">
                            {tekst('utbetaling.inntekt.årslønn')}
                        </BodyShort>
                        <BodyShort as="div" size="small" className="beløp">
                            {formaterValuta(alleÅrsLønn![arbeidsgiverNavn])}
                        </BodyShort>
                    </section>
                </div>
            ))}
        </>
    )
}

export default BeregningÅrslønnFlereArbeidsgivere
