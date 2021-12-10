import parser from 'html-react-parser'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import EkspanderbarInfo from '../../ekspanderbar/ekspanderbar-info'

const AnnulleringsInfo = () => {
    return (
        <div className="annullering">
            <AlertStripeAdvarsel>{tekst('annullering.alert')}</AlertStripeAdvarsel>

            <EkspanderbarInfo
                erApen={true}
                tittel={tekst('annullering.info.header')}
            >
                <Normaltekst tag="div">
                    {parser(tekst('annullering.info.body'))}
                </Normaltekst>
                <div className="link__med__ikon">
                    <span><img alt="" src={'/syk/sykepenger/static/img/ikon-skriv-til-oss.svg'} /></span>
                    <Lenke href={tekst('behandling.lenke.url')}>
                        <Normaltekst tag="span">
                            {tekst('annullering.info.skriv-til-oss')}
                        </Normaltekst>
                    </Lenke>
                </div>
            </EkspanderbarInfo>
        </div>
    )
}

export default AnnulleringsInfo
