import { Accordion, BodyLong, Heading } from '@navikt/ds-react'
import React, { useContext } from 'react'

import { BegrunnelseType, RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'
import { useScrollTilElement } from '../../../hooks/useScrollTilElement'

export const BegrunnelseEkspanderbar = ({
    vedtak,
    begrunnelse,
    apen,
    setApen,
    setForelderElementApen,
}: {
    vedtak: RSVedtakWrapper
    begrunnelse: BegrunnelseType | 'skjonn'
    apen?: boolean
    setApen?: (apne: boolean) => void
    setForelderElementApen?: (apne: boolean) => void
}) => {
    const arkivering = useContext(ArkiveringContext)
    useScrollTilElement('begrunnelse-vedtak', apen, setApen, setForelderElementApen)

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
            id="begrunnelse-vedtak"
            defaultOpen={arkivering}
            open={apen}
            onOpenChange={() => (setApen ? setApen(!apen) : false)}
        >
            <Accordion.Header>
                <Heading size="small" level="3" tabIndex={-1}>
                    {hentBegrunnelseTittel()}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="mt-4 bg-white">
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
            {paragraf.split('\n').map((linje, linjeIndex) => (
                <span key={linjeIndex} style={{ display: 'block' }}>
                    {linje}
                </span>
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
