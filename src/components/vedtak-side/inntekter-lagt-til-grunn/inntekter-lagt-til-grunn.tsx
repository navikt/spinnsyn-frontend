import { Accordion, Alert, BodyShort, Detail, Link } from '@navikt/ds-react'
import React from 'react'

import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { tekst } from '../../../utils/tekster'
import { formaterValuta } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'
import { AlleSykepengerPerDag } from '../utbetaling/accordion/sykepenger-per-dag'

import BeregningÅrsinntektFlereArbeidsgivere from './beregning-årsinntekt-flere-arbeidsgivere'
import { InfoSection } from './info-seksjon'
import { inntektInfoTekster } from './inntekt-info-tekster'
import { MerOmBergningen } from './mer-om-bergningen'

export const InntekterLagtTilGrunn = ({ vedtak }: VedtakProps) => {
    const finnRiktigInntekt = () => {
        if (
            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterHovedregel' ||
            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'
        ) {
            const arbeidsgiveren = vedtak.vedtak.sykepengegrunnlagsfakta.arbeidsgivere.find((a) => {
                return a.arbeidsgiver == vedtak.vedtak.organisasjonsnummer
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

    const inntekt = finnRiktigInntekt()
    const inntektMnd = inntekt ? formaterValuta(inntekt) : undefined
    const inntektAr = inntekt ? formaterValuta(inntekt * 12) : undefined

    const over25prosentAvvik =
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn' &&
        vedtak.vedtak.sykepengegrunnlagsfakta?.avviksprosent > 25

    if (!(inntektMnd && inntektAr)) {
        return null
    }
    const harIngenUtbetaling = vedtak.sykepengebelopPerson == 0 && vedtak.sykepengebelopArbeidsgiver == 0
    const harMinstEnForLavInntektDag =
        vedtak.dagerPerson.concat(vedtak.dagerArbeidsgiver).filter((dag) => dag.begrunnelser.includes('MinimumInntekt'))
            .length > 0

    if (harIngenUtbetaling && !harMinstEnForLavInntektDag) return null

    return (
        <VedtakExpansionCard vedtak={vedtak} tittel={tekst('utbetaling.inntekt.info.tittel')}>
            <article aria-label={tekst('utbetaling.inntekt.info.tittel')}>
                <BodyShort weight="semibold" className="w-full">
                    {storeTilStoreOgSmå(vedtak.orgnavn)}
                </BodyShort>
                <InfoSection label={tekst('utbetaling.inntekt.info.beregnet')} value={inntektMnd} />
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
                {vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn' && (
                    <>
                        <InfoSection
                            className="mt-4 border-t border-gray-400 pt-4"
                            label="Årsinntekt fra A-ordningen"
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
                            vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn'
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
                        <Detail className="mt-4 border-t border-gray-400 pt-4 text-sm text-gray-700">
                            Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller
                            kravene for arbeidsavklaringspenger, kan du velge å få det isteden.
                        </Detail>
                        <Detail className="text-sm text-gray-700">
                            Sykepenger og arbeidsavklaringspenger beregnes på forskjellige måter. Derfor kan grunnlaget
                            du kan få for arbeidsavklaringspenger være høyere enn det du kan få for sykepenger. For mer
                            informasjon{' '}
                            <Link href={tekst('behandling.lenke.url')} target="_blank">
                                kontakt NAV
                            </Link>
                            .
                        </Detail>
                    </>
                )}

                <Accordion className="mt-8" indent={false}>
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
