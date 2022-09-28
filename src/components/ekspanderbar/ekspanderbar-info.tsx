import { Accordion, Heading } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { ekspanderbarKlikk, EkspanderProps } from './ekspander-utils'

const EkspanderbarInfo = (props: EkspanderProps) => {
    const isServer = useContext(ArkiveringContext)
    const [erApen, setErApen] = useState<boolean>(isServer || props.erApen)
    const ekspanderbar = useRef<HTMLDivElement>(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(erApen, ekspanderbar, 'Ekspanderbar info')
        setErApen(!erApen)
    }

    return (
        <Accordion ref={ekspanderbar}>
            <Accordion.Item
                open={erApen}
                className={`ekspanderbar info${props.className ? ' ' + props.className : ''}`}
            >
                <Accordion.Header onClick={onButtonClick}>
                    <Heading level={'2'} size={'small'}>
                        {props.tittel}
                    </Heading>
                </Accordion.Header>
                <Accordion.Content className="ekspanderbar__innhold">{props.children}</Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default EkspanderbarInfo
