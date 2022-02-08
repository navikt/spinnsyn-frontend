import { Accordion, BodyShort, Button } from '@navikt/ds-react'
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
        <>{props.tittel}</>
    </>

    return (
        <Accordion ref={ekspanderbar}>
            <Accordion.Item open={erApen}
                className={`ekspanderbar ${props.type}${props.className}`}
            >
                <Accordion.Header onClick={onButtonClick}
                    onMouseEnter={() => btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}-hover.svg`}
                    onMouseLeave={() => btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}.svg`}
                >
                    {tittel}
                    <BodyShort as="span" size="small" className="open-text">{erApen ? 'lukk' : 'åpne'}</BodyShort>
                </Accordion.Header>
                <Accordion.Content>
                    {props.children}
                    <div className="knapperad">
                        <Button variant="tertiary" size="small" onClick={() => setErApen(!erApen)}>
                            {erApen ? 'lukk' : 'åpne'}
                        </Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Ekspanderbar
