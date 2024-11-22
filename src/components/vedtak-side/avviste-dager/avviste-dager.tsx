import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { useScroll } from '../../../context/scroll-context'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
}

const AvvisteDager = ({ avvisteDager, vedtak }: AvvisteDagerProps) => {
    const arkivering = useContext(ArkiveringContext)
    const { apneElementMedId, registrerElement } = useScroll()
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)
    const [visBegrunnelse, setVisBegrunnelse] = useState<boolean>(arkivering)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (apneElementMedId === 'dager_ikke_nav') {
            setVisBegrunnelse(true)
            setVisBeregning(true)
        }
    }, [apneElementMedId])

    useEffect(() => {
        if (elementRef.current !== null) {
            registrerElement('dager_ikke_nav', elementRef)
        }
    }, [elementRef?.current?.id, registrerElement])

    const avvisteDagerTekst = avvisteDager.length === 1 ? ' sykepengedag' : ' sykepengedager'

    return (
        <VedtakExpansionCard
            ariaLabel="Avviste sykepengedager"
            tittel={avvisteDager.length + avvisteDagerTekst}
            undertittel={tekst('avviste.dager.dekkes.ikke')}
            vedtak={vedtak}
            apne={visBeregning}
            setApne={setVisBeregning}
        >
            <BodyLong spacing>{tekst('avviste.dager.intro')}</BodyLong>

            <Accordion>
                <Accordion.Item
                    ref={elementRef}
                    open={visBegrunnelse}
                    onOpenChange={() => setVisBegrunnelse(!visBegrunnelse)}
                    data-cy="avvistedageroversikt"
                >
                    <Accordion.Header>
                        <Heading size="small" level="3">
                            Dager Nav ikke utbetaler
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
