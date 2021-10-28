
import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'
import Vis from '../../../vis'

const InntektInfo = () => {
    const { valgtVedtak } = useAppStore()

    const inntektMnd = (valgtVedtak?.vedtak.inntekt)
        ? ValutaFormat.format(Math.floor(valgtVedtak!.vedtak.inntekt!)) + ' kr'
        : undefined

    const inntektAr = (valgtVedtak?.vedtak.inntekt)
        ? ValutaFormat.format(Math.floor(valgtVedtak.vedtak.inntekt * 12)) + ' kr'
        : undefined

    return (
        <Vis hvis={inntektMnd && inntektAr}
            render={() =>
                <section className="inntekt__info">
                    <div className="inntekt__info__linje">
                        <Element tag="h4">
                            {tekst('utbetaling.inntekt.info.beregnet')}
                        </Element>
                        <Normaltekst tag="span">{inntektMnd}</Normaltekst>
                    </div>

                    <div className="inntekt__info__linje">
                        <Element tag="h4">
                            {tekst('utbetaling.inntekt.info.omregnet')}
                        </Element>
                        <Normaltekst tag="span">{inntektAr}</Normaltekst>
                    </div>
                </section>
            }
        />
    )
}

export default InntektInfo
