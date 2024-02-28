import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { VedtakProps } from '../vedtak'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'

export const BegrunnelseForSkjonnsfastsetting = ({ vedtak }: VedtakProps) => {
    const arkivering = useContext(ArkiveringContext)

    return (
        <Accordion.Item data-cy="begrunnelse-for-skjønnsfastsetting" defaultOpen={arkivering}>
            <Accordion.Header>
                <Heading size="small" level="3">
                    Begrunnelse for skjønnsfastsetting
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="mt-4">
                <BegrunnelseMedHeading vedtak={vedtak} begrunnelseKey="SkjønnsfastsattSykepengegrunnlagMal" />
                <BegrunnelseMedHeading vedtak={vedtak} begrunnelseKey="SkjønnsfastsattSykepengegrunnlagFritekst" />
                <BegrunnelseMedHeading
                    vedtak={vedtak}
                    begrunnelseKey="SkjønnsfastsattSykepengegrunnlagKonklusjon"
                    heading="Konklusjon"
                />
            </Accordion.Content>
        </Accordion.Item>
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
