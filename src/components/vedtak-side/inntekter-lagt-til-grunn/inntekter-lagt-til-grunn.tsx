import { Alert, BodyShort, Label } from '@navikt/ds-react'
import React from 'react'

import { harFlereArbeidsgivere } from '../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../utils/store-små'
import { tekst } from '../../../utils/tekster'
import { formaterValuta } from '../../../utils/valuta-utils'
import { VedtakProps } from '../vedtak'
import { VedtakExpansionCard } from '../../expansioncard/vedtak-expansion-card'

import BeregningÅrsinntektFlereArbeidsgivere from './beregning-årsinntekt-flere-arbeidsgivere'
import { InfoSection } from './info-seksjon'
import { inntektInfoTekster } from './inntekt-info-tekster'
import { Begrepsforklaringer } from './begrepsforklaringer'

export const InntekterLagtTilGrunn = ({ vedtak }: VedtakProps) => {
    const finnRiktigInntekt = () => {
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
                <Label className="w-full">{storeTilStoreOgSmå(vedtak.orgnavn)}</Label>
                <InfoSection label={tekst('utbetaling.inntekt.info.beregnet')} value={inntektMnd} />
                <InfoSection label={tekst('utbetaling.inntekt.info.omregnet')} value={inntektAr} />
                {harFlereArbeidsgivere(vedtak) === 'ja' && (
                    <>
                        <BeregningÅrsinntektFlereArbeidsgivere vedtak={vedtak} />

                        <InfoSection
                            className="mt-4 border-t border-gray-400 pt-4"
                            bold
                            label={tekst('utbetaling.inntekt.samlet.årsinntekt')}
                            value={formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
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

                <Begrepsforklaringer vedtak={vedtak} />
            </article>
        </VedtakExpansionCard>
    )
}

function formatOneDecimal(value: number) {
    return value.toFixed(1).replace('.', ',')
}
