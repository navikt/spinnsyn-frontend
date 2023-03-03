import { Accordion, Heading } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import DagTabell from '../../../dager/dag-tabell'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import Vis from '../../../vis'
import { ekspanderbarKlikk } from '../../../ekspanderbar/ekspander-utils'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { RSDag } from '../../../../types/rs-types/rs-vedtak'

interface SykepengerPerDagProps {
    dager: RSDag[]
    type: 'Personutbetaling' | 'Refusjon'
}

export const SykepengerPerDag = ({ dager, type }: SykepengerPerDagProps) => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)
    const accordionRef = useRef(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Sykepenger per dag')
        setOpen(!open)
    }

    return (
        <Vis
            hvis={dager.length > 0}
            render={() => (
                <Accordion.Item ref={accordionRef} open={open} className="utbetalingsoversikt">
                    <Accordion.Header onClick={onButtonClick}>
                        <Heading size="small" level="3">
                            {tekst('utbetaling.inntekt.info.dagsats')}
                        </Heading>
                    </Accordion.Header>
                    <Accordion.Content>
                        <DagTabell dager={dager} type={type} />

                        <DagBeskrivelse dager={dager} type={type} />
                    </Accordion.Content>
                </Accordion.Item>
            )}
        />
    )
}
