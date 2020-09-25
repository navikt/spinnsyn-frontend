import './vedtak-status.less'

import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import VeilderMann from './male.svg'

const VedtakStatus = () => {
    const { valgtVedtak } = useAppStore()
    const periode = tilLesbarPeriodeMedArstall(valgtVedtak?.vedtak.fom, valgtVedtak?.vedtak.tom)
    const img = <img src={VeilderMann} alt="" />

    return (
        <div className="vedtak-status">
            <Veilederpanel kompakt svg={img}>
                <Undertittel tag="h3" className="vedtak-status__tittel">
                    {tekst('vedtak.status.tittel')}
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
