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
    begrunnelse: BegrunnelseType | 'skjonn'
    apne?: boolean
    setApne?: (apne: boolean) => void
    elementRef?: RefObject<HTMLDivElement | null>
}) => {
    const arkivering = useContext(ArkiveringContext)

    const hentBegrunnelseTittel = () => {
        switch (begrunnelse) {
            case 'Avslag': {
                return 'Begrunnelse for avslått søknad'
            }
            case 'DelvisInnvilgelse': {
                return 'Begrunnelse for delvis innvilget søknad'
            }
            case 'Innvilgelse': {
                return 'Begrunnelse for innvilget søknad'
            }
            case 'skjonn': {
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
            <Accordion.Content className="mt-4 ignore-axe">
                {begrunnelse === 'skjonn' && (
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
                {begrunnelse !== 'skjonn' && <BegrunnelseMedHeading vedtak={vedtak} begrunnelseType={begrunnelse} />}
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
    const tekst = hentBegrunnelse(vedtak, begrunnelseType)?.begrunnelse || ''
    const paragrafer = tekst.split('\n\n')

    const fullstendigBegrunnelse = paragrafer.map((paragraf, index) => (
        <BodyLong spacing key={index}>
            {paragraf.split('\n').map((linje, linjeIndex, { length: paragrafListeLengde }) => (
                <React.Fragment key={linjeIndex}>
                    {linje}
                    {linjeIndex < paragrafListeLengde - 1 && <br />}
                </React.Fragment>
            ))}
        </BodyLong>
    ))

    if (fullstendigBegrunnelse.length === 0) return null

    return (
        <>
            {heading && (
                <Heading size="xsmall" level="3" spacing>
                    {heading}
                </Heading>
            )}
            {fullstendigBegrunnelse}
        </>
    )
}
