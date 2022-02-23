import { Alert, BodyLong, BodyShort, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import EkspanderbarInfo from '../../ekspanderbar/ekspanderbar-info'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'


const RevurdertAlert = () => {
    return (
        <Alert variant="warning">
            <Label spacing>{parser(tekst('revurdert.alert.header'))}</Label>
            <BodyShort spacing size="small">
                {parser(tekst('revurdert.alert.tekst'))}
            </BodyShort>

            <Link href={tekst('revurdert.alert.link.url')}>
                <BodyLong size="small">
                    {tekst('revurdert.alert.link.tekst')}
                </BodyLong>
            </Link>
        </Alert>
    )
}

const AnnullertAlert = () => {
    return (
        <Alert variant="warning">
            <Label spacing>{parser(tekst('annullert.alert.header'))}</Label>
            <BodyShort spacing size="small">
                {parser(tekst('annulert.alert.tekst'))}
            </BodyShort>
            <BodyShort spacing size="small">
                {parser(tekst('annulert.alert.undertekst'))}
            </BodyShort>
        </Alert>
    )
}

const AnnulleringsInfo = ({ vedtak }: VedtakProps) => {

    return (
        <div className="annullering">

            <Vis hvis={vedtak.revurdert} render={() =>
                <RevurdertAlert />
            } />

            <Vis hvis={vedtak.annullert} render={() =>
                <AnnullertAlert />
            } />

            <EkspanderbarInfo erApen={true} tittel={parser(tekst('annullert.info.header'))}>
                <BodyLong as="div">
                    {parser(tekst('annullert.info.body'))}
                </BodyLong>

                <div className="link__med__ikon">
                    <img alt="" src={'/syk/sykepenger/static/img/ikon-skriv-til-oss.svg'} />
                    <Link href={tekst('behandling.lenke.url')}>
                        <BodyShort as="span">
                            {tekst('annullert.info.skriv-til-oss')}
                        </BodyShort>
                    </Link>
                </div>
            </EkspanderbarInfo>
        </div>
    )
}

export default AnnulleringsInfo
