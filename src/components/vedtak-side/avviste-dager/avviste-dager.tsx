import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Utvidbar from '../../utvidbar/utvidbar'
import UtvidbarGul from '../../utvidbar/utvidbar-gul'
import BeregningInfo from '../utbetaling/beregning-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
}

const AvvisteDager = ({ avvisteDager, vedtak }: AvvisteDagerProps) => {
    const [ apen ] = useState<boolean>(false)

    const avvisteDagerTekst = avvisteDager.length > 1 || avvisteDager.length < 1
        ? ' sykepengedager'
        : ' sykepengedag'

    return (
        <UtvidbarGul
            erApen={apen}
            tittel={
                <div className="tekstinfo__avsnitt">
                    <Systemtittel tag="h3">
                        {avvisteDager.length + avvisteDagerTekst}
                    </Systemtittel>
                    <Normaltekst tag="span">
                        {tekst('avviste.dager.dekkes.ikke')}
                    </Normaltekst>
                </div>
            }
        >
            <div className="tekstinfo__avsnitt">
                <Normaltekst>{tekst('avviste.dager.intro')}</Normaltekst>
            </div>

            <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />

            <Utvidbar erApen={true} visLukk={true} type="intern" className="avvistedageroversikt"
                tittel={'Dager NAV ikke utbetaler'}
            >
                <DagTabell dager={avvisteDager} />
                <DagBeskrivelse dager={avvisteDager} />
            </Utvidbar>
        </UtvidbarGul>
    )
}

export default AvvisteDager
