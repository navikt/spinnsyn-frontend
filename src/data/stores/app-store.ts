import constate from 'constate'
import { useState } from 'react'

import { RSVedtakWrapper } from '../../types/rs-types/rs-vedtak'

export const [ AppStoreProvider, useAppStore ] = constate(() => {
    const [ valgtVedtak, setValgtVedtak ] = useState<RSVedtakWrapper>()

    return {
        valgtVedtak, setValgtVedtak,
    }
})
