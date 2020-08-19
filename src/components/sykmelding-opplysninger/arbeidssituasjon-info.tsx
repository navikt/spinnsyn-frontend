import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { OpplysningerProps } from './sykmelding-opplysninger'

const ArbeidssituasjonInfo = ({ sykmelding }: OpplysningerProps) => {

    if (sykmelding?.valgtArbeidssituasjon) {
        const situasjon = sykmelding.valgtArbeidssituasjon.toLowerCase()

        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3" className="avsnitt-hode">
                    {tekst('din-sykmelding.arbeidssituasjon.tittel.2')}
                </EtikettLiten>
                <Normaltekst>
                    {tekst(`din-sykmelding.arbeidssituasjon.alternativ.${situasjon}`)}
                </Normaltekst>
            </div>
        )
    }

    return null
}

export default ArbeidssituasjonInfo
