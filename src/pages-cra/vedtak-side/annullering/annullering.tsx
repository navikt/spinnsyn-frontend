import parser from 'html-react-parser'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { tekst } from '../../../utils/tekster'

const AnnulleringsInfo = () => {
    return (
        <div className="annullering">
            <AlertStripeAdvarsel>{tekst('annullering.alert')}</AlertStripeAdvarsel>
            <Utvidbar erApen={true} type="info" tittel={tekst('annullering.info.header')} heading="h2">
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
            </Utvidbar>
        </div>
    )
}

export default AnnulleringsInfo
