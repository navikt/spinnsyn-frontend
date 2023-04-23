import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { tekst } from '../../../../utils/tekster'
import { LenkeMedAmplitude } from '../../../lenke/lenke-med-amplitude'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { parserWithReplace } from '../../../../utils/html-react-parser-utils'

export const SykepengerNar = () => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)

    const onButtonClick = () => {
        setOpen(!open)
    }

    return (
        <Accordion.Item open={open} className="beregning">
            <Accordion.Header onClick={onButtonClick}>
                <Heading size="small" level="3">
                    {tekst('utbetaling.person.når')}
                </Heading>
            </Accordion.Header>

            <Accordion.Content className="bg-white pb-0">
                <BodyLong spacing>
                    {parserWithReplace(tekst('utbetaling.person.når.innhold'))}
                    <LenkeMedAmplitude
                        url={tekst('utbetaling.person.når.lenke.url')}
                        tekst={tekst('utbetaling.person.når.lenke.tekst')}
                    />
                </BodyLong>
            </Accordion.Content>
        </Accordion.Item>
    )
}
