import './inntekt-info.less'

import { Element, Normaltekst } from 'nav-frontend-typografi'
import React  from 'react'

import Vis from '../../../../components/vis'
import { useAppStore } from '../../../../data/stores/app-store'
import { tekst } from '../../../../utils/tekster'
import { ValutaFormat } from '../../../../utils/valuta-utils'

const InntektInfo = () => {
    const { valgtVedtak } = useAppStore()

    function inntektMnd() {
        return (valgtVedtak?.vedtak.inntekt)
            ? ValutaFormat.format(Math.floor(valgtVedtak!.vedtak.inntekt!)) + ' kr'
            : undefined
    }

    function inntektAr() {
        return (valgtVedtak?.vedtak.inntekt)
            ? ValutaFormat.format(Math.floor(valgtVedtak.vedtak.inntekt * 12)) + ' kr'
            : undefined
    }

    function dagsats() {
        return (valgtVedtak?.vedtak.sykepengegrunnlag)
            ? ValutaFormat.format(Math.floor(valgtVedtak?.vedtak.sykepengegrunnlag / 260)) + ' kr'
            : undefined
    }

    function grunnlag() {
        return (valgtVedtak?.vedtak.sykepengegrunnlag)
            ? ValutaFormat.format(Math.floor(valgtVedtak.vedtak.sykepengegrunnlag)) + ' kr'
            : undefined
    }

    return (
        <section className="inntekt__info">
            <Vis hvis={inntektMnd() && inntektAr()}
                render={() =>
                    <>
                        <div className="inntekt__info__linje">
                            <Element tag="h4">
                                {tekst('utbetaling.inntekt.info.beregnet')}
                            </Element>
                            <Normaltekst tag="span">{inntektMnd()}</Normaltekst>
                        </div>
                        <div className="inntekt__info__linje">
                            <Element tag="h4">
                                {tekst('utbetaling.inntekt.info.omregnet')}
                            </Element>
                            <Normaltekst tag="span">{inntektAr()}</Normaltekst>
                        </div>
                        <div className="inntekt__info__linje">
                            <Element tag="h4">
                                {tekst('utbetaling.inntekt.info.dagsats')}
                            </Element>
                            <Normaltekst tag="span">{dagsats()}</Normaltekst>
                        </div>
                        <Vis hvis={grunnlag() && grunnlag() !== inntektAr()}
                            render={() =>
                                <div className="inntekt__info__linje">
                                    <Element tag="h4">
                                        {tekst('utbetaling.inntekt.info.redusert')}
                                    </Element>
                                    <Normaltekst tag="span">{grunnlag()}</Normaltekst>
                                </div>
                            }
                        />
                    </>
                }
            />
        </section>
    )
}

export default InntektInfo
