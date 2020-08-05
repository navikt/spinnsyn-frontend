import './vedtak-status.less'

import dayjs from 'dayjs'
import { AlertStripeSuksess } from 'nav-frontend-alertstriper'
import { Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React, { useEffect, useState } from 'react'

import { tekst } from '../../utils/tekster'
import Vis from '../vis'

const VedtakStatus = () => {
    const status = true
    const [ behandletDato, setBehandletDato ] = useState<string>()

    useEffect(() => {
        opprettDatoer()
        // eslint-disable-next-line
    }, [])

    const opprettDatoer = () => {
        const behandlet = new Date()  // TODO: Hvor skal vi hente denne fra?
        if (behandlet) {
            const dato = dayjs(behandlet).format('dddd D. MMM, kl HH:mm')
            setBehandletDato(dato.charAt(0).toUpperCase() + dato.slice(1))
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
