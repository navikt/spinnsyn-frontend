import dayjs from 'dayjs'
import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { OpplysningerProps } from './sykmelding-opplysninger'

const SykmeldingDato = ({ sykmelding }: OpplysningerProps) => {

    if (!sykmelding?.bekreftelse.utstedelsesdato) {
        return null
    }

    return (
        <div className="avsnitt">
            <EtikettLiten tag="h3" className="avsnitt-hode">
                {tekst('sykepengesoknad.sykmelding-utdrag.dato-sykmeldingen-ble-skrevet')}
            </EtikettLiten>
            <Normaltekst>
                {dayjs(sykmelding.bekreftelse.utstedelsesdato).format('D. MMM YYYY')}
            </Normaltekst>
        </div>
    )
}

export default SykmeldingDato
