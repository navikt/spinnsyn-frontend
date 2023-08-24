import { BodyLong, Heading } from '@navikt/ds-react'
import React from 'react'

import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

export const BegrunnelseForSkjonnsfastsetting = ({ vedtak }: VedtakProps) => {
    return (
        <VedtakExpansionCard tittel="Begrunnelse for skjønnsfastsetting" vedtak={vedtak}>
            <BegrunnelseMedHeading vedtak={vedtak} begrunnelseKey="SkjønnsfastsattSykepengegrunnlagMal" />
            <BegrunnelseMedHeading
                vedtak={vedtak}
                begrunnelseKey="SkjønnsfastsattSykepengegrunnlagFritekst"
                heading="Nærmere begrunnelse fra saksbehandler"
            />
            <BegrunnelseMedHeading
                vedtak={vedtak}
                begrunnelseKey="SkjønnsfastsattSykepengegrunnlagKonklusjon"
                heading="Konklusjon"
            />
        </VedtakExpansionCard>
    )
}

const BegrunnelseMedHeading = ({
    vedtak,
    begrunnelseKey,
    heading,
}: {
    vedtak: RSVedtakWrapper
    begrunnelseKey: string
    heading?: string
}) => {
    const tekst = vedtak.vedtak.begrunnelser
        ?.find((b) => b.type === begrunnelseKey)
        ?.begrunnelse?.split('\n')
        .filter((tekst) => tekst)
        .map((tekst, idx) => (
            <BodyLong spacing key={idx}>
                {tekst}
            </BodyLong>
        ))
    if (!tekst || tekst.length === 0) return null
    if (heading) {
        return (
            <>
                <Heading size="xsmall" level="3" spacing>
                    {heading}
                </Heading>
                {tekst}
            </>
        )
    }

    return <>{tekst}</>
}
