import { BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
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
                                <Label spacing as="th" size="small">
                                    {tekst('utbetaling.inntekt.info.beregnet')}
                                </Label>
                                <BodyShort size="small" spacing as="td">{inntektMnd}</BodyShort>
                            </tr>
                            <tr>
                                <Label spacing as="th" size="small">
                                    {tekst('utbetaling.inntekt.info.omregnet')}
                                </Label>
                                <BodyShort spacing size="small" as="td">{inntektAr}</BodyShort>
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
                                        <Label spacing as="th" size="small">
                                            {tekst('utbetaling.inntekt.samlet.årslønn')}
                                        </Label>
                                        <BodyShort spacing size="small" as="td">
                                            {formaterValuta(vedtak.vedtak.grunnlagForSykepengegrunnlag!)}
                                        </BodyShort>
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
                                        <Heading size="xsmall" level="4" className="img-rad">
                                            <img alt="" src={'/syk/sykepenger/static/img/info-filled.svg'} />
                                            Redusert til 6G
                                        </Heading>
                                        <BodyLong spacing size="small">
                                            {parser(tekst('utbetaling.redusert.til.6G'))}
                                        </BodyLong>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <Label spacing as="th" size="small">
                                                        {tekst('utbetaling.sykepengegrunnlag')}
                                                    </Label>
                                                    <BodyShort spacing size="small" as="td">
                                                        {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                    </BodyShort>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                } />

                                <Vis hvis={vedtak.vedtak.begrensning !== 'ER_6G_BEGRENSET'} render={() =>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <Label spacing as="th">
                                                    {tekst('utbetaling.sykepengegrunnlag')}
                                                </Label>
                                                <BodyShort spacing size="small" as="td">
                                                    {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                                </BodyShort>
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
                                        <Label spacing as="th">{tekst('utbetaling.inntekt.info.dagsats')}</Label>
                                        <BodyShort spacing size="small" as="td">{formaterValuta(dagsats)}</BodyShort>
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
