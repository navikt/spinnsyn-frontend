import './utbetalinger.less'

import { Element, Normaltekst,Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import Utbetaling from './utbetaling'

const Utbetalinger = () => {
    const { valgtVedtak } = useAppStore()

    return (
        <section className="vedtak__utbetaling">
            <Undertittel tag="h3" className="vedtak__utbetaling--tittel">
                {tekst('utbetaling.tittel')}
            </Undertittel>
            <Element>
                {tekst('utbetaling.utbetales-av')}
            </Element>
            <Normaltekst className="vedtak__utbetaling--tekst">
                {tekst('utbetaling.utbetales-av.tekst')}
            </Normaltekst>
            {valgtVedtak?.vedtak.utbetalinger.map((utbetalinger, utbetalingIdx) =>
                utbetalinger.utbetalingslinjer.map((utbetaling, utbetalingLinjeIdx) =>
                    <Utbetaling utbetaling={utbetaling} key={`${utbetalingIdx}_${utbetalingLinjeIdx}`} />
                )
            )}
        </section>
    )
}

export default Utbetalinger
