import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { ekspanderbarKlikk, EkspanderProps } from './ekspander-utils'

interface TypeProps {
    type: string
}

type AllProps = EkspanderProps & TypeProps

const Ekspanderbar = (props: AllProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ erApen, setErApen ] = useState<boolean>(isServer || props.erApen)
    const ekspanderbar = useRef<HTMLDivElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)

    const onButtonClick = () => {
        ekspanderbarKlikk(erApen, ekspanderbar,
            'Ekspanderbar ' +
            props.type!.charAt(0).toUpperCase() +
            props.type!.slice(1).toLowerCase()
        )
        setErApen(!erApen)
    }

    const tittel = <>
        <img aria-hidden="true" className="ekspanderbar__ikon"
            ref={btnImage}
            src={`/syk/sykepenger/static/img/ikon-ekspander-${props.type}.svg`}
            alt=""
        />
        <div>{props.tittel}</div>
    </>

    return (
        <div ref={ekspanderbar}>
            <Ekspanderbartpanel
                tittel={tittel}
                onClick={onButtonClick}
                onMouseEnter={() => btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}-hover.svg`}
                onMouseLeave={() => btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}.svg`}
                className={`ekspanderbar ${props.type}${props.className ? ' ' + props.className : ''}`}
                apen={erApen}
            >
                {props.children}
            </Ekspanderbartpanel>
        </div>
    )
}

export default Ekspanderbar
