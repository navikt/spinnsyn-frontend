import './inntektsmeldingOppsummering.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { ValutaFormat } from '../../../../utils/valuta-utils'
import { refusjonTilArbeidsgiverBeløp, refusjonTilArbeidsgiverDagsats } from '../../../../utils/vedtak-utils'

const InntektsmeldingOppsummering = () => {
    const { valgtInntektsmelding, valgtVedtak } = useAppStore()
    const [ mnd, setMnd ] = useState<string>('-')
    const [ ar, setAr ] = useState<string>('-')
    const [ daglig, setDaglig ] = useState<string>('-')
    const [ dager, setDager ] = useState<string>('-')
    const [ sum, setSum ] = useState<string>('-')

    useEffect(() => {
        setMnd(ValutaFormat.format(valgtInntektsmelding?.månedsinntekt || 0) + ' kr')
        setAr(ValutaFormat.format(valgtInntektsmelding?.årsinntekt || 0) + ' kr')

        // TODO: Vi ønsker at dette er daglig beløp som dekkes, ikke daglig hva man tjener?
        setDaglig(ValutaFormat.format(refusjonTilArbeidsgiverDagsats(valgtVedtak)) + ' kr')
        setDager(valgtVedtak?.vedtak.forbrukteSykedager + ' dager')
        setSum(ValutaFormat.format(refusjonTilArbeidsgiverBeløp(valgtVedtak)) + ' kr')
    }, [ valgtVedtak, valgtInntektsmelding ])

    return (
        <section className="inntektsmelding__oppsummering">
            <Element>Slik beregner vi sykepengene</Element>
            <span>
                <Normaltekst>Beregnet månedslønn</Normaltekst>
                <Normaltekst>{mnd}</Normaltekst>
            </span>
            <span className="gra__underline">
                <Normaltekst>Omregnet til årslønn</Normaltekst>
                <Normaltekst>{ar}</Normaltekst>
            </span>
            <span>
                <Element>Daglig utbetalingsbeløp</Element>
                <Element>{daglig}</Element>
            </span>
            <span className="svart__underline">
                <Normaltekst>Utbetalingsdager</Normaltekst>
                <Normaltekst>{dager}</Normaltekst>
            </span>
            <span>
                <Element>Sykepengebeløp</Element>
                <Element>{sum}</Element>
            </span>
        </section>
    )
}

export default InntektsmeldingOppsummering
