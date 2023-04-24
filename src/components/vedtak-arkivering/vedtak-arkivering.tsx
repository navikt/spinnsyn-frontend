import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import Vedtak from '../vedtak-side/vedtak'

export const VedtakArkivering = ({ vedtak }: { vedtak: RSVedtakWrapper }) => {
    return (
        <ArkiveringContext.Provider value={true}>
            <Vedtak vedtak={vedtak} />
        </ArkiveringContext.Provider>
    )
}
