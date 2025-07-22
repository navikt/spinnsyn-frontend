import { Accordion, BodyShort } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
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
import { useWindowSize } from '../../../utils/useWindowSize'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { RSVedtakArbeidstaker } from '../../../types/rs-types/rs-vedtak-arbeidstaker'

import BeregningÅrsinntektFlereArbeidsgivere from './beregning-årsinntekt-flere-arbeidsgivere'
import { InfoSection } from './info-seksjon'
import { MerOmBergningenArbeidstaker } from './mer-om-bergningen-arbeidstaker'
import { EkstrainfoOmVedtaket } from './ekstrainfo-om-vedtaket'

export const InntekterLagtTilGrunnArbeidstaker = ({ vedtak }: VedtakProps) => {
    const arkivering = useContext(ArkiveringContext)
    const { apneElementMedId, registrerElement } = useScroll()
    const [visBeregning, setVisBeregning] = useState<boolean>(arkivering)
    const [visBegrunnelse, setVisBegrunnelse] = useState<boolean>(arkivering)
    const elementRef = useRef<HTMLDivElement>(null)
    const inntektFraAOrdningLagtTilGrunn = vedtak.vedtak.tags?.includes('InntektFraAOrdningenLagtTilGrunn') || false
    const { mobile } = useWindowSize()

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

    if (vedtak.vedtak.vedtakstype !== 'ARBEIDSTAKER') {
        return null
    }

    const finnRiktigInntekt = (vedtak: RSVedtakArbeidstaker) => {
        if (
            vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterHovedregel' ||
            vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
        ) {
            const arbeidsgiveren = vedtak.sykepengegrunnlagsfakta.arbeidsgivere.find((a) => {
                return a.arbeidsgiver === vedtak.organisasjonsnummer
            })
            if (arbeidsgiveren) {
                return arbeidsgiveren.omregnetÅrsinntekt / 12
            }
        }

        const grunnlagPerAg = vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver
        if (grunnlagPerAg && vedtak.organisasjonsnummer) {
            const inntektFraGrunnlagPerAg = grunnlagPerAg[vedtak.organisasjonsnummer]
            if (inntektFraGrunnlagPerAg) {
                return inntektFraGrunnlagPerAg / 12
            }
        }
        return vedtak.inntekt
    }

    const erSkjonnsfastsatt = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
    const harBegrunnelseForSkjonn =
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagFritekst') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagKonklusjon') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagMal')

    const inntekt = finnRiktigInntekt(vedtak.vedtak)
    if (inntekt === undefined) {
        return null
    }
    const inntektMnd = formaterValuta(inntekt)
    const inntektAr = formaterValuta(inntekt * 12)

    const harIngenUtbetaling = vedtak.sykepengebelopPerson === 0 && vedtak.sykepengebelopArbeidsgiver === 0
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
    )
        return null

    return (
        <VedtakExpansionCard
            apne={visBeregning}
            setApne={setVisBeregning}
            vedtak={vedtak}
            tittel={tekst('utbetaling.inntekt.info.tittel')}
        >
            <article aria-label={tekst('utbetaling.inntekt.info.tittel')}>
                <BodyShort weight="semibold" className="w-full">
                    {storeTilStoreOgSmå(vedtak.orgnavn)}
                </BodyShort>
                <InfoSection
                    label={
                        mobile ? (
                            <>
                                {tekst('utbetaling.inntekt.info.beregnet')}
                                <BodyShort size="small">
                                    {inntektFraAOrdningLagtTilGrunn
                                        ? '(hentet fra a-ordningen)'
                                        : '(hentet fra inntektsmeldingen)'}
                                </BodyShort>
                            </>
                        ) : inntektFraAOrdningLagtTilGrunn ? (
                            tekst('utbetaling.inntekt.info.beregnet') + ' (hentet fra a-ordningen)'
                        ) : (
                            tekst('utbetaling.inntekt.info.beregnet') + ' (hentet fra inntektsmeldingen)'
                        )
                    }
                    value={inntektMnd}
                />

                <InfoSection label={tekst('utbetaling.inntekt.info.omregnet')} value={inntektAr} />
                {harFlereArbeidsgivere(vedtak) === 'ja' && (
                    <>
                        <BeregningÅrsinntektFlereArbeidsgivere vedtak={vedtak} />
                        <InfoSection
                            className="mt-4 border-t border-gray-400 pt-4"
                            bold
                            label={tekst('utbetaling.inntekt.samlet.årsinntekt')}
                            value={formaterValuta(
                                vedtak.vedtak.sykepengegrunnlagsfakta?.omregnetÅrsinntekt ||
                                    vedtak.vedtak.grunnlagForSykepengegrunnlag!,
                            )}
                        />
                    </>
                )}
                <EkstrainfoOmVedtaket vedtak={vedtak.vedtak} />
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
                    <MerOmBergningenArbeidstaker vedtak={vedtak} />
                </Accordion>
            </article>
        </VedtakExpansionCard>
    )
}
