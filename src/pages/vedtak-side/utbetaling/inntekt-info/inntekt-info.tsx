import './inntekt-info.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import Vis from '../../../../components/vis'
import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'

const InntektInfo = () => {
    const { valgtVedtak } = useAppStore()
    const [ mnd, setMnd ] = useState<string>('-')
    const [ ar, setAr ] = useState<string>('-')

    useEffect(() => {
        if (valgtVedtak) {
            if (valgtVedtak?.vedtak.inntekt !== null && valgtVedtak?.vedtak.inntekt !== undefined) {
                const manedsinntekt = Math.floor(valgtVedtak?.vedtak?.inntekt)
                setMnd(ValutaFormat.format(manedsinntekt || 0) + ' kr')
                setAr(ValutaFormat.format(manedsinntekt * 12 || 0) + ' kr')
            }
        }
    }, [ valgtVedtak ])

    return (
        <section className="inntekt__info">
            <Element className="inntekt__info__tittel">
                {tekst('utbetaling.inntekt.info.tittel')}
            </Element>
            <Vis hvis={valgtVedtak?.vedtak.inntekt !== null && valgtVedtak?.vedtak.inntekt !== undefined}
                render={() =>
                    <>
                        <div className="inntekt__info__linje">
                            <Normaltekst tag="span">
                                {tekst('utbetaling.inntekt.info.beregnet')}
                            </Normaltekst>
                            <Normaltekst tag="span">{mnd}</Normaltekst>
                        </div>
                        <div className="inntekt__info__linje">
                            <Normaltekst tag="span">
                                {tekst('utbetaling.inntekt.info.omregnet')}
                            </Normaltekst>
                            <Normaltekst tag="span">{ar}</Normaltekst>
                        </div>
                    </>
                }
            />
        </section>
    )
}

export default InntektInfo
