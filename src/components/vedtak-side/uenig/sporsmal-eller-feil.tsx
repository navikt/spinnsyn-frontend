import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedAmplitude } from '../../lenke/lenke-med-amplitude'
import { Dokument } from '../../../types/rs-types/rs-vedtak-felles'

type SporsmalEllerFeilProps = {
    vedtak: {
        vedtak: {
            dokumenter: Dokument[]
            tags?: string[]
            yrkesaktivitetstype: 'ARBEIDSTAKER' | 'SELVSTENDIG'
        }
    }
}

export const SporsmalEllerFeil = ({ vedtak }: SporsmalEllerFeilProps) => {
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

    const inntektsmeldingLenke = () => {
        const relaterteInntektsmeldinger = vedtak.vedtak.dokumenter.filter(
            (dokument) => dokument.type === 'Inntektsmelding',
        )
        if (relaterteInntektsmeldinger.length === 1) {
            const inntektsmeldingId = relaterteInntektsmeldinger[0].dokumentId
            return {
                url: `/syk/sykefravaer/inntektsmeldinger/${inntektsmeldingId}`,
                cleanUrl: '/syk/sykefravaer/inntektsmeldinger/inntektsmeldingId',
            }
        }
        return { url: '/syk/sykefravaer/inntektsmeldinger' }
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
            {vedtak.vedtak.yrkesaktivitetstype === 'ARBEIDSTAKER' && (
                <Inntektsopplysninger
                    inntektFraAOrdningLagtTilGrunn={inntektFraAOrdningLagtTilGrunn}
                    inntektsmeldingLenke={inntektsmeldingLenke}
                />
            )}
        </>
    )
}

const Inntektsopplysninger = ({
    inntektFraAOrdningLagtTilGrunn,
    inntektsmeldingLenke,
}: {
    inntektFraAOrdningLagtTilGrunn: boolean
    inntektsmeldingLenke: () => { url: string; cleanUrl?: string }
}) => {
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
                    Har du spørsmål til opplysningene i{' '}
                    <LenkeMedAmplitude {...inntektsmeldingLenke()} tekst="inntektsmeldingen" />, kontakt arbeidsgiveren
                    din.
                </BodyLong>
            </>
        )
    }
}
