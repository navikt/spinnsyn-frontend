import { BodyLong, BodyShort, Heading, Label } from '@navikt/ds-react'
import parser from 'html-react-parser'
import React from 'react'

import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../../utils/tekster'
import { formaterValuta } from '../../../../utils/valuta-utils'
import DagBeskrivelse from '../../../dager/dag-beskrivelse'
import DagTabell from '../../../dager/dag-tabell'
import EkspanderbarIntern from '../../../ekspanderbar/ekspanderbar-intern'
import Vis from '../../../vis'
import { VedtakProps } from '../../vedtak'
import BeregningInfo from '../beregning-info'
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
                        <caption>
                            <Heading size="small" level="4">
                                {tekst('utbetaling.inntekt.info.tittel')}
                            </Heading>
                            <BodyLong size="medium">
                                Her ser du hvilke inntekter vi har lagt til grunn for utbetalingen av sykepengene dine.
                            </BodyLong>
                        </caption>
                        <tbody>
                            <tr>
                                <Label as="th" size="small">
                                    {tekst('utbetaling.inntekt.info.beregnet')}
                                </Label>
                                <BodyShort size="small" spacing as="td">{inntektMnd}</BodyShort>
                            </tr>
                            <tr>
                                <Label as="th" size="small">
                                    {tekst('utbetaling.inntekt.info.omregnet')}
                                </Label>
                                <BodyShort size="small" as="td">{inntektAr}</BodyShort>
                            </tr>
                        </tbody>
                    </table>

                    <Vis hvis={harFlereArbeidsgivere(vedtak) === 'ja'}
                        render={() =>
                            <table className="flere-arbeidsgivere">
                                <Heading size="small" as="caption">
                                    {tekst('utbetaling.andre.arbeidsgivere.tittel')}
                                </Heading>
                                <tbody>
                                    <BeregningÅrslønnFlereArbeidsgivere vedtak={vedtak} />
                                    <tr>
                                        <Label as="th" size="small">
                                            {tekst('utbetaling.inntekt.samlet.årslønn')}
                                        </Label>
                                        <BodyShort size="small" as="td">
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
                                        <img alt="" src={'/syk/sykepenger/static/img/info-filled.svg'} />
                                        <div>
                                            <Heading size="xsmall" level="4">
                                                {tekst('utbetaling.redusert6G.tittel')}
                                            </Heading>
                                            <BodyLong size="small">
                                                {parser(tekst('utbetaling.redusert6G.tekst'))}
                                            </BodyLong>
                                        </div>
                                    </div>
                                } />

                                <Vis hvis={vedtak.vedtak.begrensning !== 'ER_6G_BEGRENSET'} render={() =>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <Label as="th">
                                                    {tekst('utbetaling.sykepengegrunnlag')}
                                                </Label>
                                                <BodyShort size="small" as="td">
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
                                        <Label as="th" size="small">
                                            {tekst('utbetaling.sykepengegrunnlag')}
                                        </Label>
                                        <BodyShort spacing size="small" as="td">
                                            {formaterValuta(vedtak.vedtak.sykepengegrunnlag!)}
                                        </BodyShort>
                                    </tr>
                                    <tr>
                                        <Label size="small" as="th">{tekst('utbetaling.inntekt.info.dagsats')}</Label>
                                        <BodyShort size="small" as="td">{formaterValuta(dagsats)}</BodyShort>
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
