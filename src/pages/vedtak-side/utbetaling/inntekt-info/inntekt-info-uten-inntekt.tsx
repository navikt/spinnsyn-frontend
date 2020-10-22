import './inntekt-info.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'
import {
    refusjonTilArbeidsgiverBeløp,
    refusjonTilArbeidsgiverTotalBeløp,
    refusjonTilArbeidsgiverUtbetalingsdager
} from '../../../../utils/vedtak-utils'

const InntektInfo = () => {
    const { valgtInntektsmelding, valgtVedtak } = useAppStore()
    const [ daglig, setDaglig ] = useState<string>('-')
    const [ dager, setDager ] = useState<string>('-')
    const [ sum, setSum ] = useState<string>('-')

    useEffect(() => {
        setDaglig(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)) + ' kr')
        setDager(refusjonTilArbeidsgiverUtbetalingsdager(valgtVedtak) + ' dager')
        setSum(ValutaFormat.format(refusjonTilArbeidsgiverTotalBeløp(valgtVedtak)) + ' kr')
    }, [ valgtVedtak, valgtInntektsmelding ])

    return (
        <section className="inntekt__info">
            <Element className="inntekt__info__tittel">
                {tekst('utbetaling.inntekt.info.tittel')}
            </Element>
            <div className="inntekt__info__linje">
                <Normaltekst tag="span">
                    {tekst('utbetaling.inntekt.info.daglig')}
                </Normaltekst>
                <Normaltekst tag="span">
                    {daglig}
                </Normaltekst>
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
