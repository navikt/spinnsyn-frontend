import { Alert, BodyLong, BodyShort, Heading, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'
import { Chat2Icon } from '@navikt/aksel-icons'

import { VedtakProps } from '../vedtak'
import { logEvent } from '../../amplitude/amplitude'
import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'

const RevurdertAlert = () => {
    return (
        <Alert variant="info">
            <BodyShort spacing>
                Vi har fått nye opplysninger i saken din og søknaden er vurdert på nytt. Dette svaret er erstattet av et
                annet og gjelder derfor ikke lenger.
            </BodyShort>
            <BodyShort spacing className="mt-8">
                Du finner nytt svar i <LenkeMedAmplitude tekst="oversikten på Ditt sykefravær" url="/syk/sykepenger" />.
                Du trenger ikke å gjøre noe.
            </BodyShort>
        </Alert>
    )
}

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

const RevurderingAnnuleringInfo = ({ vedtak }: VedtakProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)

    const revurdertOgIkkeAnnullert = vedtak.revurdert && !vedtak.annullert

    if (revurdertOgIkkeAnnullert) {
        return (
            <>
                <RevurdertAlert />
                <ReadMore
                    className="my-10"
                    header="Hvorfor søknaden blir vurdert på nytt"
                    open={expanded}
                    onClick={() => {
                        logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                            tittel: 'Hvorfor søknaden blir vurdert på nytt',
                            component: 'RevurderingInfo',
                        })
                        setExpanded((prev) => !prev)
                    }}
                >
                    <div className="pt-4">
                        <>
                            <BodyLong spacing>
                                Når vi får nye opplysninger om saken din, kan det påvirke sykepengene dine. Nye
                                opplysninger kan enten komme fra deg, den som har sykmeldt deg, eller fra arbeidsgiveren
                                din.
                            </BodyLong>
                            <BodyLong spacing>
                                Når det skjer, må vi vurdere søknaden på nytt for å være sikre på at du får riktig
                                utbetaling.
                            </BodyLong>
                            <BodyLong spacing>
                                Etter at vi har vurdert søknaden, får du et nytt svar. Dette svaret erstatter tidligere
                                svar fra oss, også hvis det ikke har skjedd noen endringer.
                            </BodyLong>
                            <BodyLong spacing>
                                Har du spørsmål til de nye opplysningene eller er usikker på hva dette betyr for deg,{' '}
                                <LenkeMedAmplitude
                                    tekst="ta kontakt med Nav"
                                    url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                                />
                                , så hjelper vi deg videre.
                            </BodyLong>
                        </>
                    </div>
                </ReadMore>
            </>
        )
    } else {
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
                                Du trenger ikke gjøre noe. Hvis vi trenger flere opplysninger, tar en av våre
                                saksbehandlere kontakt med deg.
                            </BodyLong>
                            <BodyLong spacing>
                                <LenkeMedAmplitude
                                    tekst="Skriv til oss om du har flere spørsmål"
                                    url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                                    icon={
                                        <Chat2Icon
                                            title="Skriv til oss"
                                            className="inline text-surface-action"
                                        ></Chat2Icon>
                                    }
                                />
                            </BodyLong>
                        </>
                    </div>
                </ReadMore>
            </>
        )
    }
}

export default RevurderingAnnuleringInfo
