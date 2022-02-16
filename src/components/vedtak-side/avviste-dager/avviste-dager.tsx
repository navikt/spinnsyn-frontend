import { Accordion, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React, { useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import BeregningInfo from '../utbetaling/beregning-info'
import InntektInfo from '../utbetaling/inntekt-info/inntekt-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
}

const AvvisteDager = ({ avvisteDager, vedtak }: AvvisteDagerProps) => {
    const [ apen ] = useState<boolean>(false)
    const [ open, setOpen ] = useState<boolean>(false)

    const avvisteDagerTekst = avvisteDager.length > 1 || avvisteDager.length < 1
        ? ' sykepengedager'
        : ' sykepengedag'

    return (
        <Accordion>
            <Ekspanderbar type="gul"
                ikon="/syk/sykepenger/static/img/warning.svg"
                erApen={apen}
                tittel={
                    <div className="ekspanderbar__tittel">
                        <Heading size="large" level="2">
                            {avvisteDager.length + avvisteDagerTekst}
                            <BodyShort spacing size="small" as="span">
                                {tekst('avviste.dager.dekkes.ikke')}
                            </BodyShort>
                        </Heading>
                    </div>
                }
            >
                <div className="tekstinfo">
                    <BodyLong spacing size="small">{tekst('avviste.dager.intro')}</BodyLong>
                </div>

                <InntektInfo vedtak={vedtak} />

                <Accordion>
                    <Accordion.Item open={open} className="avvistedageroversikt">
                        <Accordion.Header onClick={() => setOpen(!open)}>Dager NAV ikke utbetaler</Accordion.Header>
                        <Accordion.Content>
                            <DagTabell dager={avvisteDager} />
                            <DagBeskrivelse dager={avvisteDager} />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>

                <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
            </Ekspanderbar>
        </Accordion>
    )
}

export default AvvisteDager
