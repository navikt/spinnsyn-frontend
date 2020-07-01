import constate from 'constate'
import { useState } from 'react'

import { Soknad, Sykmelding, UnleashToggles } from '../../types/types'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ unleash, setUnleash ] = useState<UnleashToggles>()
    const [ soknader, setSoknader ] = useState<Soknad[]>([])
    const [ sykmeldinger, setSykmeldinger ] = useState<Sykmelding[]>([])

    return {
        unleash, setUnleash,
        soknader, setSoknader,
        sykmeldinger, setSykmeldinger,
    }
})
