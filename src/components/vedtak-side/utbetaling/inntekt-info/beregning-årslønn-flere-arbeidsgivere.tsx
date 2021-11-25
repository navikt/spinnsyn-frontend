import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { storeTilStoreOgSmå } from '../../../../utils/store-små'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { VedtakProps } from '../../vedtak'

const BeregningÅrslønnFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {

    const alleÅrsLønn = vedtak.andreArbeidsgivere

    return (
        <>
            <tr>
                <Element tag="th">
                    {tekst('utbetaling.andre.arbeidsgivere.tittel')}
                </Element>
                <Normaltekst tag="td">{}</Normaltekst>
            </tr>
            {Object.keys(alleÅrsLønn!).map((arbeidsgiverNavn) => (
                <tr key={arbeidsgiverNavn}>
                    <Element tag="th" className="arbgivernavn">
                        {storeTilStoreOgSmå(arbeidsgiverNavn)}
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
