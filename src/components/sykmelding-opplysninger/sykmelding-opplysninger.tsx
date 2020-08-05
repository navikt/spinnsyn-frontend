import './opplysninger.less'

import React, { useState } from 'react'

import { Sykmelding } from '../../types/types'
import { tekst } from '../../utils/tekster'
import Utvidbar from '../utvidbar/utvidbar'
import ArbeidsgiverInfo from './arbeidsgiver-info'
import plasterHover from './plaster-hover.svg'
import plaster from './plaster.svg'
import SykmeldingPerioder from './sykmelding-perioder'

interface OpplysningerProps {
    ekspandert: boolean;
    sykmelding: Sykmelding;     // TODO: Hvis vedtak kun kan gjelde for en sykmelding, så kan denne heller legges i AppStore, samme som sykepengesok
}

// TODO: Hentet deler fra sykepengesok, må nok endres

const SykmeldingOpplysninger = ({ ekspandert, sykmelding }: OpplysningerProps) => {
    const [ apen ] = useState<boolean>(ekspandert)

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
            </div>
        </Utvidbar>
    )
}

export default SykmeldingOpplysninger
