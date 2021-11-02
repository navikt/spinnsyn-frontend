import Lenke from 'nav-frontend-lenker'
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import { klagefrist } from '../../../utils/vedtak-utils'
import { logEvent } from '../../amplitude/amplitude'
import { VedtakProps } from '../vedtak'

const Uenig = ({ vedtak }: VedtakProps) => {
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
                <Lenke href={tekst('uenig.lenke2.url')}
                    target="_blank"
                    onClick={() => logEvent('navigere', {
                        destinasjon: tekst('uenig.lenke2.url'),
                        skjemanavn: 'vedtak'
                    })}
                >
                    {tekst('uenig.lenke2')}
                </Lenke>.
            </Normaltekst>
            <Element className="uenig__klagefrist">{'Klagefrist: ' + klagefrist(vedtak)}</Element>
        </div>
    )
}

export default Uenig
