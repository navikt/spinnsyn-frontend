import { BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../../utils/store-små'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { VedtakProps } from '../../vedtak'

const BeregningÅrslønnFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {
    const alleÅrsLønn = vedtak.andreArbeidsgivere

    return (
        <>
            {Object.keys(alleÅrsLønn!).map((arbeidsgiverNavn) => (
                <tr key={arbeidsgiverNavn}>
                    <Label spacing as="th" size="small" className="arbgivernavn">
                        <span>{storeTilStoreOgSmå(arbeidsgiverNavn)}</span>
                    </Label>
                    <BodyShort spacing size="small" as="td">
                        {formaterValuta(alleÅrsLønn![arbeidsgiverNavn])}
                    </BodyShort>
                </tr>
            ))}
        </>
    )
}

export default BeregningÅrslønnFlereArbeidsgivere
