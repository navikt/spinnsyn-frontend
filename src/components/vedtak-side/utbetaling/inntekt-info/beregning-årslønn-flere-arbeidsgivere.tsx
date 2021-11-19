import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { VedtakProps } from '../../vedtak'

const BeregningÅrslønnFlereArbeidsgivere = ({ vedtak }: VedtakProps) => {

    const alleÅrsLønn = vedtak.andreArbeidsgivere

    return (
        <section className="inntekt__info">
            <div className="inntekt__info__linje">
                <Element tag="h4">
                    {tekst('utbetaling.andre.arbeidsgivere.tittel')}
                </Element>
                <Normaltekst tag="span">{}</Normaltekst>
            </div>
            <ul style={{ marginInlineStart: -8, marginTop: 0.1 }}>
                { Object.keys(alleÅrsLønn!).map((key) => (
                    <li key={key}>
                        <div className="inntekt__info__linje">
                            <Element className={'inntekt__info__redusert'} tag="p">
                                {key}
                            </Element>
                            <Normaltekst tag="span">{formaterValuta(alleÅrsLønn![key])}</Normaltekst>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default BeregningÅrslønnFlereArbeidsgivere
