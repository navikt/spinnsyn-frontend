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
        <Accordion.Item
            open={open}
            className="beregning"
            style={
                {
                    '--ac-accordion-header-bg': open
                        ? 'var(--a-surface-action-subtle)'
                        : 'var(--a-surface-transparent)',
                    '--ac-accordion-header-bg-hover': open
                        ? 'var(--a-surface-action-subtle)'
                        : 'var(--a-surface-hover)',
                } as React.CSSProperties
            }
        >
            <Accordion.Header onClick={onButtonClick}>
                <Heading size="small" level="3">
                    {tekst('utbetaling.person.når')}
                </Heading>
            </Accordion.Header>

            <Accordion.Content className="bg-white py-4">
                <BodyLong>
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
