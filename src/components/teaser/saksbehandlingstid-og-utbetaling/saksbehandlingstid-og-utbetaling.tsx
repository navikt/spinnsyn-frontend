import './saksbehandlingstid-og-utbetaling.less'

import { HoyreChevron } from 'nav-frontend-chevron'
import Lenke from 'nav-frontend-lenker'
import { Undertittel } from 'nav-frontend-typografi'
import React from 'react'

import { tekst } from '../../../utils/tekster'

const SaksbehandlingstidOgUtbetaling = () => {
    return (
        <Lenke className="utbetalinger-lenke"
            href={tekst('saksbehandlingstid.utbetaling.lenke.url')}
            target="_blank" rel="noreferrer noopener"
        >
            <Undertittel tag="h2" className="txtlink">
                {tekst('saksbehandlingstid.utbetaling.tittel')}
            </Undertittel>
            <HoyreChevron />
        </Lenke>
    )
}

export default SaksbehandlingstidOgUtbetaling
