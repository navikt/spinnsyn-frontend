import Chevron from 'nav-frontend-chevron'
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi'
import React, { useEffect, useRef, useState } from 'react'

import { erSynligIViewport } from '../../utils/browser-utils'
import { useAmplitudeInstance } from '../amplitude/amplitude'
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
    const { logEvent } = useAmplitudeInstance()
    const [ erApen, setErApen ] = useState<boolean>(props.erApen)
    const [ innholdHeight, setInnholdHeight ] = useState<number>(0)

    const utvidbar = useRef<HTMLDivElement>(null)
    const btnImage = useRef<HTMLImageElement>(null)
    const innhold = useRef<HTMLDivElement>(null)

    const heading = !props.heading ? 'h3' : props.heading

    useEffect(() => {
        setErApen(props.erApen)
        setInnholdHeight(
            props.fixedHeight
                ? 10000
                : innhold.current!.offsetHeight
        )
        // eslint-disable-next-line
    }, [innhold.current])

    const åpne = (top: number) => {
        if (props.type !== undefined) {
            logEvent('panel åpnet', { 'component': props.tittel })
        } else { // unngår å logge beløp og sykepengedager ved åpning av hovedpanelene
            logEvent('panel åpnet', { 'component': props.systemtittel })
        }
        window.scrollTo({ left: 0, top: top, behavior: 'smooth' })
        utvidbar.current!.focus()
    }

    const lukke = () => {
        if (!erApen) {
            const top = utvidbar.current!.getBoundingClientRect().top + window.scrollY
            const header = document.querySelector('.sticky-placeholder') as HTMLElement
            let sticky = 0
            if (header !== null && erSynligIViewport(header)) {
                sticky = 106
            }
            const pad = 20
            window.scrollTo({ left: 0, top: top - sticky - pad, behavior: 'smooth' })
        }
    }

    const onButtonClick = () => {
        const top = utvidbar.current!.getBoundingClientRect().top + window.scrollY - 20

        if (!erApen) {
            if (props.type !== undefined) {
                logEvent('panel åpnet', { 'component': props.tittel })
            } else { // unngår å logge beløp og sykepengedager ved åpning av hovedpanelene
                logEvent('panel åpnet', { 'component': props.systemtittel })
            }
            window.scrollTo({ left: 0, top: top, behavior: 'smooth' })
            utvidbar.current!.focus()
        } else {
            åpne(top)
        }
        setErApen(!erApen)
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
                onTransitionEnd={lukke}
                style={{ maxHeight: erApen ? (innholdHeight * 2) + 'px' : '0' }}
            >
                <div ref={innhold} className="utvidbar__innhold">
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
