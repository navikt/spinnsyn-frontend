import { Accordion, BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../../../context/arkivering-context'
import { harFlereArbeidsgivere } from '../../../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../../../utils/store-små'
import { tekst } from '../../../../../utils/tekster'
import { formaterValuta } from '../../../../../utils/valuta-utils'
import { ekspanderbarKlikk } from '../../../../ekspanderbar/ekspander-utils'
import Vis from '../../../../vis'
import { VedtakProps } from '../../../vedtak'
import { parserWithReplace } from '../../../../../utils/html-react-parser-utils'

import BeregningÅrslønnFlereArbeidsgivere from './beregning-årslønn-flere-arbeidsgivere'

const InntektInfo = ({ vedtak }: VedtakProps) => {
    const isServer = useContext(ArkiveringContext)
    const [open, setOpen] = useState<boolean>(isServer)
    const accordionRef = useRef(null)

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
        ekspanderbarKlikk(open, accordionRef, 'Inntekter lagt til grunn for sykepengene')
        setOpen(!open)
    }

    return (
        <Vis
            hvis={inntektMnd && inntektAr}
            render={() => (
                <Accordion>
                    <Accordion.Item open={open} ref={accordionRef}>
                        <Accordion.Header onClick={onButtonClick}>
                            <Heading size="small" level="3">
                                {tekst('utbetaling.inntekt.info.tittel')}
                            </Heading>
                        </Accordion.Header>
                        <Accordion.Content className={'bg-white'}>
                            <article data-cy={'inntekt-info-article'}>
                                <Label className="w-full">{storeTilStoreOgSmå(vedtak.orgnavn)}</Label>

                                <section
                                    data-cy="beregnet-månedslønn"
                                    className={'arkivering-flex-fix flex justify-between'}
                                >
                                    <BodyShort as="div" size="small" spacing>
                                        {tekst('utbetaling.inntekt.info.beregnet')}
                                    </BodyShort>
                                    <BodyShort as="div" size="small" spacing>
                                        {inntektMnd}
                                    </BodyShort>
                                </section>

                                <section
                                    data-cy="beregnet-årslønn"
                                    className={'arkivering-flex-fix flex justify-between'}
                                >
                                    <BodyShort as="div" size="small" spacing>
                                        {tekst('utbetaling.inntekt.info.omregnet')}
                                    </BodyShort>
                                    <BodyShort as="div" size="small">
                                        {inntektAr}
                                    </BodyShort>
                                </section>

                                <Vis
                                    hvis={harFlereArbeidsgivere(vedtak) === 'ja'}
                                    render={() => (
                                        <>
                                            <BeregningÅrslønnFlereArbeidsgivere vedtak={vedtak} />

                                            <section
                                                data-cy="samlet-årslønn"
                                                className="arkivering-flex-fix mt-4 flex justify-between border-t border-gray-400 pt-4"
                                            >
                                                <Label as="div" size="small">
                                                    {tekst('utbetaling.inntekt.samlet.årslønn')}
                                                </Label>
                                                <Label as="div" size="small">
                                                    {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                                </Label>
                                            </section>
                                        </>
                                    )}
                                />

                                <Vis
                                    hvis={skalViseSykepengegrunnlag}
                                    render={() => (
                                        <>
                                            <section
                                                data-cy="sykepengegrunnlag"
                                                className={'arkivering-flex-fix flex justify-between'}
                                            >
                                                <Label as="div" size="small">
                                                    {tekst('utbetaling.sykepengegrunnlag')}
                                                </Label>
                                                <Label as="div" size="small">
                                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                </Label>
                                            </section>

                                            <Vis
                                                hvis={vedtak.vedtak.begrensning === 'ER_6G_BEGRENSET'}
                                                render={() => (
                                                    <div className="mt-8 bg-orange-50 p-4">
                                                        <BodyLong size="small">
                                                            {parserWithReplace(tekst('utbetaling.redusert6G.tekst'))}
                                                        </BodyLong>
                                                    </div>
                                                )}
                                            />
                                        </>
                                    )}
                                />
                            </article>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            )}
        />
    )
}

export default InntektInfo
