import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import Vis from '../../../vis'
import { VedtakProps } from '../../vedtak'
import BeregningÅrslønnFlereArbeidsgivere from './beregning-årslønn-flere-arbeidsgivere'

const InntektInfo = ({ vedtak }: VedtakProps) => {

    const inntektMnd = (vedtak.vedtak.inntekt)
        ? formaterValuta(vedtak.vedtak.inntekt)
        : undefined

    const inntektAr = (vedtak.vedtak.inntekt)
        ? formaterValuta(vedtak.vedtak.inntekt * 12)
        : undefined

    const skalViseDagsats = vedtak.vedtak.sykepengegrunnlag && harFlereArbeidsgivere(vedtak) == 'nei'
    const dagsats = vedtak.vedtak.sykepengegrunnlag && (vedtak.vedtak.sykepengegrunnlag / 260) || 0
    const skalViseSykepengegrunnlag = vedtak.vedtak.sykepengegrunnlag

    return (
        <Vis hvis={inntektMnd && inntektAr}
            render={() =>
                <section className="inntekt__info">
                    <div className="inntekt__info__linje">
                        <Element tag="h4">
                            {tekst('utbetaling.inntekt.info.beregnet')}
                        </Element>
                        <Normaltekst tag="span">{inntektMnd}</Normaltekst>
                    </div>

                    <div className="inntekt__info__linje">
                        <Element tag="h4">
                            {tekst('utbetaling.inntekt.info.omregnet')}
                        </Element>
                        <Normaltekst tag="span">{inntektAr}</Normaltekst>
                    </div>

                    <Vis hvis={harFlereArbeidsgivere(vedtak) == 'ja'}
                        render={() =>
                            <>
                                <BeregningÅrslønnFlereArbeidsgivere vedtak={vedtak} />
                                <div className="inntekt__info__linje">
                                    <Element tag="h4">
                                        {tekst('utbetaling.inntekt.samlet.årslønn')}
                                    </Element>
                                    <Normaltekst tag="span">
                                        {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                    </Normaltekst>
                                </div>
                            </>
                        }
                    />

                    <Vis hvis={skalViseSykepengegrunnlag}
                        render={() =>
                            <div className="inntekt__info__linje">
                                <div>
                                    <Element tag="h4">
                                        {tekst('utbetaling.sykepengegrunnlag')}
                                    </Element>
                                    <Vis hvis={vedtak.vedtak.begrensning == 'ER_6G_BEGRENSET'} render={() =>
                                        <Normaltekst className={'inntekt__info__redusert'} tag="p">
                                            {tekst('utbetaling.redusert.til.6G')}
                                        </Normaltekst>
                                    } />

                                </div>
                                <Normaltekst
                                    tag="span">{formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}</Normaltekst>

                            </div>
                        }
                    />
                    <Vis hvis={skalViseDagsats}
                        render={() =>
                            <div className="inntekt__info__linje">
                                <Element tag="h4">
                                    {tekst('utbetaling.inntekt.info.dagsats')}
                                </Element>
                                <Normaltekst tag="span">{formaterValuta(dagsats)}</Normaltekst>
                            </div>
                        }
                    />

                </section>
            }
        />
    )
}

export default InntektInfo
