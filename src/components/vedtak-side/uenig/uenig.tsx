import Lenke from 'nav-frontend-lenker'
import { Element,Normaltekst, Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { getLedetekst, tekst } from '../../../utils/tekster'
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
                {getLedetekst(tekst('uenig.tekst1'), { '%KLAGEFRIST%': klagefrist(vedtak) })}
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

            <div className="egen-klagefrist">
                <Element className="egen__klagefrist__tittel">
                    {tekst('uenig.egenklagefrist.tittel')}
                </Element>
                <Normaltekst>
                    {tekst('uenig.egenklagefrist.tekst')}
                </Normaltekst>
            </div>
        </div>
    )
}

export default Uenig
