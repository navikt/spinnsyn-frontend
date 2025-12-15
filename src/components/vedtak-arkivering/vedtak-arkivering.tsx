import React from 'react'

import { ArkiveringContext } from '../../context/arkivering-context'
import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak-felles'
import Vedtak from '../vedtak-side/vedtak'
import { ScrollProvider } from '../../context/scroll-context'
import { hentDagerPaaVedtak } from '../../daglogikk/hentDagerPaaVedtak'

export const VedtakArkivering = ({
    vedtak,
    alleVedtak,
}: {
    vedtak: RSVedtakWrapper
    alleVedtak: RSVedtakWrapper[]
}) => {
    return (
        <ArkiveringContext.Provider value={true}>
            <ScrollProvider>
                <Vedtak
                    vedtak={hentDagerPaaVedtak(vedtak)}
                    alleVedtak={alleVedtak?.map((v) => hentDagerPaaVedtak(v))}
                />
            </ScrollProvider>
        </ArkiveringContext.Provider>
    )
}
