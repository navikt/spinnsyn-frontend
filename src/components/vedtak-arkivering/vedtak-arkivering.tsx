import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { tekst } from '../../utils/tekster'
import Vedtak from '../vedtak-side/vedtak'

export interface VedtakArkiveringProps {
    vedtak: RSVedtakWrapper,
    fnr: String,
    utbetalingId: String,
}

export const VedtakArkivering = ({ vedtak, fnr, utbetalingId }: VedtakArkiveringProps) => {

    return (
        <ArkiveringContext.Provider value={true}>

            <div className="vedtak-arkivering">
                <div id="ark-header">
                    <h1 className="title">{tekst('vedtak.status.tittel')}</h1>
                </div>
                <div className="personinfo">
                    <div className="persontekst">
                        <div className="persontekst__sidetopp">
                            <img src={'/syk/sykepenger/static/img/person.svg'} className="personikon" />
                            <div className="persontekst__personalia">
                                <p className="id">{fnr}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Vedtak vedtak={vedtak} />
            </div>
            <div id="ark-footer">
                <span className="utbetalingId">{utbetalingId}</span>
                <span className="sidetall">side <span id="pagenumber"></span> av <span id="pagecount"></span></span>
            </div>
        </ArkiveringContext.Provider>
    )
}

