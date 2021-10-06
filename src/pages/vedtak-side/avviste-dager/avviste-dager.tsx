import './avviste-dager.less'

import { Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import DagBeskrivelse from '../../../components/dager/dag-beskrivelse'
import DagTabell from '../../../components/dager/dag-tabell'
import Utvidbar from '../../../components/utvidbar/utvidbar'
import { RSDag } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import BeregningInfo from '../utbetaling/beregning-info'
import VarselbobleIkon from './ikon-varselboble.svg'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
}

const AvvisteDager = ({ avvisteDager }: AvvisteDagerProps) => {
    const [ apen ] = useState<boolean>(false)

    return (
        <Utvidbar
            type="integrert"
            className={'orange avviste__dager__innhold' + (apen ? ' apen' : '')}
            erApen={apen}
            visLukk={true}
            ikon={VarselbobleIkon}
            ikonHover={VarselbobleIkon}
            tittel={avvisteDager.length + ' sykepengedager'}
            systemtittel={tekst('avviste.dager.dekkes.ikke')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('avviste.dager.intro')}
            </Normaltekst>

            <div className="avvistedageroversikt">
                <DagTabell dager={avvisteDager} />
                <DagBeskrivelse dager={avvisteDager} />
            </div>
            <BeregningInfo />
        </Utvidbar>
    )
}

export default AvvisteDager
