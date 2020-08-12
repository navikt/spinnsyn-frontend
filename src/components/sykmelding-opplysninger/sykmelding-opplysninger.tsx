import './opplysninger.less'

import React, { useState } from 'react'

import { Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import ArbeidssituasjonInfo from './arbeidssituasjon-info'
import plasterHover from './plaster-hover.svg'
import plaster from './plaster.svg'
import SykmeldingDato from './sykmelding-dato'
import ForsikringInfo from './sykmelding-forsikring'
import FravaersperioderInfo from './sykmelding-fravaersperioder'
import SykmeldingPerioder from './sykmelding-perioder'

export interface OpplysningerProps {
    ekspandert?: boolean;
    sykmelding: Sykmelding;
}

const SykmeldingOpplysninger = ({ ekspandert, sykmelding }: OpplysningerProps) => {
    const [ apen ] = useState<boolean>(ekspandert!)

    return (
        <Utvidbar className={'ekspander' + (apen ? ' apen' : '')}
            ikon={plaster} ikonHover={plasterHover} erApen={apen}
            tittel={tekst('sykepengesoknad.sykmelding-utdrag.tittel')}
            ikonAltTekst=""
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
