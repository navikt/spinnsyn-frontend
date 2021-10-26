
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'


const VedtakStatus = () => {
    const { valgtVedtak } = useAppStore()
    const periode = tilLesbarPeriodeMedArstall(valgtVedtak?.vedtak.fom, valgtVedtak?.vedtak.tom)
    const dame = '/syk/sykepenger/static/img/female.svg'
    const mann = '/syk/sykepenger/static/img/male.svg'
    const [ veileder, setVeileder ] = useState<string>(mann)

    useEffect(() => {
        (valgtVedtak!.id.charCodeAt(0) % 2) === 1 ? setVeileder(dame) : setVeileder(mann)
    }, [ valgtVedtak ])

    if (!valgtVedtak) return null
    const annullertEllerRevurdert = valgtVedtak.annullert || valgtVedtak.revurdert

    return (
        <div className="vedtak-status">
            <Veilederpanel kompakt svg={<img src={veileder} alt="" />}>
                <Undertittel tag="h2" className="vedtak-status__tittel">
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
