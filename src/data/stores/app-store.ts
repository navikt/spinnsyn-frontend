import constate from 'constate'
import { useState } from 'react'

import { Soknad } from '../../types/types'
import { Vedtak } from '../../types/vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>()
    const [ vedtak, setVedtak ] = useState<Vedtak[]>([])
    const [ valgtVedtak, setValgtVedtak ] = useState<Vedtak>()
    const [ feilState, setFeilState ] = useState<boolean>(false)

    return {
        soknader, setSoknader,
        valgtSoknad, setValgtSoknad,
        vedtak, setVedtak,
        valgtVedtak, setValgtVedtak,
        feilState, setFeilState,
    }
})
