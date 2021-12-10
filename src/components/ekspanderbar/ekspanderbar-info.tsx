import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Normaltekst } from 'nav-frontend-typografi'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { ekspanderbarKlikk, EkspanderProps } from './ekspander-utils'

const EkspanderbarInfo = (props: EkspanderProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ erApen, setErApen ] = useState<boolean>(isServer || props.erApen)
    const ekspanderbar = useRef<HTMLDivElement>(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(erApen, ekspanderbar, 'Ekspanderbar info')
        setErApen(!erApen)
    }

    return (
        <div ref={ekspanderbar}>
            <Ekspanderbartpanel
                tittel={<Normaltekst>{props.tittel}</Normaltekst>}
                onClick={onButtonClick}
                className={`ekspanderbar info${props.className ? ' ' + props.className : ''}`}
                apen={erApen}
            >
                {props.children}
            </Ekspanderbartpanel>
        </div>
    )
}

export default EkspanderbarInfo
