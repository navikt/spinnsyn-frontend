import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { BegrunnelseType, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'
import { useScroll } from '../../../context/scroll-context'

export const BegrunnelseEkspanderbar = ({
    vedtak,
    begrunnelse,
}: {
    vedtak: RSVedtakWrapper
    begrunnelse?: BegrunnelseType
}) => {
    const arkivering = useContext(ArkiveringContext)
    const { registrerElement, erApenAccordion } = useScroll()
    const elementRef = useRef<HTMLDivElement>(null)
    const elementId = `begrunnelse-for-${begrunnelse || 'skjønnsfastsetting'}`
    const [visBegrunnelse, setVisBegrunnelse] = useState<boolean>(false)

    useEffect(() => {
        if (elementRef.current) {
            registrerElement(elementRef)
        }
    }, [elementId, registrerElement])

    useEffect(() => {
        if (erApenAccordion) {
            setVisBegrunnelse(true)
        }
    }, [erApenAccordion])

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
            data-cy={elementId}
            defaultOpen={arkivering}
            open={visBegrunnelse}
            onOpenChange={() => setVisBegrunnelse(!visBegrunnelse)}
            id={elementId}
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
