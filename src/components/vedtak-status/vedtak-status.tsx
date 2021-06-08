import './vedtak-status.less'

import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Dame from './female.svg'
import Mann from './male.svg'

const VedtakStatus = () => {
    const { valgtVedtak } = useAppStore()
    const periode = tilLesbarPeriodeMedArstall(valgtVedtak?.vedtak.fom, valgtVedtak?.vedtak.tom)
    const [ veileder, setVeileder ] = useState<string>()

    useEffect(() => {
        (valgtVedtak!.id.charCodeAt(0) % 2) === 1 ? setVeileder(Dame) : setVeileder(Mann)
    }, [ valgtVedtak ])

    if (valgtVedtak === undefined) return null
    const annullertEllerRevurdert = valgtVedtak.annullert || valgtVedtak.revurdert

    return (
        <div className="vedtak-status">
            <Veilederpanel kompakt svg={<img src={veileder} alt="" />}>
                <Undertittel tag="h3" className="vedtak-status__tittel">
                    {annullertEllerRevurdert
                        ? tekst('vedtak.status.annullert.tittel')
                        : tekst('vedtak.status.tittel')}
                </Undertittel>
                <Element>
                    {tekst('vedtak.status.gjelder')}
                </Element>
                <Normaltekst>
                    {periode}
                </Normaltekst>
            </Veilederpanel>
        </div>
    )
}

export default VedtakStatus
