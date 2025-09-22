import { Accordion, BodyShort, Heading } from '@navikt/ds-react'
import React, { useContext, useEffect, useRef, useState } from 'react'

import { tekst } from '../../../utils/tekster'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { AlleSykepengerPerDag } from '../utbetaling/accordion/sykepenger-per-dag'
import { BegrunnelseEkspanderbar } from '../begrunnelse-ekspanderbar/begrunnelse-ekspanderbar'
import { hentBegrunnelse } from '../../../utils/vedtak-utils'
import { useScroll } from '../../../context/scroll-context'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { erWeekendPeriode } from '../../../utils/dato-utils'
import { logEvent } from '../../amplitude/amplitude'

import { MerOmBergningenNargingsdrivende } from './mer-om-bergningen-naringsdrivende'
import { EkstrainfoOmVedtaketSelvstendig } from './ekstrainfo-om-vedtaket-selvstendig'

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

    //Settes når vi får årsinntekter fra speilvendt
    const viseAarsinntekter = false

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
            component: 'InntekterLagtTilGrunnNaringsdrivende',
        })
    }

    return (
        <>
            {vedtak.vedtak.yrkesaktivitetstype == 'SELVSTENDIG' && (
                <VedtakExpansionCard
                    apne={visBeregning}
                    setApne={(open) => {
                        logEvent(open ? 'expansioncard åpnet' : 'expansioncard lukket', {
                            tittel: tekst('utbetaling.inntekt.info.tittel'),
                            component: 'InntekterLagtTilGrunnNaringsdrivende',
                        })
                        setVisBeregning(open)
                    }}
                    vedtak={vedtak}
                    tittel={tekst('utbetaling.inntekt.info.tittel')}
                >
                    <article aria-label={tekst('utbetaling.inntekt.info.tittel')}>
                        {viseAarsinntekter && (
                            <>
                                <Heading level="2" size="medium">
                                    Inntekten din
                                </Heading>
                                <BodyShort size="small" className="mt-3 mb-4">
                                    (hentet fra Skatteetaten)
                                </BodyShort>
                            </>
                        )}

                        <EkstrainfoOmVedtaketSelvstendig vedtak={vedtak.vedtak} />
                        <BodyShort size="small" className="mt-4 mb-4">
                            Som selvstendig næringsdrivende har du rett til sykepenger tilsvarende 80% av
                            sykepengegrunnlaget.
                        </BodyShort>

                        <BodyShort size="small" className="mt-4 mb-4">
                            Les mer om hvordan Nav beregner sykepengegrunnlaget under fanen &quot;Mer om
                            beregningen&quot;.
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
                            <MerOmBergningenNargingsdrivende />
                        </Accordion>
                    </article>
                </VedtakExpansionCard>
            )}
        </>
    )
}
