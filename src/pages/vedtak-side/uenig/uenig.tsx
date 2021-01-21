import './uenig.less'

import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAmplitudeInstance } from '../../../components/amplitude/amplitude'
import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { klagefrist } from '../../../utils/vedtak-utils'
import { useAmplitudeInstance } from '../../../components/amplitude/amplitude'

const Uenig = () => {
    const { valgtVedtak } = useAppStore()
    const { logEvent } = useAmplitudeInstance()

    function naviger(url: string) {
        logEvent('navigere', { destinasjon: url, skjemanavn: 'vedtak' })
        window.open(url, '_blank')
    }

    return (
        <div className="uenig">
            <Undertittel className="uenig__tittel">
                {tekst('uenig.tittel')}
            </Undertittel>
            <Normaltekst>
                {tekst('uenig.tekst1')}
                {tekst('uenig.tekst2')}
                <Lenke href={tekst('uenig.lenke1.url')} target="_blank">
                    {tekst('uenig.lenke1')}
                </Lenke>,
                {tekst('uenig.tekst3')}
                <button type="button" className="lenke" onClick={() => naviger(tekst('uenig.lenke2.url'))}>{tekst('uenig.lenke2')}</button>.
            </Normaltekst>
            <Element className="uenig__klagefrist">{'Klagefrist: ' + klagefrist(valgtVedtak)}</Element>
        </div>
    )
}

export default Uenig
