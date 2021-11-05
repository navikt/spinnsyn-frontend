import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Vedtak from '../vedtak-side/vedtak'

export interface VedtakArkiveringProps {
    vedtak: RSVedtakWrapper,
    fnr: String
}

export const VedtakArkivering = ({ vedtak }: VedtakArkiveringProps) => {

    return (
        <ArkiveringContext.Provider value={true}>
            <div id="header">
                <h1 className="title">{tekst('vedtak.status.tittel')}</h1>
            </div>
            <div className="vedtak-arkivering">
                <Vedtak vedtak={vedtak} />
            </div>
            <div id="footer">
                <span className="soknadsid">Utbetalingsid her!</span>
                <span className="sidetall">side <span id="pagenumber"></span> av <span id="pagecount"></span></span>
            </div>
        </ArkiveringContext.Provider>
    )
}

