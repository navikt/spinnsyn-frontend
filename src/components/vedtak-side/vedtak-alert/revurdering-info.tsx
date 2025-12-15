import { Alert, BodyLong, BodyShort, Heading, ReadMore } from '@navikt/ds-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { logEvent } from '../../umami/umami'
import { LenkeMedUmami } from '../../lenke/lenke-med-umami'
import { RSVedtakWrapperUtvidet } from '../../../types/rs-types/rs-vedtak-felles'
import { harVedtakEndringer } from '../../../utils/vedtak-utils'
import { sorterEtterNyesteFom } from '../../../utils/sorter-vedtak'

const IngenEndringerAlert = () => {
    return (
        <Alert variant="info">
            <Heading spacing level="2" size="small">
                Ingen endringer i svar på søknaden
            </Heading>
            <BodyShort spacing>
                Vi har vurdert søknaden din på nytt. Den nye vurderingen har ikke ført til noen endringer, og du trenger
                ikke å gjøre noe.
            </BodyShort>
            <BodyShort spacing className="mt-8">
                Du finner alle tidligere svar i{' '}
                <LenkeMedUmami tekst="oversikten på Ditt sykefravær" url="/syk/sykepenger" />.
            </BodyShort>
        </Alert>
    )
}

const EndringerAlert = () => {
    return (
        <Alert variant="warning">
            <Heading spacing level="2" size="small">
                Endringer i svar på søknaden
            </Heading>
            <BodyShort spacing>
                Vi har vurdert søknaden din på nytt. Vurderingen har ført til endringer i beløpet, hvem vi utbetaler til
                eller hvor mange sykepengedager du har igjen. I svaret under ser du hva vi har besluttet og hvorfor.
            </BodyShort>
            <BodyShort spacing className="mt-8">
                Har du spørsmål eller er usikker på hva dette betyr for deg,{' '}
                <LenkeMedUmami tekst="ta kontakt med Nav" url="https://innboks.nav.no/s/skriv-til-oss?category=Helse" />
                , så hjelper vi deg videre.
            </BodyShort>
        </Alert>
    )
}

const finnRevurdertVedtak = (
    soknadId: string,
    alleVedtak: RSVedtakWrapperUtvidet[],
): RSVedtakWrapperUtvidet | undefined => {
    const revurderteVedtak = alleVedtak.filter((v) => v.revurdert)
    const revurderteMedSoknadId = revurderteVedtak.filter((v) =>
        v.vedtak.dokumenter.some((dokument) => dokument.type === 'Søknad' && dokument.dokumentId === soknadId),
    )
    return revurderteMedSoknadId.sort(sorterEtterNyesteFom)[0]
}

interface RevurderingInfoProps {
    alleVedtak: RSVedtakWrapperUtvidet[]
}

export const RevurderingInfo = ({ alleVedtak }: RevurderingInfoProps) => {
    const [expanded, setExpanded] = useState<boolean>(false)
    const router = useRouter()
    const alleVedtakForBruker: RSVedtakWrapperUtvidet[] = alleVedtak
    if (!alleVedtakForBruker || alleVedtakForBruker.length === 0) {
        throw new Error('Mangler vedtak')
    }
    const nyttVedtak = alleVedtakForBruker.find((v) => v.id === router.query.id)
    if (!nyttVedtak) {
        throw new Error('Vedtak ikke funnet')
    }

    const soknadId = nyttVedtak.vedtak.dokumenter.find((dokument) => dokument.type === 'Søknad')?.dokumentId || ''
    const revurdertVedtak = finnRevurdertVedtak(soknadId, alleVedtakForBruker)
    if (!revurdertVedtak) {
        throw new Error('Revurdert vedtak ikke funnet')
    }
    const harEndringer = harVedtakEndringer(nyttVedtak, revurdertVedtak)

    return (
        <>
            {harEndringer ? <EndringerAlert /> : <IngenEndringerAlert />}
            <ReadMore
                className="my-10"
                header="Hvorfor søknaden blir vurdert på nytt"
                open={expanded}
                onClick={() => {
                    logEvent(expanded ? 'readmore lukket' : 'readmore åpnet', {
                        tittel: 'Hvorfor søknaden blir vurdert på nytt',
                        component: 'RevurderingInfo',
                        endringIRevurdering: harEndringer,
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
