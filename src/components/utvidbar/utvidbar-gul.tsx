import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { utvidbarKlikk, UtvidbarProps } from './utvidbar-utils'

const UtvidbarGul = (props: UtvidbarProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ erApen, setErApen ] = useState<boolean>(isServer || props.erApen)
    const utvidbar = useRef<HTMLDivElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)

    const onButtonClick = () => {
        utvidbarKlikk(erApen, utvidbar, 'UtvidbarGul')
        setErApen(!erApen)
    }

    const tittel = <>
        <img aria-hidden="true" className="utvidbar__ikon"
            ref={btnImage}
            src="/syk/sykepenger/static/img/ikon-varselboble.svg"
            alt=""
        />
        <div>{props.tittel}</div>
    </>

    return (
        <div ref={utvidbar}>
            <Ekspanderbartpanel
                tittel={tittel}
                onClick={onButtonClick}
                onMouseEnter={() => btnImage.current!.src = '/syk/sykepenger/static/img/ikon-varselboble-hover.svg'}
                onMouseLeave={() => btnImage.current!.src = '/syk/sykepenger/static/img/ikon-varselboble.svg'}
                className={'utvidbarNy gul' + (erApen ? ' apen' : '')}
            >
                {props.children}
            </Ekspanderbartpanel>
        </div>
    )
}

export default UtvidbarGul
