import { Normaltekst } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Utvidbar from '../../utvidbar/utvidbar'
import BeregningInfo from '../utbetaling/beregning-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
}

const AvvisteDager = ({ avvisteDager, vedtak }: AvvisteDagerProps) => {
    const [ apen ] = useState<boolean>(false)

    return (
        <Utvidbar
            type="integrert"
            className={'orange avviste__dager__innhold' + (apen ? ' apen' : '')}
            erApen={apen}
            visLukk={true}
            ikon={'/syk/sykepenger/static/img/ikon-varselboble.svg'}
            ikonHover={'/syk/sykepenger/static/img/ikon-varselboble.svg'}
            tittel={avvisteDager.length + ' sykepengedager'}
            systemtittel={tekst('avviste.dager.dekkes.ikke')}
            ikonAltTekst=""
            fixedHeight={true}
            heading="h2"
        >
            <Normaltekst className="tekstinfo__avsnitt">
                {tekst('avviste.dager.intro')}
            </Normaltekst>

            <BeregningInfo vedtak={vedtak} />

            <Utvidbar erApen={true} visLukk={true} type="intern" className="avvistedageroversikt"
                tittel={'Dager NAV ikke utbetaler'}
            >
                <DagTabell dager={avvisteDager} />
                <DagBeskrivelse dager={avvisteDager} />
            </Utvidbar>
        </Utvidbar>
    )
}

export default AvvisteDager
