import { EtikettLiten, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tilLesbarDatoMedArstall, tilLesbarPeriodeMedArstall } from '../../utils/dato-utils'
import { tekst } from '../../utils/tekster'
import Vis from '../vis'
import { OpplysningerProps } from './sykmelding-opplysninger'

const FravaersperioderInfo = ({ sykmelding }: OpplysningerProps) => {

    if ((sykmelding?.valgtArbeidssituasjon === 'FRILANSER' || sykmelding?.valgtArbeidssituasjon === 'NAERINGSDRIVENDE')
        && sykmelding.sporsmal.harAnnetFravaer !== null) {

        const harPerioder = sykmelding.sporsmal.fravaersperioder
            && sykmelding.sporsmal.fravaersperioder.length > 0

        return (
            <div className="avsnitt">
                <EtikettLiten tag="h3" className="avsnitt-hode">
                    {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir')}
                </EtikettLiten>

                <Vis hvis={harPerioder}>
                    <ul className="nokkelopplysning__liste">
                        {sykmelding.sporsmal.fravaersperioder
                            ?.filter((p) => {
                                return p.fom !== null && p.tom !== null
                            })
                            .map((p) => {
                                return (
                                    <li key={tilLesbarDatoMedArstall(p.fom)!}>
                                        <Normaltekst>{tilLesbarPeriodeMedArstall(p.fom, p.tom)}</Normaltekst>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </Vis>

                <Vis hvis={!harPerioder}>
                    <Normaltekst>
                        {tekst('sykepengesoknad.sykmelding-utdrag.egenmelding-papir-nei')}
                    </Normaltekst>
                </Vis>
            </div>
        )
    }

    return null
}

export default FravaersperioderInfo
