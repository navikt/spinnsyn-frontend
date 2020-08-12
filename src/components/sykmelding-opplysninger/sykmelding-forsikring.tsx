import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../utils/tekster'
import { OpplysningerProps } from './sykmelding-opplysninger'

const ForsikringInfo = ({ sykmelding }: OpplysningerProps) => {

    if ((sykmelding?.valgtArbeidssituasjon === 'FRILANSER' || sykmelding?.valgtArbeidssituasjon === 'NAERINGSDRIVENDE')
        && sykmelding.sporsmal.harForsikring !== null) {

        const nokkel = sykmelding.sporsmal.harForsikring
            ? 'sykepengesoknad.sykmelding-utdrag.forsikring-ja'
            : 'sykepengesoknad.sykmelding-utdrag.forsikring-nei'

        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3" className="avsnitt-hode">
                    {tekst('sykepengesoknad.sykmelding-utdrag.forsikring')}
                </EtikettLiten>
                <Normaltekst>{tekst(nokkel)}</Normaltekst>
            </div>
        )
    }

    return null
}

export default ForsikringInfo
