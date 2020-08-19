import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { OpplysningerProps } from './sykmelding-opplysninger';

const ArbeidsgiverInfo = ({ sykmelding }: OpplysningerProps) => {

    if (sykmelding?.mottakendeArbeidsgiver?.navn) {
        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3" className="avsnitt-hode">
                    {tekst('sykepengesoknad.sykmelding-utdrag.arbeidsgiver')}
                </EtikettLiten>
                <Normaltekst>{sykmelding.mottakendeArbeidsgiver.navn}</Normaltekst>
            </div>
        )
    }

    return null
}

export default ArbeidsgiverInfo
