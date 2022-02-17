import { Accordion, BodyLong, BodyShort, Heading } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { midtstill } from '../../ekspanderbar/ekspander-utils'
import Ekspanderbar from '../../ekspanderbar/ekspanderbar'
import Vis from '../../vis'
import BeregningInfo from '../utbetaling/beregning-info'
import InntektInfo from '../utbetaling/inntekt-info/inntekt-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
    heltAvvist: Boolean
}

const AvvisteDager = ({ avvisteDager, vedtak, heltAvvist }: AvvisteDagerProps) => {
    const [ apen ] = useState<boolean>(false)
    const [ open, setOpen ] = useState<boolean>(false)
    const accordionRef = useRef(null)

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

                <Vis hvis={heltAvvist} render={() =>
                    <InntektInfo vedtak={vedtak} />
                } />

                <Accordion ref={accordionRef}>
                    <Accordion.Item open={open} className="avvistedageroversikt">
                        <Accordion.Header onClick={() => {
                            setOpen(!open)
                            midtstill(accordionRef.current)
                        }}>
                            Dager NAV ikke utbetaler
                        </Accordion.Header>
                        <Accordion.Content>
                            <DagTabell dager={avvisteDager} />
                            <DagBeskrivelse dager={avvisteDager} />
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>

                <Vis hvis={heltAvvist} render={() =>
                    <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                } />
            </Ekspanderbar>
        </Accordion>
    )
}

export default AvvisteDager
