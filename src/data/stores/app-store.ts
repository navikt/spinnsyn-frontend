import constate from 'constate'
import { useState } from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'
import { Soknad } from '../../types/types'
import { Vedtak } from '../../types/vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>()
    const [ vedtak, setVedtak ] = useState<Vedtak[]>([])
    const [ rsVedtak, setRsVedtak ] = useState<RSVedtakWrapper[]>([])
    const [ valgtVedtak, setValgtVedtak ] = useState<RSVedtakWrapper>()
    const [ feilState, setFeilState ] = useState<boolean>(false)

    return {
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        vedtak, setVedtak,
        rsVedtak, setRsVedtak,
        valgtVedtak, setValgtVedtak,
        feilState, setFeilState,
    }
})
