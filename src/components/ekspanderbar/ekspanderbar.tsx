import { Accordion, BodyShort, Button } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import Vis from '../vis'
import { ekspanderbarKlikk, EkspanderProps } from './ekspander-utils'

interface TypeProps {
    type: string
    erUgyldig?: boolean
}

type AllProps = EkspanderProps & TypeProps

const ugyldigType = 'ugyldig'

const Ekspanderbar = (props: AllProps) => {
    const isServer = useContext(ArkiveringContext)
    const [erApen, setErApen] = useState<boolean>(isServer || props.erApen)
    const ekspanderbar = useRef<HTMLDivElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)

    const onButtonClick = (klikksted: 'lukk tekst' | 'header') => {
        ekspanderbarKlikk(
            erApen,
            ekspanderbar,
            'Ekspanderbar ' + props.type!.charAt(0).toUpperCase() + props.type!.slice(1).toLowerCase(),
            klikksted
        )
        setErApen(!erApen)
    }

    const tittel = (
        <>
            <Vis
                hvis={props.ikon}
                render={() => (
                    <img aria-hidden="true" className="ekspanderbar__ikon" ref={btnImage} src={props.ikon} alt="" />
                )}
            />
            {props.tittel}
        </>
    )

    const hentType = () => {
        if (props.erUgyldig) {
            return ugyldigType
        }
        return props.type
    }

    return (
        <Accordion ref={ekspanderbar}>
            <Accordion.Item
                open={erApen}
                className={`ekspanderbar ${hentType()}${props.className ? ' ' + props.className : ''}`}
            >
                <Accordion.Header
                    onClick={() => onButtonClick('header')}
                    onMouseEnter={() =>
                        (btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}-hover.svg`)
                    }
                    onMouseLeave={() =>
                        (btnImage.current!.src = `/syk/sykepenger/static/img/ikon-ekspander-${props.type}.svg`)
                    }
                >
                    {tittel}
                    <BodyShort as="span" className="open-text">
                        {erApen ? 'Lukk' : 'Åpne'}
                    </BodyShort>
                </Accordion.Header>
                <Accordion.Content className="ekspanderbar__innhold">
                    {props.children}
                    <div className="knapperad">
                        <Button variant="tertiary" size="small" onClick={() => onButtonClick('lukk tekst')}>
                            {erApen ? 'Lukk' : 'Åpne'}
                        </Button>
                    </div>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
    )
}

export default Ekspanderbar
