import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'

interface ArbeidsgiverInfoProps {
    sykmelding: Sykmelding;
}

const ArbeidsgiverInfo = ({ sykmelding }: ArbeidsgiverInfoProps) => {

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
