import { Alert, BodyLong, BodyShort, Heading, Label, Link, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Chat2Icon } from '@navikt/aksel-icons'

import { tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'
import { parserWithReplace } from '../../../utils/html-react-parser-utils'
import { logEvent } from '../../amplitude/amplitude'

const RevurdertAlert = () => {
    return (
        <Alert variant="warning">
            <BodyShort>{`${tekst('revurdert.alert.tekst')}`}</BodyShort>
            <Link href={tekst('revurdert.alert.link.url')}>{tekst('revurdert.alert.link.tekst')}</Link>
        </Alert>
    )
}

const AnnullertAlert = () => {
    return (
        <Alert variant="warning">
            <Heading spacing level="2" size="small">
                {parserWithReplace(tekst('annullert.alert.header'))}
            </Heading>
            <BodyShort spacing>{parserWithReplace(tekst('annulert.alert.tekst'))}</BodyShort>
            <BodyShort spacing>{parserWithReplace(tekst('annulert.alert.undertekst'))}</BodyShort>
        </Alert>
    )
}

const AnnulleringsInfo = ({ vedtak }: VedtakProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)
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

    const revurdertOgIkkeAnnullert = vedtak.revurdert && !vedtak.annullert
    return (
        <>
            {revurdertOgIkkeAnnullert && <RevurdertAlert />}

            {vedtak.annullert && <AnnullertAlert />}

            <ReadMore
                className="my-10"
                header={tekst('annullert.info.header')}
                open={expanded}
                onClick={() => {
                    logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                        tittel: tekst('annullert.info.header'),
                        component: 'AnnulleringsInfo',
                    })
                    setExpanded((prev) => !prev)
                }}
            >
                <div className="pt-4" data-testid="annullering-info">
                    {revurdertOgIkkeAnnullert && (
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

                    <Link href="https://innboks.nav.no/s/skriv-til-oss?category=Helse" target="_blank">
                        <Chat2Icon title="Skriv til oss" className="inline" fontSize="var(--a-font-size-large)" />
                        {tekst('annullert.info.skriv-til-oss')}
                    </Link>
                </div>
            </ReadMore>
        </>
    )
}

export default AnnulleringsInfo
