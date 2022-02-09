import { Accordion, BodyLong, Button } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { ekspanderbarKlikk, EkspanderProps } from './ekspander-utils'

const EkspanderbarIntern = (props: EkspanderProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ erApen, setErApen ] = useState<boolean>(isServer || props.erApen)
    const ekspanderbar = useRef<HTMLDivElement>(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(erApen, ekspanderbar, props.tittel?.toString() || 'Ekspanderbar intern')
        setErApen(!erApen)
    }

    return (
        <Accordion ref={ekspanderbar}>
            <Accordion.Item open={erApen}
                className={`ekspanderbar intern${props.className ? ' ' + props.className : ''}`}
            >
                <Accordion.Header onClick={onButtonClick}>
                    <BodyLong spacing size="small">{props.tittel}</BodyLong>
                </Accordion.Header>
                <Accordion.Content>
                    {props.children}
                    <div className="knapperad">
                        <Button variant="tertiary" size="small" onClick={() => setErApen(!erApen)}>
                            Skjul
                        </Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default EkspanderbarIntern
