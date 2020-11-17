import './annullering.less'

import parser from 'html-react-parser'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import Lenke from 'nav-frontend-lenker'
import { Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import Utvidbar from '../../../components/utvidbar/utvidbar'
import { tekst } from '../../../utils/tekster'
import SkrivIkon from '../lokale-lenker/ikon-hodetelefon.svg' // bytt til riktig ikon når vi får det fra bendik

const AnnulleringsInfo = () => {
    return (
        <div className="annullering">
            <AlertStripeAdvarsel>{tekst('annullering.alert')}</AlertStripeAdvarsel>
            <Utvidbar erApen={true} type="info" tittel={tekst('annullering.info.header')}
            >
                <Normaltekst>
                    {parser(tekst('annullering.info.body'))}
                    <div className="link__med__ikon">
                        <span><img aria-hidden="true" src={SkrivIkon} alt="Skriv" /></span>
                        <Lenke href="#">{tekst('annullering.info.skriv-til-oss')}</Lenke>
                    </div>
                </Normaltekst>
            </Utvidbar>
        </div>
    )
}

export default AnnulleringsInfo
