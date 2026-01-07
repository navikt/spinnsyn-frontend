import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { LenkeMedUmami } from '../../lenke/lenke-med-umami'
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

    const inntektsmeldingLenke = () => ({ url: '/syk/sykefravaer/inntektsmeldinger' })

    const inntektFraAOrdningLagtTilGrunn = vedtak.vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false

    return (
        <>
            <Heading size="small" level="2" spacing>
                Spørsmål eller feil
            </Heading>
            <BodyLong spacing>
                Har du funnet en feil som skyldes feil i søknaden kan du{' '}
                <LenkeMedUmami {...soknadsLenke()} tekst="endre svarene i søknaden" />.
            </BodyLong>

            {vedtak.vedtak.yrkesaktivitetstype === 'ARBEIDSTAKER' && (
                <InntektsopplysningerArbeidstaker
                    inntektFraAOrdningLagtTilGrunn={inntektFraAOrdningLagtTilGrunn}
                    inntektsmeldingLenke={inntektsmeldingLenke}
                />
            )}

            {vedtak.vedtak.yrkesaktivitetstype === 'SELVSTENDIG' && <InntektsopplysningerSelvstendigNaringsdrivende />}
        </>
    )
}

const InntektsopplysningerArbeidstaker = ({
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
                    Hvis du vil se opplysningene svaret er basert på, eller har andre spørsmål,{' '}
                    <LenkeMedUmami
                        url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                        tekst="ta kontakt med Nav"
                    />
                    , så hjelper vi deg videre.
                </BodyLong>
            </>
        )
    } else {
        return (
            <>
                <BodyLong spacing>
                    Hvis du vil se inntektsopplysningene arbeidsgiveren din har sendt inn, kan du gå til oversikten over{' '}
                    <LenkeMedUmami {...inntektsmeldingLenke()} tekst="inntektsmeldinger" />. Har du spørsmål til
                    inntektsopplysningene, ta kontakt med arbeidsgiveren din.
                </BodyLong>
                <BodyLong spacing>
                    Har du andre spørsmål,{' '}
                    <LenkeMedUmami
                        tekst="ta kontakt med Nav"
                        url="https://innboks.nav.no/s/skriv-til-oss?category=Helse"
                    />
                    , så hjelper vi deg videre.
                </BodyLong>
            </>
        )
    }
}

const InntektsopplysningerSelvstendigNaringsdrivende = () => {
    return (
        <>
            <BodyLong spacing>
                Hvis du vil se opplysningene svaret er basert på, eller har andre spørsmål,{' '}
                <LenkeMedUmami url="https://innboks.nav.no/s/skriv-til-oss?category=Helse" tekst="ta kontakt med Nav" />
                , så hjelper vi deg videre.
            </BodyLong>
        </>
    )
}
