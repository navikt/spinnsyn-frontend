import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import Vedtak from '../vedtak-side/vedtak'
import { korrigerYrkesaktivitetstype } from '../../utils/korrigerYrkesaktivitetstype'

export const VedtakArkivering = ({
    vedtak,
    alleVedtak,
}: {
    vedtak: RSVedtakWrapper
    alleVedtak: RSVedtakWrapper[]
}) => {
    return (
        <ArkiveringContext.Provider value={true}>
            <Vedtak
                vedtak={korrigerYrkesaktivitetstype(vedtak)}
                alleVedtak={alleVedtak.map((v) => korrigerYrkesaktivitetstype(v))}
            />
        </ArkiveringContext.Provider>
    )
}
