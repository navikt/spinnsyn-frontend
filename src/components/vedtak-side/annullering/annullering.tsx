import { Alert, BodyLong, BodyShort, Heading, Label, Link } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { tekst } from '../../../utils/tekster'
import EkspanderbarInfo from '../../ekspanderbar/ekspanderbar-info'
import Vis from '../../vis'
import { VedtakProps } from '../vedtak'

const RevurdertAlert = () => {
    return (
        <Alert variant="warning">
            <Heading spacing level={'2'} size={'small'}>
                {parser(tekst('revurdert.alert.header'))}
            </Heading>
            <BodyShort spacing>{parser(tekst('revurdert.alert.tekst'))}</BodyShort>

            <Link className="alert-link-listevisning" href={tekst('revurdert.alert.link.url')}>
                <BodyLong>{tekst('revurdert.alert.link.tekst')}</BodyLong>
            </Link>
        </Alert>
    )
}

const AnnullertAlert = () => {
    return (
        <Alert variant="warning">
            <Heading spacing level={'2'} size={'small'}>
                {parser(tekst('annullert.alert.header'))}
            </Heading>
            <BodyShort spacing>{parser(tekst('annulert.alert.tekst'))}</BodyShort>
            <BodyShort spacing>{parser(tekst('annulert.alert.undertekst'))}</BodyShort>
        </Alert>
    )
}

const AnnulleringsInfo = ({ vedtak }: VedtakProps) => {
    const erRefusjon = vedtak.sykepengebelopArbeidsgiver > 0
    const erBrukerutbetaling = vedtak.sykepengebelopPerson > 0

    const bodyFraUtbetalingstype = () => {
        if (erRefusjon && erBrukerutbetaling) {
            return tekst('annullert.info.body2.delvis-refusjon')
        } else if (erRefusjon) {
            return tekst('annullert.info.body2.refusjon')
        } else {
            return tekst('annullert.info.body2.brukerutbetaling')
        }
    }

    return (
        <div className="annullering">
            <Vis hvis={vedtak.revurdert} render={() => <RevurdertAlert />} />

            <Vis hvis={vedtak.annullert} render={() => <AnnullertAlert />} />

            <EkspanderbarInfo erApen={false} tittel={tekst('annullert.info.header')}>
                {vedtak.revurdert && (
                    <>
                        <Label>{tekst('annullert.info.header1')}</Label>
                        <BodyLong spacing>{tekst('annullert.info.body1')}</BodyLong>

                        <Label>{tekst('annullert.info.header2')}</Label>
                        <BodyLong spacing>{bodyFraUtbetalingstype()}</BodyLong>

                        <Label>{tekst('annullert.info.header3')}</Label>
                        <BodyLong spacing>{tekst('annullert.info.body3')}</BodyLong>
                    </>
                )}

                <Label>{tekst('annullert.info.header4')}</Label>
                <BodyLong spacing>{tekst('annullert.info.body4')}</BodyLong>

                <div className="link__med__ikon">
                    <img alt="" src={'/syk/sykepenger/static/img/ikon-skriv-til-oss.svg'} />
                    <Link href={tekst('behandling.lenke.url')}>
                        <BodyShort as="span">{tekst('annullert.info.skriv-til-oss')}</BodyShort>
                    </Link>
                </div>
            </EkspanderbarInfo>
        </div>
    )
}

export default AnnulleringsInfo
