import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { VedtakProps } from '../vedtak'
import { BegrunnelseType, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'

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
                <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType="SkjønnsfastsattSykepengegrunnlagMal" />
                <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType="SkjønnsfastsattSykepengegrunnlagFritekst" />
                <BegrunnelseMedHeading
                    vedtak={vedtak}
                    begrunnelseType="SkjønnsfastsattSykepengegrunnlagKonklusjon"
                    heading="Konklusjon"
                />
            </Accordion.Content>
        </Accordion.Item>
    )
}

const BegrunnelseMedHeading = ({
    vedtak,
    begrunnelseType,
    heading,
}: {
    vedtak: RSVedtakWrapper
    begrunnelseType: BegrunnelseType
    heading?: string
}) => {
    const tekst = hentBegrunnelse(vedtak, begrunnelseType)
        ?.begrunnelse?.split('\n')
        .filter((tekst: string) => tekst)
        .map((tekst: string, idx: number) => (
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
