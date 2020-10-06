import './saksbehandlingstid-og-utbetaling.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const SaksbehandlingstidOgUtbetaling = () => {
    const url = 'https://www.nav.no/no/nav-og-samfunn/kontakt-nav/utbetalinger/utbetalinger/utbetalingsdatoer-feriepenger-og-skattetrekk/sykepenger_kap'

    return (
        <Lenke href={url} target="_blank" rel="noreferrer noopener" className="utbetalinger-lenke">
            <Systemtittel tag="h3" className="txtlink">
                {tekst('saksbehandlingstid.utbetaling.tittel')}
            </Systemtittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default SaksbehandlingstidOgUtbetaling
