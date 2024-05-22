import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { RefObject, useContext } from 'react'

import { BegrunnelseType, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'

export const BegrunnelseEkspanderbar = ({
    vedtak,
    begrunnelse,
    apne,
    setApne,
    elementRef,
}: {
    vedtak: RSVedtakWrapper
    begrunnelse?: BegrunnelseType
    apne?: boolean
    setApne?: (apne: boolean) => void
    elementRef?: RefObject<HTMLDivElement>
}) => {
    const arkivering = useContext(ArkiveringContext)

    const hentBegrunnelseTittel = () => {
        switch (begrunnelse) {
            case 'Avslag': {
                return 'Begrunnelse for avslått vedtak'
            }
            case 'DelvisInnvilget': {
                return 'Begrunnelse for delvis innvilget vedtak'
            }
            default: {
                return 'Begrunnelse for skjønnsfastsetting'
            }
        }
    }

    return (
        <Accordion.Item
            defaultOpen={arkivering}
            open={apne}
            onOpenChange={() => (setApne ? setApne(!apne) : false)}
            ref={elementRef}
        >
            <Accordion.Header>
                <Heading size="small" level="3">
                    {hentBegrunnelseTittel()}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="mt-4">
                {!(begrunnelse === 'Avslag' || begrunnelse === 'DelvisInnvilget') && (
                    <>
                        <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType="SkjønnsfastsattSykepengegrunnlagMal" />
                        <BegrunnelseMedHeading
                            vedtak={vedtak}
                            begrunnelseType="SkjønnsfastsattSykepengegrunnlagFritekst"
                        />
                        <BegrunnelseMedHeading
                            vedtak={vedtak}
                            begrunnelseType="SkjønnsfastsattSykepengegrunnlagKonklusjon"
                            heading="Konklusjon"
                        />
                    </>
                )}
                {begrunnelse === 'Avslag' && <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType="Avslag" />}
                {begrunnelse === 'DelvisInnvilget' && (
                    <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType="DelvisInnvilget" />
                )}
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
