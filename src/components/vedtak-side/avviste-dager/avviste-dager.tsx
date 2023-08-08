import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
}

const AvvisteDager = ({ avvisteDager, vedtak }: AvvisteDagerProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(arkivering)

    const avvisteDagerTekst = avvisteDager.length === 1 ? ' sykepengedag' : ' sykepengedager'

    const onButtonClick = () => {
        setOpen(!open)
    }

    return (
        <VedtakExpansionCard
            ariaLabel="Avviste sykepengedager"
            tittel={avvisteDager.length + avvisteDagerTekst}
            undertittel={tekst('avviste.dager.dekkes.ikke')}
            vedtak={vedtak}
        >
            <BodyLong spacing>{tekst('avviste.dager.intro')}</BodyLong>

            <Accordion>
                <Accordion.Item open={open} data-cy="avvistedageroversikt">
                    <Accordion.Header onClick={onButtonClick}>
                        <Heading size="small" level="3">
                            Dager NAV ikke utbetaler
                        </Heading>
                    </Accordion.Header>
                    <Accordion.Content className="bg-white p-0">
                        <DagTabell dager={avvisteDager} />

                        <DagBeskrivelse dager={avvisteDager} />
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </VedtakExpansionCard>
    )
}

export default AvvisteDager
