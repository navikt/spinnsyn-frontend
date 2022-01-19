import { Element, Normaltekst } from 'nav-frontend-typografi'
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
                    <Element tag="th" className="arbgivernavn">
                        <span>{storeTilStoreOgSmå(arbeidsgiverNavn)}</span>
                    </Element>
                    <Normaltekst tag="td">
                        {formaterValuta(alleÅrsLønn![arbeidsgiverNavn])}
                    </Normaltekst>
                </tr>
            ))}
        </>
    )
}

export default BeregningÅrslønnFlereArbeidsgivere
