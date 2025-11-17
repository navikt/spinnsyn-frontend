import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { VedtakProps } from '../vedtak'

const renderInntektsopplysninger = (inntektFraAOrdningLagtTilGrunn: boolean) => {
    if (inntektFraAOrdningLagtTilGrunn) {
        return (
            <>
                <BodyLong spacing>
                    Har du spørsmål om opplysningene som er hentet fra a-ordningen, kan du
                    <LenkeMedAmplitude
                        url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                        tekst="ta kontakt med Nav"
                    />
                    .
                </BodyLong>
            </>
        )
    } else {
        return (
            <>
                <BodyLong spacing>
                    Har du spørsmål til opplysningene i <LenkeMedAmplitude tekst="inntektsmeldingen" url="#" />, kontakt
                    arbeidsgiveren din.
                </BodyLong>
            </>
        )
    }
}

export const SporsmalEllerFeil = ({ vedtak }: VedtakProps) => {
    const soknadsLenke = () => {
        const relatertSoknad = vedtak.vedtak.dokumenter.filter((dokument) => dokument.type === 'Søknad')
        if (relatertSoknad.length === 1) {
            return {
                url: '/syk/sykepengesoknad/sendt/' + relatertSoknad[0].dokumentId,
                cleanUrl: '/syk/sykepengesoknad/sendt/soknadsid',
            }
        }
        return { url: '/syk/sykepengesoknad' }
    }

    const inntektFraAOrdningLagtTilGrunn = vedtak.vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

    return (
        <>
            <Heading size="small" level="2" spacing>
                Spørsmål eller feil
            </Heading>
            <BodyLong spacing>
                Hvis du vil se opplysningene svaret er basert på, har funnet en feil, eller har andre spørsmål,{' '}
                <LenkeMedAmplitude
                    tekst="ta kontakt med Nav"
                    url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                />
            </BodyLong>
            <BodyLong spacing>
                Har du funnet en feil som skyldes feil i søknaden kan du{' '}
                <LenkeMedAmplitude {...soknadsLenke()} tekst="endre svarene i søknaden" />.
            </BodyLong>
            {vedtak.vedtak.yrkesaktivitetstype === 'ARBEIDSTAKER' &&
                renderInntektsopplysninger(inntektFraAOrdningLagtTilGrunn)}
        </>
    )
}
