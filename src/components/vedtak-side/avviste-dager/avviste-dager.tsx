import { Accordion, BodyLong, BodyShort, Button, Heading } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { ekspanderbarKlikk } from '../../ekspanderbar/ekspander-utils'
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
    const isServer = useContext(ArkiveringContext)
    const [ open, setOpen ] = useState<boolean>(isServer)
    const accordionRef = useRef(null)

    const avvisteDagerTekst = avvisteDager.length > 1 || avvisteDager.length < 1
        ? ' sykepengedager'
        : ' sykepengedag'

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Dager NAV ikke utbetaler')
        setOpen(!open)
    }

    return (
        <Ekspanderbar type="gul" erUgyldig={vedtak.revurdert || vedtak.annullert}
            ikon="/syk/sykepenger/static/img/ikon-ekspander-gul.svg"
            erApen={apen}
            tittel={
                <div className="ekspanderbar__tittel">
                    <Heading size="large" level="2">
                        {avvisteDager.length + avvisteDagerTekst}
                        <BodyShort as="span">
                            {tekst('avviste.dager.dekkes.ikke')}
                        </BodyShort>
                    </Heading>
                </div>
            }
        >
            <div className="tekstinfo">
                <BodyLong spacing>{tekst('avviste.dager.intro')}</BodyLong>
            </div>

            <Vis hvis={heltAvvist} render={() =>
                <InntektInfo vedtak={vedtak} />
            } />

            <Accordion>
                <Accordion.Item ref={accordionRef} open={open} className="avvistedageroversikt">
                    <Accordion.Header onClick={onButtonClick}>
                        <Heading size="small" level="4">
                            Dager NAV ikke utbetaler
                        </Heading>
                    </Accordion.Header>
                    <Accordion.Content>
                        <DagTabell dager={avvisteDager} />

                        <DagBeskrivelse dager={avvisteDager} />

                        <div className="knapperad">
                            <Button variant="tertiary" size="small" onClick={onButtonClick}>
                                Skjul
                            </Button>
                        </div>
                    </Accordion.Content>
                </Accordion.Item>

                <Vis hvis={heltAvvist} render={() =>
                    <BeregningInfo vedtak={vedtak} mottaker={'refusjon'} />
                } />
            </Accordion>

        </Ekspanderbar>
    )
}

export default AvvisteDager
