import { Element, Normaltekst } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../../../utils/dato-utils'
import { tekst } from '../../../../utils/tekster'
import { refusjonTilArbeidsgiverOrgnummer } from '../../../../utils/vedtak-utils'

const RefusjonInfo = () => {
    const { valgtVedtak, soknader } = useAppStore()
    const [ org, setOrg ] = useState<string>('-')
    const [ periode, setPeriode ] = useState<string>('-')
    const [ arbeidsgiver, setArbeidsgiver ] = useState<string>('-')

    useEffect(() => {
        setOrg(refusjonTilArbeidsgiverOrgnummer(valgtVedtak))
        setPeriode(tilLesbarPeriodeMedArstall(valgtVedtak?.vedtak.fom, valgtVedtak?.vedtak.tom))
        setArbeidsgiver(soknader?.find(s => s.arbeidsgiver?.orgnummer === org)?.arbeidsgiver?.navn || '-')
    }, [ valgtVedtak, soknader, org ])

    if (valgtVedtak === undefined || soknader === undefined) return null

    return (
        <section className="tekstinfo">
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.refusjon.periode')}
            </Element>
            <Normaltekst>
                {periode}
            </Normaltekst>
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.refusjon.refunderes')}
            </Element>
            <Normaltekst>
                {arbeidsgiver}
            </Normaltekst>
            <Element tag="h2" className="tekstinfo__avsnitt">
                {tekst('utbetaling.refusjon.orgnr')}
            </Element>
            <Normaltekst>
                {org?.match(/\d{3}/g)?.join(' ')}
            </Normaltekst>
        </section>
    )
}

export default RefusjonInfo
