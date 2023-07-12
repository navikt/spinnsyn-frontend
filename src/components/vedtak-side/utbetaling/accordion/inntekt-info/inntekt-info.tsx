import { Accordion, Alert, BodyShort, Heading, Label } from '@navikt/ds-react'
import React, { useContext, useState } from 'react'

import { ArkiveringContext } from '../../../../../context/arkivering-context'
import { harFlereArbeidsgivere } from '../../../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../../../utils/store-små'
import { tekst } from '../../../../../utils/tekster'
import { formaterValuta } from '../../../../../utils/valuta-utils'
import { VedtakProps } from '../../../vedtak'
import { parserWithReplace } from '../../../../../utils/html-react-parser-utils'

import BeregningÅrsinntektFlereArbeidsgivere from './beregning-årsinntekt-flere-arbeidsgivere'

const InntektInfo = ({ vedtak }: VedtakProps) => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)

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

    const skalViseSykepengegrunnlag = vedtak.vedtak.sykepengegrunnlag

    const onButtonClick = () => {
        setOpen(!open)
    }

    const over25prosentAvvik =
        vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn' &&
        vedtak.vedtak.sykepengegrunnlagsfakta?.avviksprosent > 25

    if (!(inntektMnd && inntektAr)) {
        return null
    }
    return (
        <Accordion.Item
            open={open}
            style={
                {
                    '--ac-accordion-header-bg': open
                        ? 'var(--a-surface-action-subtle)'
                        : 'var(--a-surface-transparent)',
                    '--ac-accordion-header-bg-hover': open
                        ? 'var(--a-surface-action-subtle)'
                        : 'var(--a-surface-hover)',
                } as React.CSSProperties
            }
        >
            <Accordion.Header onClick={onButtonClick}>
                <Heading size="small" level="3">
                    {tekst('utbetaling.inntekt.info.tittel')}
                </Heading>
            </Accordion.Header>
            <Accordion.Content className="bg-white pl-4 pt-4">
                <article data-cy="inntekt-info-article">
                    <Label className="w-full">{storeTilStoreOgSmå(vedtak.orgnavn)}</Label>

                    <section data-cy="beregnet-månedsinntekt" className="arkivering-flex-fix flex justify-between">
                        <BodyShort as="div" size="small" spacing>
                            {tekst('utbetaling.inntekt.info.beregnet')}
                        </BodyShort>
                        <BodyShort as="div" size="small" spacing>
                            {inntektMnd}
                        </BodyShort>
                    </section>

                    <section data-cy="beregnet-årsinntekt" className="arkivering-flex-fix flex justify-between">
                        <BodyShort as="div" size="small" spacing>
                            {tekst('utbetaling.inntekt.info.omregnet')}
                        </BodyShort>
                        <BodyShort as="div" size="small">
                            {inntektAr}
                        </BodyShort>
                    </section>

                    {harFlereArbeidsgivere(vedtak) === 'ja' && (
                        <>
                            <BeregningÅrsinntektFlereArbeidsgivere vedtak={vedtak} />

                            <section
                                data-cy="samlet-årsinntekt"
                                className="arkivering-flex-fix mt-4 flex justify-between border-t border-gray-400 pt-4"
                            >
                                <Label as="div" size="small" spacing>
                                    {tekst('utbetaling.inntekt.samlet.årsinntekt')}
                                </Label>
                                <Label as="div" size="small">
                                    {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                </Label>
                            </section>
                        </>
                    )}

                    {vedtak.vedtak.sykepengegrunnlagsfakta?.fastsatt == 'EtterSkjønn' && (
                        <>
                            <section className="arkivering-flex-fix flex justify-between">
                                <Label as="div" size="small" spacing>
                                    Årsinntekt fra A-ordningen
                                </Label>
                                <Label as="div" size="small">
                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlagsfakta.innrapportertÅrsinntekt)}
                                </Label>
                            </section>
                            <section className="arkivering-flex-fix flex justify-between">
                                <Label as="div" size="small" spacing>
                                    Utregnet avvik
                                </Label>
                                <Label as="div" size="small">
                                    {formatOneDecimal(vedtak.vedtak.sykepengegrunnlagsfakta.avviksprosent)} %
                                </Label>
                            </section>
                            <section className="arkivering-flex-fix flex justify-between">
                                <Label as="div" size="small" spacing>
                                    Skjønnsfastsatt årsinntekt
                                </Label>
                                <Label as="div" size="small">
                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlagsfakta.skjønnsfastsatt)}
                                </Label>
                            </section>
                        </>
                    )}

                    {skalViseSykepengegrunnlag && (
                        <section data-cy="sykepengegrunnlag" className="arkivering-flex-fix flex justify-between">
                            <Label as="div" size="small">
                                {tekst('utbetaling.sykepengegrunnlag')}
                            </Label>
                            <Label as="div" size="small">
                                {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                            </Label>
                        </section>
                    )}

                    {(over25prosentAvvik || vedtak.vedtak.begrensning === 'ER_6G_BEGRENSET') && (
                        <Alert variant="info" className="mt-8">
                            {over25prosentAvvik && (
                                <BodyShort spacing>
                                    Siden det er mer enn 25% avvik mellom beregnet årsinntekt og innrapportert
                                    årsinntekt blir inntekten skjønnsfastsatt.
                                </BodyShort>
                            )}
                            {parserWithReplace(tekst('utbetaling.redusert6G.tekst'))}
                        </Alert>
                    )}
                </article>
            </Accordion.Content>
        </Accordion.Item>
    )
}

function formatOneDecimal(value: number) {
    return value.toFixed(1).replace('.', ',')
}

export default InntektInfo
