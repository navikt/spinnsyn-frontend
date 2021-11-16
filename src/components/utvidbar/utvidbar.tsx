import Chevron from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { logEvent } from '../amplitude/amplitude'
import Vis from '../vis'

interface UtvidbarProps {
    erApen: boolean;
    tittel: React.ReactNode | string;
    systemtittel?: React.ReactNode | string;
    children: React.ReactNode;
    ikon?: string;
    ikonHover?: string;
    ikonAltTekst?: string;
    className?: string;
    visLukk?: boolean;
    type?: 'intern' | 'info' | 'integrert' | undefined;
    fixedHeight?: boolean;
    heading?: string;
}

const Utvidbar = (props: UtvidbarProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ erApen, setErApen ] = useState<boolean>(isServer || props.erApen)

    const utvidbar = useRef<HTMLDivElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)
    const heading = !props.heading ? 'h3' : props.heading

    const åpne = () => {
        if (window) {
            if (props.type !== undefined) {
                logEvent('panel åpnet', { 'component': props.tittel })
            } else { // unngår å logge beløp og sykepengedager ved åpning av hovedpanelene
                logEvent('panel åpnet', { 'component': props.systemtittel })
            }
            midtstill()
            utvidbar.current!.focus()
        }
    }

    const onButtonClick = () => {
        if (!erApen) {
            if (window) {
                if (props.type !== undefined) {
                    logEvent('panel åpnet', { 'component': props.tittel })
                } else { // unngår å logge beløp og sykepengedager ved åpning av hovedpanelene
                    logEvent('panel åpnet', { 'component': props.systemtittel })
                }
                midtstill()
                utvidbar.current!.focus()
            }
        } else {
            åpne()
        }
        setErApen(!erApen)
    }

    const midtstill = () => {
        setTimeout(() => {
            if (!utvidbar.current) {
                return
            }
            const winhight = window.innerHeight
            const position = utvidbar.current!.getBoundingClientRect()

            let top
            if (position.height >= winhight) {
                top = position.top + window.scrollY
            } else {
                top = position.top - ((winhight - position.height) / 2) + window.scrollY
            }
            window.scrollTo({ top: top, left: 0, behavior: 'smooth' })
        }, 300)
    }

    return (
        <div ref={utvidbar} tabIndex={-1}
            className={
                'utvidbar' +
                (props.className ? ' ' + props.className : '') +
                (props.type ? ' ' + props.type : '') +
                (erApen ? ' apen' : '')
            }
        >
            <button aria-expanded={erApen}
                onMouseEnter={props.ikon !== undefined ? () => btnImage.current!.src = props.ikonHover! : undefined}
                onMouseLeave={props.ikon !== undefined ? () => btnImage.current!.src = props.ikon! : undefined}
                onClick={onButtonClick}
                type={'button'}
                className="utvidbar__toggle"
            >
                <Vis hvis={props.ikon !== undefined}
                    render={() =>
                        <img aria-hidden="true" className="utvidbar__ikon"
                            ref={btnImage}
                            alt={props.ikonAltTekst}
                            src={props.ikon}
                        />
                    }
                />
                <Vis hvis={props.type === undefined}
                    render={() =>
                        <div className="utvidbar__tittel">
                            <Systemtittel tag={heading}>{props.tittel}</Systemtittel>
                            <Normaltekst className="utvidbar__tekst">{props.systemtittel}</Normaltekst>
                        </div>
                    }
                />
                <Vis hvis={props.type === 'integrert'}
                    render={() =>
                        <div className="utvidbar__tittel">
                            <Systemtittel tag={heading}>
                                {props.tittel}<br />
                                <Normaltekst tag="span" className="utvidbar__tekst">{props.systemtittel}</Normaltekst>
                            </Systemtittel>
                        </div>
                    }
                />
                <Vis hvis={props.type === 'intern'}
                    render={() =>
                        <Normaltekst tag={heading} className="utvidbar__tittel">{props.tittel}</Normaltekst>
                    }
                />
                <Vis hvis={props.type === 'info'}
                    render={() =>
                        <Normaltekst tag={heading} className="utvidbar__tittel">{props.tittel}</Normaltekst>
                    }
                />
                <span className="utvidbar__handling">
                    <Chevron type={erApen ? 'opp' : 'ned'} />
                </span>
            </button>

            <div className={'utvidbar__innholdContainer' + (erApen ? ' apen' : '')}
                style={{ maxHeight: erApen ? '10000px' : '0' }}
            >
                <div className="utvidbar__innhold">
                    {props.children}
                    <Vis hvis={props.visLukk}
                        render={() =>
                            <div className="lenkerad">
                                <button type="button" className="lenke" aria-pressed={!erApen}
                                    tabIndex={(erApen ? null : -1) as any}
                                    onClick={onButtonClick}
                                >
                                    <Normaltekst tag="span">
                                        {props.type === 'intern' ? 'Skjul' : 'Lukk'}
                                    </Normaltekst>
                                </button>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Utvidbar
