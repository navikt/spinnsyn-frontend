import { Element } from 'nav-frontend-typografi'
import React from 'react'

import { useAppStore } from '../../data/stores/app-store'
import { tekst } from '../../utils/tekster'
import Utbetaling from './utbetaling'

const Utbetalinger = () => {
    const { valgtVedtak } = useAppStore()

    return (
        <>
            <Element tag='h2' className='utbetaling-tittel'>{tekst('utbetaling.tittel')}</Element>
            {valgtVedtak?.vedtak.utbetalinger.map((utbetalinger, utbetalingIdx) =>
                utbetalinger.utbetalingslinjer.map((utbetaling, utbetalingLinjeIdx) =>
                    <Utbetaling utbetaling={utbetaling} key={`${utbetalingIdx}_${utbetalingLinjeIdx}`} />
                )
            )}
        </>
    )
}

export default Utbetalinger
