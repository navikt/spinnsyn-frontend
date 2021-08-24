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
    const [ daglig, setDaglig ] = useState<string>('-')
    const [ dager, setDager ] = useState<string>('-')
    const [ sum, setSum ] = useState<string>('-')

    useEffect(() => {
        if (valgtVedtak) {
            setDaglig(ValutaFormat.format(valgtVedtak.dagligUtbetalingsbelop) + ' kr')
            setDager(valgtVedtak.antallDagerMedUtbetaling + ' dager')
            setSum(ValutaFormat.format(valgtVedtak.sykepengebelop )+ ' kr')
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
                        <div className="inntekt__info__linje gra__understrek">
                            <Normaltekst tag="span">
                                {tekst('utbetaling.inntekt.info.omregnet')}
                            </Normaltekst>
                            <Normaltekst tag="span">{ar}</Normaltekst>
                        </div>
                    </>
                }
            />
            <div className="inntekt__info__linje">
                <Element tag="span" className="inntekt__info__uthevet">
                    {tekst('utbetaling.inntekt.info.daglig')}
                </Element>
                <Element tag="span" className="inntekt__info__uthevet">
                    {daglig}
                </Element>
            </div>
            <div className="inntekt__info__linje svart__understrek">
                <Normaltekst tag="span">
                    {tekst('utbetaling.inntekt.info.utbetalingsdager')}
                </Normaltekst>
                <Normaltekst tag="span">{dager}</Normaltekst>
            </div>
            <div className="inntekt__info__linje">
                <Element tag="span" className="inntekt__info__uthevet">
                    {tekst('utbetaling.inntekt.info.sykepengebelop')}
                </Element>
                <Element tag="span" className="inntekt__info__uthevet">
                    {sum}
                </Element>
            </div>
        </section>
    )
}

export default InntektInfo
