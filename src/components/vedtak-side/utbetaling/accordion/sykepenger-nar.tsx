import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useContext, useRef, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import { LenkeMedAmplitude } from '../../../lenke/lenke-med-amplitude'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { ekspanderbarKlikk } from '../../../ekspanderbar/ekspander-utils'

export const SykepengerNar = () => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)
    const accordionRef = useRef(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Når får du sykepengene')
        setOpen(!open)
    }

    return (
        <Accordion.Item ref={accordionRef} open={open} className="beregning">
            <Accordion.Header onClick={onButtonClick}>
                <Heading size="small" level="3">
                    {tekst('utbetaling.person.når')}
                </Heading>
            </Accordion.Header>

            <Accordion.Content className="tekstinfo">
                <BodyLong spacing>
                    {parser(tekst('utbetaling.person.når.innhold'))}
                    <LenkeMedAmplitude
                        url={tekst('utbetaling.person.når.lenke.url')}
                        tekst={tekst('utbetaling.person.når.lenke.tekst')}
                    />
                </BodyLong>
            </Accordion.Content>
        </Accordion.Item>
    )
}
