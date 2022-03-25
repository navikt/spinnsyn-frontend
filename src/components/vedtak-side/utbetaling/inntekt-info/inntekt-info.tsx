import { Accordion, BodyLong, BodyShort, Button, Heading, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React, { useContext, useRef, useState } from 'react'

import { ArkiveringContext } from '../../../../context/arkivering-context'
import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { storeTilStoreOgSmå } from '../../../../utils/store-små'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import { ekspanderbarKlikk } from '../../../ekspanderbar/ekspander-utils'
import Vis from '../../../vis'
import { VedtakProps } from '../../vedtak'
import BeregningÅrslønnFlereArbeidsgivere from './beregning-årslønn-flere-arbeidsgivere'

const InntektInfo = ({ vedtak }: VedtakProps) => {
    const isServer = useContext(ArkiveringContext)
    const [ open, setOpen ] = useState<boolean>(isServer)
    const accordionRef = useRef(null)


    const finnRiktigInntekt = () => {
        const grunnlagPerAg = vedtak.vedtak.grunnlagForSykepengegrunnlagPerArbeidsgiver
        if (grunnlagPerAg && vedtak.vedtak.organisasjonsnummer) {
            const inntektFraGrunnlagPerAg = grunnlagPerAg [ vedtak.vedtak.organisasjonsnummer  ]
            if (inntektFraGrunnlagPerAg) {
                return inntektFraGrunnlagPerAg / 12
            }
        }
        return vedtak.vedtak.inntekt
    }

    const inntekt = finnRiktigInntekt()
    const inntektMnd = (inntekt) ? formaterValuta(inntekt) : undefined
    const inntektAr = (inntekt) ? formaterValuta(inntekt * 12) : undefined

    const skalViseSykepengegrunnlag = vedtak.vedtak.sykepengegrunnlag

    const onButtonClick = () => {
        ekspanderbarKlikk(open, accordionRef, 'Inntekter lagt til grunn for sykepengene')
        setOpen(!open)
    }

    return (
        <Vis hvis={inntektMnd && inntektAr}
            render={() =>
                <Accordion className="inntekt__info">
                    <Accordion.Item open={open} ref={accordionRef}>
                        <Accordion.Header onClick={onButtonClick}>
                            <Heading size="small" level="4">
                                {tekst('utbetaling.inntekt.info.tittel')}
                            </Heading>
                        </Accordion.Header>
                        <Accordion.Content>
                            <article className="arbgiver_inntekt">
                                <Label className="arbgiver_navn">
                                    {storeTilStoreOgSmå(vedtak.orgnavn)}
                                </Label>

                                <section>
                                    <BodyShort as="div" size="small">
                                        {tekst('utbetaling.inntekt.info.beregnet')}
                                    </BodyShort>
                                    <BodyShort as="div" size="small">{inntektMnd}</BodyShort>
                                </section>

                                <section>
                                    <BodyShort as="div" size="small">
                                        {tekst('utbetaling.inntekt.info.omregnet')}
                                    </BodyShort>
                                    <BodyShort as="div" size="small">{inntektAr}</BodyShort>
                                </section>

                                <Vis hvis={harFlereArbeidsgivere(vedtak) === 'ja'}
                                    render={() =>
                                        <>
                                            <BeregningÅrslønnFlereArbeidsgivere vedtak={vedtak} />

                                            <section className="arbgiver">
                                                <Label as="div" size="small">
                                                    {tekst('utbetaling.inntekt.samlet.årslønn')}
                                                </Label>
                                                <Label as="div" size="small">
                                                    {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                                </Label>
                                            </section>
                                        </>
                                    }
                                />

                                <Vis hvis={skalViseSykepengegrunnlag}
                                    render={() =>
                                        <>
                                            <section>
                                                <Label as="div" size="small">
                                                    {tekst('utbetaling.sykepengegrunnlag')}
                                                </Label>
                                                <Label as="div" size="small">
                                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                </Label>
                                            </section>

                                            <Vis hvis={vedtak.vedtak.begrensning === 'ER_6G_BEGRENSET'} render={() =>
                                                <div className="redusert_sykepengegrunnlag">
                                                    <BodyLong size="small">
                                                        {parser(tekst('utbetaling.redusert6G.tekst'))}
                                                    </BodyLong>
                                                </div>
                                            } />
                                        </>
                                    }
                                />
                            </article>

                            <div className="knapperad">
                                <Button variant="tertiary" size="small" onClick={onButtonClick}>
                                     Skjul
                                </Button>
                            </div>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            }
        />
    )
}

export default InntektInfo
