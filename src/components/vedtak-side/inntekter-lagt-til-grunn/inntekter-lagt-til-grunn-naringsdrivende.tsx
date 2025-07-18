import { Accordion, BodyShort } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { tekst } from '../../../utils/tekster'
import { formaterValuta } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { AlleSykepengerPerDag } from '../utbetaling/accordion/sykepenger-per-dag'
import { BegrunnelseEkspanderbar } from '../begrunnelse-ekspanderbar/begrunnelse-ekspanderbar'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'
import { useScroll } from '../../../context/scroll-context'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { Arsinntekt } from '../../../types/rs-types/rs-vedtak-naringsdrivende'

import { InfoSection } from './info-seksjon'
import { MerOmBergningen } from './mer-om-bergningen'
import { EkstrainfoOmVedtaket } from './ekstrainfo-om-vedtaket'

export const InntekterLagtTilGrunnNaringsdrivende = ({ vedtak }: VedtakProps) => {
    const arkivering = useContext(ArkiveringContext)
    const { apneElementMedId, registrerElement } = useScroll()
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)
    const [visBegrunnelse, setVisBegrunnelse] = useState<boolean>(arkivering)
    const elementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (apneElementMedId === 'begrunnelse_vedtak') {
            setVisBegrunnelse(true)
            setVisBeregning(true)
        }
        if (apneElementMedId === 'mer_om_beregningen') {
            setVisBegrunnelse(true)
            setVisBeregning(true)
        }
    }, [apneElementMedId])

    useEffect(() => {
        if (elementRef.current !== null) {
            registrerElement('begrunnelse_vedtak', elementRef)
        }
    }, [elementRef?.current?.id, registrerElement])

    const erSkjonnsfastsatt = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
    const harBegrunnelseForSkjonn =
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagFritekst') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagKonklusjon') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagMal')

    const harIngenUtbetaling = vedtak.sykepengebelopPerson === 0
    const harMinstEnForLavInntektDag =
        vedtak.dagerPerson
            .concat(vedtak.dagerArbeidsgiver)
            .filter(
                (dag) =>
                    dag.begrunnelser.includes('MinimumInntekt') || dag.begrunnelser.includes('MinimumInntektOver67'),
            ).length > 0

    const avslag = hentBegrunnelse(vedtak, 'Avslag')
    const delvisInnvilgelse = hentBegrunnelse(vedtak, 'DelvisInnvilgelse')
    const innvilgelse = hentBegrunnelse(vedtak, 'Innvilgelse')
    const harIkkeEnForLavInntektDAg = !harMinstEnForLavInntektDag
    const harIkkeBegrunnelseForAvslagEllerDelvisInnvilgelse = !(avslag || delvisInnvilgelse)
    if (
        harIngenUtbetaling &&
        !erWeekendPeriode(vedtak.vedtak.fom, vedtak.vedtak.tom) &&
        harIkkeEnForLavInntektDAg &&
        harIkkeBegrunnelseForAvslagEllerDelvisInnvilgelse
    ) {
        return null
    }

    const arsInntekter = (inntekter: Arsinntekt[]) => {
        return inntekter.map((arsInntekt, idx) => {
            return (
                <InfoSection
                    key={idx}
                    label={`Årsinntekt ${arsInntekt.inntektsaar}`}
                    value={formaterValuta(arsInntekt.inntekt)}
                />
            )
        })
    }

    return (
        <>
            {vedtak.vedtak.vedtakstype == 'NARINGSDRIVENDE' && (
                <VedtakExpansionCard
                    apne={visBeregning}
                    setApne={setVisBeregning}
                    vedtak={vedtak}
                    tittel={tekst('utbetaling.inntekt.info.tittel')}
                >
                    <article aria-label={tekst('utbetaling.inntekt.info.tittel')}>
                        <BodyShort weight="semibold" className="w-full mb-2">
                            {storeTilStoreOgSmå(vedtak.orgnavn)}
                        </BodyShort>
                        {arsInntekter(vedtak.vedtak.inntekter)}

                        <InfoSection
                            className="mt-4"
                            label="Juster gjennomsnittlig årsinntekt"
                            value={formaterValuta(vedtak.vedtak.justertGjennomsnittligInntekt)}
                        />

                        <EkstrainfoOmVedtaket vedtak={vedtak.vedtak} />
                        <BodyShort size="small" className="mt-4 mb-4">
                            Som selvstendig næringsdrivende har du rett til sykepenger tilsvarende 80% av
                            sykepengegrunnlaget
                        </BodyShort>

                        <Accordion className="mt-8" indent={false}>
                            {erSkjonnsfastsatt && harBegrunnelseForSkjonn && (
                                <BegrunnelseEkspanderbar vedtak={vedtak} begrunnelse="skjonn" />
                            )}
                            {avslag && (
                                <BegrunnelseEkspanderbar
                                    elementRef={elementRef}
                                    vedtak={vedtak}
                                    begrunnelse="Avslag"
                                    apne={visBegrunnelse}
                                    setApne={setVisBegrunnelse}
                                />
                            )}
                            {delvisInnvilgelse && (
                                <BegrunnelseEkspanderbar
                                    elementRef={elementRef}
                                    vedtak={vedtak}
                                    begrunnelse="DelvisInnvilgelse"
                                    apne={visBegrunnelse}
                                    setApne={setVisBegrunnelse}
                                />
                            )}
                            {innvilgelse && (
                                <BegrunnelseEkspanderbar
                                    elementRef={elementRef}
                                    vedtak={vedtak}
                                    begrunnelse="Innvilgelse"
                                    apne={visBegrunnelse}
                                    setApne={setVisBegrunnelse}
                                />
                            )}
                            <AlleSykepengerPerDag vedtak={vedtak} />
                            <MerOmBergningen vedtak={vedtak} />
                        </Accordion>
                    </article>
                </VedtakExpansionCard>
            )}
        </>
    )
}
