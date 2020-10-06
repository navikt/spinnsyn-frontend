import './inntekt-info.less'

import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp, refusjonTilArbeidsgiverDagsats } from '../../../../utils/vedtak-utils'

const InntektInfo = () => {
    const { valgtInntektsmelding, valgtVedtak } = useAppStore()
    const [ mnd, setMnd ] = useState<string>('-')
    const [ ar, setAr ] = useState<string>('-')
    const [ daglig, setDaglig ] = useState<string>('-')
    const [ dager, setDager ] = useState<string>('-')
    const [ sum, setSum ] = useState<string>('-')

    useEffect(() => {
        setMnd(ValutaFormat.format(valgtInntektsmelding?.månedsinntekt || 0) + ' kr')
        setAr(ValutaFormat.format(valgtInntektsmelding?.årsinntekt || 0) + ' kr')
        setDaglig(ValutaFormat.format(refusjonTilArbeidsgiverDagsats(valgtVedtak)) + ' kr')
        setDager(valgtVedtak?.vedtak.forbrukteSykedager + ' dager')
        setSum(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)) + ' kr')
    }, [ valgtVedtak, valgtInntektsmelding ])

    return (
        <section className="inntekt__info">
            <Undertittel className="inntekt__info__tittel">
                {tekst('utbetaling.inntekt.info.tittel')}
            </Undertittel>
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
