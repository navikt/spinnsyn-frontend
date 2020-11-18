import './annullering.less'

import parser from 'html-react-parser'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { tekst } from '../../../utils/tekster'
import SkrivIkon from './ikon-skriv-til-oss.svg'

const AnnulleringsInfo = () => {
    return (
        <div className="annullering">
            <AlertStripeAdvarsel>{tekst('annullering.alert')}</AlertStripeAdvarsel>
            <Utvidbar erApen={true} type="info" tittel={tekst('annullering.info.header')}
            >
                <Normaltekst>
                    {parser(tekst('annullering.info.body'))}
                    <div className="link__med__ikon">
                        <span><img alt="" src={SkrivIkon} /></span>
                        <Lenke href={tekst('behandling.lenke.url')}>{tekst('annullering.info.skriv-til-oss')}</Lenke>
                    </div>
                </Normaltekst>
            </Utvidbar>
        </div>
    )
}

export default AnnulleringsInfo
