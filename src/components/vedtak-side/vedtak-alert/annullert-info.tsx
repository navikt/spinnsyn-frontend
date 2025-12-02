import { Alert, BodyLong, BodyShort, Heading, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Chat2Icon } from '@navikt/aksel-icons'

import { logEvent } from '../../umami/umami'
import { LenkeMedUmami } from '../../lenke/lenke-med-umami'

const AnnullertAlert = () => {
    return (
        <Alert variant="warning">
            <Heading spacing level="2" size="small">
                Til din informasjon
            </Heading>
            <BodyShort spacing>Av tekniske årsaker er saken din flyttet til et annet saksbehandlingssystem.</BodyShort>
            <BodyShort spacing>Dersom det er endringer i tidligere vedtak, får du et eget vedtak om dette.</BodyShort>
        </Alert>
    )
}

export const AnnullertInfo = () => {
    const [expanded, setExpanded] = useState<boolean>(false)
    return (
        <>
            <AnnullertAlert />
            <ReadMore
                className="my-10"
                header="Dette lurer mange på når vedtaket behandles på nytt"
                open={expanded}
                onClick={() => {
                    logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                        tittel: 'Dette lurer mange på når vedtaket behandles på nytt',
                        component: 'AnnulleringsInfo',
                    })
                    setExpanded((prev) => !prev)
                }}
            >
                <div className="pt-4" data-testid="annullering-info">
                    <>
                        <Heading spacing level="2" size="small">
                            Må jeg gjøre noe nå?
                        </Heading>
                        <BodyLong spacing>
                            Du trenger ikke gjøre noe. Hvis vi trenger flere opplysninger, tar en av våre saksbehandlere
                            kontakt med deg.
                        </BodyLong>
                        <BodyLong spacing>
                            <LenkeMedUmami
                                tekst="Skriv til oss om du har flere spørsmål"
                                url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                                icon={
                                    <Chat2Icon title="Skriv til oss" className="inline text-surface-action"></Chat2Icon>
                                }
                            />
                        </BodyLong>
                    </>
                </div>
            </ReadMore>
        </>
    )
}

export default AnnullertInfo
