import './saksbehandlingstid-og-utbetaling.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const SaksbehandlingstidOgUtbetaling = () => {
    return (
        <Lenke className="utbetalinger-lenke"
            href={tekst('saksbehandlingstid.utbetaling.lenke.url')}
            target="_blank" rel="noreferrer noopener"
        >
            <Systemtittel tag="h3" className="txtlink">
                {tekst('saksbehandlingstid.utbetaling.tittel')}
            </Systemtittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default SaksbehandlingstidOgUtbetaling
