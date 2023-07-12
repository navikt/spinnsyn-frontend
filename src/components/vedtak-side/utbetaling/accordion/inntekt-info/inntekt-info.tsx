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
import { InfoSection } from './info-seksjon'

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
                                label="Årsinntekt fra A-ordningen"
                                value={formaterValuta(vedtak.vedtak.sykepengegrunnlagsfakta.innrapportertÅrsinntekt)}
                            />
                            <InfoSection
                                label="Utregnet avvik"
                                value={`${formatOneDecimal(vedtak.vedtak.sykepengegrunnlagsfakta.avviksprosent)} %`}
                            />
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
