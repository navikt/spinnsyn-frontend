import { Accordion, Alert, BodyShort, Detail, Link } from '@navikt/ds-react'
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

import BeregningÅrsinntektFlereArbeidsgivere from './beregning-årsinntekt-flere-arbeidsgivere'
import { InfoSection } from './info-seksjon'
import { inntektInfoTekster } from './inntekt-info-tekster'
import { MerOmBergningen } from './mer-om-bergningen'

export const InntekterLagtTilGrunn = ({ vedtak }: VedtakProps) => {
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

    const finnRiktigInntekt = () => {
        if (
            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterHovedregel' ||
            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
        ) {
            const arbeidsgiveren = vedtak.vedtak.sykepengegrunnlagsfakta.arbeidsgivere.find((a) => {
                return a.arbeidsgiver === vedtak.vedtak.organisasjonsnummer
            })
            if (arbeidsgiveren) {
                return arbeidsgiveren.omregnetÅrsinntekt / 12
            }
        }

        const grunnlagPerAg = vedtak.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver
        if (grunnlagPerAg && vedtak.vedtak.organisasjonsnummer) {
            const inntektFraGrunnlagPerAg = grunnlagPerAg[vedtak.vedtak.organisasjonsnummer]
            if (inntektFraGrunnlagPerAg) {
                return inntektFraGrunnlagPerAg / 12
            }
        }
        return vedtak.vedtak.inntekt
    }

    const erSkjonnsfastsatt = vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
    const harBegrunnelseForSkjonn =
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagFritekst') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagKonklusjon') &&
        hentBegrunnelse(vedtak, 'SkjønnsfastsattSykepengegrunnlagMal')

    const inntekt = finnRiktigInntekt()
    if (inntekt === undefined) {
        return null
    }
    const inntektMnd = formaterValuta(inntekt)
    const inntektAr = formaterValuta(inntekt * 12)

    const over25prosentAvvik =
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn' &&
        vedtak.vedtak.sykepengegrunnlagsfakta?.avviksprosent > 25

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
                {vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn' && (
                    <>
                        <InfoSection
                            className="mt-4 border-t border-gray-400 pt-4"
                            label="Årsinntekt rapportert til skatteetaten"
                            value={formaterValuta(vedtak.vedtak.sykepengegrunnlagsfakta.innrapportertÅrsinntekt)}
                        />
                        <InfoSection
                            label="Utregnet avvik"
                            value={`${formatOneDecimal(vedtak.vedtak.sykepengegrunnlagsfakta.avviksprosent)} %`}
                        />
                        {over25prosentAvvik && (
                            <Alert variant="info" className="my-2">
                                <BodyShort size="small">{inntektInfoTekster['25%avvik-skjønnsfastsatt']}</BodyShort>
                            </Alert>
                        )}
                        <InfoSection
                            label="Skjønnsfastsatt årsinntekt"
                            value={formaterValuta(vedtak.vedtak.sykepengegrunnlagsfakta.skjønnsfastsatt)}
                        />
                    </>
                )}
                {vedtak.vedtak.sykepengegrunnlag && (
                    <InfoSection
                        bold
                        className={
                            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt === 'EtterSkjønn'
                                ? 'mt-4 border-t border-gray-400 pt-4'
                                : ''
                        }
                        label={tekst('utbetaling.sykepengegrunnlag')}
                        value={formaterValuta(vedtak.vedtak.sykepengegrunnlag)}
                    />
                )}
                {vedtak.vedtak.begrensning === 'ER_6G_BEGRENSET' && vedtak.vedtak.sykepengegrunnlag && (
                    <>
                        <BodyShort size="small" className="mt-4 border-t border-gray-400 pt-4" spacing>
                            {`Sykepengegrunnlaget  er begrenset til 6G: ${formaterValuta(
                                vedtak.vedtak.sykepengegrunnlag,
                            )}`}
                        </BodyShort>
                        <BodyShort size="small">
                            {`Grunnbeløpet i folketrygden (G): ${formaterValuta(vedtak.vedtak.sykepengegrunnlag / 6)}`}
                        </BodyShort>
                    </>
                )}
                {vedtak.vedtak.tags && vedtak.vedtak.tags.includes('SykepengegrunnlagUnder2G') && (
                    <>
                        <Detail className="mt-4 border-t border-gray-700 pt-4 text-sm text-gray-900">
                            Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller
                            kravene for arbeidsavklaringspenger, kan du velge å få det isteden.
                        </Detail>
                        <Detail className="text-sm text-gray-900">
                            Sykepenger og arbeidsavklaringspenger beregnes på forskjellige måter. Derfor kan grunnlaget
                            du kan få for arbeidsavklaringspenger være høyere enn det du kan få for sykepenger. For mer
                            informasjon{' '}
                            <Link href={tekst('behandling.lenke.url')} target="_blank" className="!text-blue-800">
                                kontakt Nav
                            </Link>
                            .
                        </Detail>
                    </>
                )}
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
    )
}

function formatOneDecimal(value: number) {
    return value.toFixed(1).replace('.', ',')
}
