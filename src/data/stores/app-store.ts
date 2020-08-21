import constate from 'constate'
import { useState } from 'react'

import { Soknad, Sykmelding } from '../../types/types'
import { Vedtak } from '../../types/vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ valgtSoknad, setValgtSoknad ] = useState<Soknad>()
    const [ valgtSykmelding, setValgtSykmelding ] = useState<Sykmelding>()
    const [ vedtak, setVedtak ] = useState<Vedtak[]>([])
    const [ valgtVedtak, setValgtVedtak ] = useState<Vedtak>()
    const [ feilState, setFeilState ] = useState<boolean>(false)

    return {
        soknader, setSoknader,
        sykmeldinger, setSykmeldinger,
        valgtSoknad, setValgtSoknad,
        valgtSykmelding, setValgtSykmelding,
        feilState, setFeilState,
        vedtak, setVedtak,
        valgtVedtak, setValgtVedtak,
    }
})
