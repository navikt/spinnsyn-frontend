import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { ArkiveringContext } from '../../../context/arkivering-context'
import { RSDag, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { tekst } from '../../../utils/tekster'
import DagBeskrivelse from '../../dager/dag-beskrivelse'
import DagTabell from '../../dager/dag-tabell'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import Vis from '../../vis'
import BeregningInfo from '../utbetaling/accordion/beregning-info'
import InntektInfo from '../utbetaling/accordion/inntekt-info/inntekt-info'

interface AvvisteDagerProps {
    avvisteDager: RSDag[]
    vedtak: RSVedtakWrapper
    heltAvvist: boolean
}

const AvvisteDager = ({ avvisteDager, vedtak, heltAvvist }: AvvisteDagerProps) => {
    const arkivering = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(arkivering)

    const harMinstEnForLavInntektDag =
        avvisteDager.filter((dag) => dag.begrunnelser.includes('MinimumInntekt')).length > 0

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
                <Vis hvis={heltAvvist && harMinstEnForLavInntektDag} render={() => <InntektInfo vedtak={vedtak} />} />

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

                <Vis
                    hvis={heltAvvist && harMinstEnForLavInntektDag}
                    render={() => <BeregningInfo vedtak={vedtak} mottaker="refusjon" heltAvvist={heltAvvist} />}
                />
            </Accordion>
        </VedtakExpansionCard>
    )
}

export default AvvisteDager
