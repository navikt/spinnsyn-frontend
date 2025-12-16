import { Accordion, BodyShort } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../../utils/store-små'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { VedtakExpansionCard } from '../../../expansioncard/vedtak-expansion-card'
import { AlleSykepengerPerDag } from '../../utbetaling/accordion/sykepenger-per-dag'
import { BegrunnelseEkspanderbar } from '../../begrunnelse-ekspanderbar/begrunnelse-ekspanderbar'
import { hentBegrunnelse } from '../../../../utils/vedtak-utils'
import { useScroll } from '../../../../context/scroll-context'
import { ArkiveringContext } from '../../../../context/arkivering-context'
import { useWindowSize } from '../../../../utils/useWindowSize'
import { RSVedtakArbeidstaker, RSVedtakWrapperUtvidet } from '../../../../types/rs-types/rs-vedtak-felles'
import { logEvent } from '../../../umami/umami'
import BeregningÅrsinntektFlereArbeidsgivere from '../beregning-årsinntekt-flere-arbeidsgivere'
import { InfoSection } from '../info-seksjon'

import { MerOmBergningenArbeidstaker } from './mer-om-bergningen-arbeidstaker'
import { EkstrainfoOmVedtaketArbeidstaker } from './ekstrainfo-om-vedtaket-arbeidstaker'

type InntekterLagtTilGrunnArbeidstakerProps = {
    vedtak: RSVedtakWrapperUtvidet
}

export const InntekterLagtTilGrunnArbeidstaker = ({ vedtak }: InntekterLagtTilGrunnArbeidstakerProps) => {
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
        if (apneElementMedId === 'sykepenger_per_dag_arbeidsgiver' || apneElementMedId === 'sykepenger_per_dag') {
            setVisBeregning(true)
        }
    }, [apneElementMedId])

    useEffect(() => {
        if (elementRef.current !== null) {
            registrerElement('begrunnelse_vedtak', elementRef)
        }
    }, [elementRef?.current?.id, registrerElement])

    if (vedtak.vedtak.yrkesaktivitetstype !== 'ARBEIDSTAKER') {
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

    const avslag = hentBegrunnelse(vedtak, 'Avslag')
    const delvisInnvilgelse = hentBegrunnelse(vedtak, 'DelvisInnvilgelse')
    const innvilgelse = hentBegrunnelse(vedtak, 'Innvilgelse')

    const loggBegrunnelseToggle = (open: boolean, type: 'Avslag' | 'DelvisInnvilgelse' | 'Innvilgelse') => {
        let tittel = 'Begrunnelse for innvilget søknad'
        switch (type) {
            case 'Avslag':
                tittel = 'Begrunnelse for avslått søknad'
                break
            case 'DelvisInnvilgelse':
                tittel = 'Begrunnelse for delvis innvilget søknad'
                break
        }
        logEvent(open ? 'accordion åpnet' : 'accordion lukket', {
            tittel,
            component: 'InntekterLagtTilGrunnArbeidstaker',
        })
    }

    return (
        <VedtakExpansionCard
            apne={visBeregning}
            setApne={(open) => {
                logEvent(open ? 'expansioncard åpnet' : 'expansioncard lukket', {
                    tittel: tekst('utbetaling.inntekt.info.tittel'),
                    component: 'InntekterLagtTilGrunnArbeidstaker',
                })
                setVisBeregning(open)
            }}
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
                <EkstrainfoOmVedtaketArbeidstaker vedtak={vedtak.vedtak} />
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
                            setApne={(open) => {
                                loggBegrunnelseToggle(open, 'Avslag')
                                setVisBegrunnelse(open)
                            }}
                        />
                    )}
                    {delvisInnvilgelse && (
                        <BegrunnelseEkspanderbar
                            elementRef={elementRef}
                            vedtak={vedtak}
                            begrunnelse="DelvisInnvilgelse"
                            apne={visBegrunnelse}
                            setApne={(open) => {
                                loggBegrunnelseToggle(open, 'DelvisInnvilgelse')
                                setVisBegrunnelse(open)
                            }}
                        />
                    )}
                    {innvilgelse && (
                        <BegrunnelseEkspanderbar
                            elementRef={elementRef}
                            vedtak={vedtak}
                            begrunnelse="Innvilgelse"
                            apne={visBegrunnelse}
                            setApne={(open) => {
                                loggBegrunnelseToggle(open, 'Innvilgelse')
                                setVisBegrunnelse(open)
                            }}
                        />
                    )}
                    <AlleSykepengerPerDag vedtak={vedtak} />
                    <MerOmBergningenArbeidstaker vedtak={vedtak} />
                </Accordion>
            </article>
        </VedtakExpansionCard>
    )
}
