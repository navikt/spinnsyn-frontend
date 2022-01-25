import { BodyLong, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import EkspanderbarIntern from '../../ekspanderbar/ekspanderbar-intern'
import BeregningInfo from '../utbetaling/beregning-info'
import InntektInfo from '../utbetaling/inntekt-info/inntekt-info'

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
                    <Heading spacing size="large" level="3">
                        {avvisteDager.length + avvisteDagerTekst}
                    </Heading>
                    <BodyLong spacing size="small" as="span">
                        {tekst('avviste.dager.dekkes.ikke')}
                    </BodyLong>
                </div>
            }
        >
            <div className="tekstinfo">
                <BodyLong spacing size="small">{tekst('avviste.dager.intro')}</BodyLong>
            </div>

            <InntektInfo vedtak={vedtak} />

            <EkspanderbarIntern erApen={true} className="avvistedageroversikt"
                tittel={'Dager NAV ikke utbetaler'}
            >
                <DagTabell dager={avvisteDager} />
                <DagBeskrivelse dager={avvisteDager} />
            </EkspanderbarIntern>

            <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
        </Ekspanderbar>
    )
}

export default AvvisteDager
