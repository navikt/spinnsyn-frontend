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

    function grunnlag() {
        return (valgtVedtak?.vedtak.sykepengegrunnlag)
            ? ValutaFormat.format(Math.floor(valgtVedtak.vedtak.sykepengegrunnlag)) + ' kr'
            : undefined
    }

    return (
        <section className="inntekt__info">
            <Element className="inntekt__info__tittel">
                {tekst('utbetaling.inntekt.info.tittel')}
            </Element>
            <Vis hvis={inntektMnd() && inntektAr()}
                render={() =>
                    <>
                        <div className="inntekt__info__linje">
                            <Normaltekst tag="span">
                                {tekst('utbetaling.inntekt.info.beregnet')}
                            </Normaltekst>
                            <Normaltekst tag="span">{inntektMnd()}</Normaltekst>
                        </div>
                        <div className="inntekt__info__linje">
                            <Normaltekst tag="span">
                                {tekst('utbetaling.inntekt.info.omregnet')}
                            </Normaltekst>
                            <Normaltekst tag="span">{inntektAr()}</Normaltekst>
                        </div>
                        <Vis hvis={grunnlag() && grunnlag() !== inntektAr()}
                            render={() =>
                                <div className="inntekt__info__linje">
                                    <Normaltekst tag="span">
                                        {tekst('utbetaling.inntekt.info.redusert')}
                                    </Normaltekst>
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
