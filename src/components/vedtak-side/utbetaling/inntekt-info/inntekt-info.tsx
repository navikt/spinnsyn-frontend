import { Element, Normaltekst } from 'nav-frontend-typografi'
import React from 'react'

import { harFlereArbeidsgivere } from '../../../../utils/har-flere-arbeidsgivere'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'
import Vis from '../../../vis'
import { VedtakProps } from '../../vedtak'

const InntektInfo = ({ vedtak }: VedtakProps) => {

    function formaterValuta(belop: number) {
        return ValutaFormat.format(Math.floor(belop)) + ' kr'
    }

    const inntektMnd = (vedtak.vedtak.inntekt)
        ? formaterValuta(vedtak.vedtak.inntekt)
        : undefined

    const inntektAr = (vedtak.vedtak.inntekt)
        ? formaterValuta(vedtak.vedtak.inntekt * 12)
        : undefined

    const skalViseDagsats = vedtak.vedtak.sykepengegrunnlag && harFlereArbeidsgivere(vedtak) == 'nei'
    const dagsats = vedtak.vedtak.sykepengegrunnlag && (vedtak.vedtak.sykepengegrunnlag / 260) || 0
    const skalVise6G = vedtak.vedtak.begrensning == 'ER_6G_BEGRENSET'
    const seksG = vedtak.vedtak.sykepengegrunnlag

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
                    <Vis hvis={skalVise6G}
                        render={() =>
                            <div className="inntekt__info__linje">
                                <Element tag="h4">
                                    {tekst('utbetaling.redusert.til.6G')}
                                </Element>
                                <Normaltekst tag="span">{formaterValuta(seksG!)}</Normaltekst>
                            </div>
                        }
                    />

                </section>
            }
        />
    )
}

export default InntektInfo
