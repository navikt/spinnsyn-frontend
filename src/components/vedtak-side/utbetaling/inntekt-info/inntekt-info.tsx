import parser from 'html-react-parser'
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

    const skalViseDagsats = vedtak.vedtak.sykepengegrunnlag && harFlereArbeidsgivere(vedtak) === 'nei'
    const dagsats = vedtak.vedtak.sykepengegrunnlag && (vedtak.vedtak.sykepengegrunnlag / 260) || 0
    const skalViseSykepengegrunnlag = vedtak.vedtak.sykepengegrunnlag

    return (
        <Vis hvis={inntektMnd && inntektAr}
            render={() =>
                <section className="inntekt__info">
                    <table>
                        <caption>{tekst('utbetaling.inntekt.info.tittel')}</caption>
                        <tbody>
                            <tr>
                                <Element tag="th">
                                    {tekst('utbetaling.inntekt.info.beregnet')}
                                </Element>
                                <Normaltekst tag="td">{inntektMnd}</Normaltekst>
                            </tr>
                            <tr>
                                <Element tag="th">
                                    {tekst('utbetaling.inntekt.info.omregnet')}
                                </Element>
                                <Normaltekst tag="td">{inntektAr}</Normaltekst>
                            </tr>
                        </tbody>
                    </table>

                    <Vis hvis={harFlereArbeidsgivere(vedtak) === 'ja'}
                        render={() =>
                            <table className="flere-arbeidsgivere">
                                <caption>{tekst('utbetaling.andre.arbeidsgivere.tittel')}</caption>
                                <tbody>
                                    <BeregningÅrslønnFlereArbeidsgivere vedtak={vedtak} />
                                    <tr>
                                        <Element tag="th">
                                            {tekst('utbetaling.inntekt.samlet.årslønn')}
                                        </Element>
                                        <Normaltekst tag="td">
                                            {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                        </Normaltekst>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    />

                    <Vis hvis={skalViseSykepengegrunnlag}
                        render={() =>
                            <>
                                <Vis hvis={vedtak.vedtak.begrensning === 'ER_6G_BEGRENSET'} render={() =>
                                    <div className="redusert_sykepengegrunnlag">
                                        <Element tag="h4" className="img-rad">
                                            <img alt="" src={'/syk/sykepenger/static/img/info-filled.svg'} />
                                            Redusert til 6G
                                        </Element>
                                        <Normaltekst>
                                            {parser(tekst('utbetaling.redusert.til.6G'))}
                                        </Normaltekst>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <Element tag="th">
                                                        {tekst('utbetaling.sykepengegrunnlag')}
                                                    </Element>
                                                    <Normaltekst tag="td">
                                                        {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                    </Normaltekst>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                } />

                                <Vis hvis={vedtak.vedtak.begrensning !== 'ER_6G_BEGRENSET'} render={() =>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <Element tag="th">
                                                    {tekst('utbetaling.sykepengegrunnlag')}
                                                </Element>
                                                <Normaltekst tag="td">
                                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                </Normaltekst>
                                            </tr>
                                        </tbody>
                                    </table>
                                } />
                            </>
                        }
                    />

                    <Vis hvis={skalViseDagsats}
                        render={() =>
                            <table className="dagsats">
                                <tbody>
                                    <tr>
                                        <Element tag="th">{tekst('utbetaling.inntekt.info.dagsats')}</Element>
                                        <Normaltekst tag="td">{formaterValuta(dagsats)}</Normaltekst>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    />
                </section>
            }
        />
    )
}

export default InntektInfo
