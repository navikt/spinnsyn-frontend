import constate from 'constate'
import { useState } from 'react'

import { Soknad, Sykmelding, UnleashToggles } from '../../types/types'
import { Vedtak } from '../../types/Vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ unleash, setUnleash ] = useState<UnleashToggles>()
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])
    const [ vedtak, setVedtak ] = useState<Vedtak[]>([])

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        sykmeldinger, setSykmeldinger,
        vedtak, setVedtak,
    }
})
