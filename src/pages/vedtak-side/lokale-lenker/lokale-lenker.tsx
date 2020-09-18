import './lokale-lenker.less'

import { LenkepanelBase } from 'nav-frontend-lenkepanel'
import { Element, Innholdstittel } from 'nav-frontend-typografi'
import React, { SyntheticEvent } from 'react'
import { useLocation } from 'react-router-dom'

import HandImg from '../../../components/teaser/hand.svg'
import { useAppStore } from '../../../data/stores/app-store'
import LedningImg from './ledning.svg'

const LokaleLenker = () => {
    const {
        apenUtbetaling, setApenUtbetaling,
        apenSykefravaer, setApenSykefravaer,
        apenSykmeldt, setApenSykmeldt
    } = useAppStore()
    const location = useLocation()

    const klikkUtbetaling = (e: SyntheticEvent) => {
        e.preventDefault()
        setApenUtbetaling(!apenUtbetaling)
    }

    const klikkSykmeldt = (e: SyntheticEvent) => {
        e.preventDefault()
        setApenSykmeldt(!apenSykmeldt)
    }

    const klikkSykefravaer = (e: SyntheticEvent) => {
        e.preventDefault()
        setApenSykefravaer(!apenSykefravaer)
    }

    return (
        <div className="lokale-lenker">
            <LenkepanelBase href={location.pathname}
                onClick={klikkUtbetaling}
                className="brutto-belop" border role="button"
            >
                <img src={HandImg} alt="" className="lokale-lenker__ikon" />
                <Element tag="h2">
                    Brutto sykepengebeløp
                </Element>
                <Innholdstittel tag="p" className="lokale-lenker__detalj">
                    12 580 kr
                </Innholdstittel>
            </LenkepanelBase>
            <LenkepanelBase href={location.pathname}
                onClick={klikkSykmeldt}
                className="dager-sykmeldt" border role="button"
            >
                <img src={LedningImg} alt="" className="lokale-lenker__ikon" />
                <Element tag="h2">
                    Dager sykmeldt
                </Element>
                <Innholdstittel tag="p" className="lokale-lenker__detalj">
                    14
                </Innholdstittel>
            </LenkepanelBase>
            <LenkepanelBase href={location.pathname}
                onClick={klikkSykefravaer}
                className="sykedager" border role="button"
            >
                <img src={LedningImg} alt="" className="lokale-lenker__ikon" />
                <Element tag="h2">
                    Gjenstående sykedager
                </Element>
                <Innholdstittel tag="p" className="lokale-lenker__detalj">
                    189
                </Innholdstittel>
            </LenkepanelBase>
        </div>
    )
}

export default LokaleLenker
