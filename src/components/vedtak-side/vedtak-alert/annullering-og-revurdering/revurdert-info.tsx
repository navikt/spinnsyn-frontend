import { Alert, BodyLong, BodyShort, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'

import { LenkeMedUmami } from '../../../lenke/lenke-med-umami'
import { logEvent } from '../../../umami/umami'

const RevurdertAlert = () => {
    return (
        <Alert variant="info">
            <BodyShort spacing>
                Vi har fått nye opplysninger i saken din og søknaden er vurdert på nytt. Dette svaret er erstattet av et
                annet og gjelder derfor ikke lenger.
            </BodyShort>
            <BodyShort spacing className="mt-8">
                Du finner nytt svar i <LenkeMedUmami tekst="oversikten på Ditt sykefravær" url="/syk/sykepenger" />. Du
                trenger ikke å gjøre noe.
            </BodyShort>
        </Alert>
    )
}

export const RevurdertInfo = () => {
    const [expanded, setExpanded] = useState<boolean>(false)

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
                        component: 'RevurdertInfo',
                    })
                    setExpanded((prev) => !prev)
                }}
            >
                <div className="pt-4">
                    <>
                        <BodyLong spacing>
                            Når vi får nye opplysninger om saken din, kan det påvirke sykepengene dine. Nye opplysninger
                            kan enten komme fra deg, den som har sykmeldt deg, eller fra arbeidsgiveren din.
                        </BodyLong>
                        <BodyLong spacing>
                            Når det skjer, må vi vurdere søknaden på nytt for å være sikre på at du får riktig
                            utbetaling.
                        </BodyLong>
                        <BodyLong spacing>
                            Etter at vi har vurdert søknaden, får du et nytt svar. Dette svaret erstatter tidligere svar
                            fra oss, også hvis det ikke har skjedd noen endringer.
                        </BodyLong>
                        <BodyLong spacing>
                            Har du spørsmål til de nye opplysningene eller er usikker på hva dette betyr for deg,{' '}
                            <LenkeMedUmami
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
}
