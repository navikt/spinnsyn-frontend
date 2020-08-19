import './opplysninger.less'

import React, { useState } from 'react'

import { Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'

export interface OpplysningerProps {
    sykmelding: Sykmelding;
}

const SykmeldingOpplysninger = ({ sykmelding }: OpplysningerProps) => {
    const [ apen ] = useState<boolean>(false)

    return (
        <Utvidbar className={'ekspander hvit' + (apen ? ' apen' : '')}
            tittel={tekst('din-sykmelding.periode.tittel') + ' ' + sykmelding.identdato}
            type="intern" erApen={apen}
        >
            <div className="opplysninger">
                {apen}
                <SykmeldingPerioder sykmelding={sykmelding} />
                <ArbeidsgiverInfo sykmelding={sykmelding} />
                <SykmeldingDato sykmelding={sykmelding} />
                <ArbeidssituasjonInfo sykmelding={sykmelding} />
                <FravaersperioderInfo sykmelding={sykmelding} />
                <ForsikringInfo sykmelding={sykmelding} />
            </div>
        </Utvidbar>
    )
}

export default SykmeldingOpplysninger
