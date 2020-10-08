import './uenig.less'

import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../../data/stores/app-store'
import { tekst } from '../../../utils/tekster'
import { klagefrist } from '../../../utils/vedtak-utils'

const Uenig = () => {
    const { valgtVedtak } = useAppStore()

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
                <Lenke href={tekst('uenig.lenke2.url')} target="_blank">
                    {tekst('uenig.lenke2')}
                </Lenke>.
            </Normaltekst>
            <Element className="uenig__klagefrist">{'Klagefrist: ' + klagefrist(valgtVedtak)}</Element>
        </div>
    )
}

export default Uenig
