import './vedtak-status.less'

import { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tilLesbarDatoMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const VedtakStatus = () => {
    const status = true
    const [ behandletDato, setBehandletDato ] = useState<string>()
    const { valgtVedtak } = useAppStore()

    useEffect(() => {
        opprettDatoer()
        // eslint-disable-next-line
    }, [ valgtVedtak ])

    const opprettDatoer = () => {
        const behandlet = valgtVedtak?.opprettet
        if (behandlet) {
            setBehandletDato(tilLesbarDatoMedArstall(behandlet))
        }
    }

    // TODO: Vedtak kan ha flere utfall enn godkjent søknad
    return (
        <Vis hvis={status}>
            <AlertStripeSuksess>
                <Undertittel tag="h2">
                    {tekst('vedtak.status.tittel')}
                </Undertittel>
                <Normaltekst>
                    {tekst('vedtak.status.behandlet')} {behandletDato}
                </Normaltekst>
            </AlertStripeSuksess>
        </Vis>
    )
}

export default VedtakStatus
