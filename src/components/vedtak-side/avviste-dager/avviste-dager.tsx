import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
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
        <Ekspanderbar type="gul"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Systemtittel tag="h3">
                        {avvisteDager.length + avvisteDagerTekst}
                    </Systemtittel>
                    <Normaltekst tag="span">
                        {tekst('avviste.dager.dekkes.ikke')}
                    </Normaltekst>
                </div>
            }
        >
            <div className="tekstinfo">
                <Normaltekst>{tekst('avviste.dager.intro')}</Normaltekst>
            </div>

            <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />

            <EkspanderbarIntern erApen={true} className="avvistedageroversikt"
                tittel={'Dager NAV ikke utbetaler'}
            >
                <DagTabell dager={avvisteDager} />
                <DagBeskrivelse dager={avvisteDager} />
            </EkspanderbarIntern>
        </Ekspanderbar>
    )
}

export default AvvisteDager
