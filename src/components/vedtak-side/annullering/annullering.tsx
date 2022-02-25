import { Alert, BodyLong, BodyShort, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import EkspanderbarInfo from '../../ekspanderbar/ekspanderbar-info'

const AnnulleringsInfo = () => {
    return (
        <div className="annullering">
            <Alert variant="warning">{tekst('annullering.alert')}</Alert>

            <EkspanderbarInfo
                erApen={true}
                tittel={tekst('annullering.info.header')}
            >
                <BodyLong as="div">
                    {parser(tekst('annullering.info.body'))}
                </BodyLong>
                <div className="link__med__ikon">
                    <img alt="" src={'/syk/sykepenger/static/img/ikon-skriv-til-oss.svg'} />
                    <Link href={tekst('behandling.lenke.url')}>
                        <BodyShort as="span">
                            {tekst('annullering.info.skriv-til-oss')}
                        </BodyShort>
                    </Link>
                </div>
            </EkspanderbarInfo>
        </div>
    )
}

export default AnnulleringsInfo
