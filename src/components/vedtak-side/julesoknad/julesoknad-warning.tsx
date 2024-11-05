import { Alert } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { logEvent } from '../../amplitude/amplitude'

export const JulesoknadWarning = () => {
    useEffect(() => {
        logEvent('alert vist', { variant: 'warning', tekst: 'julesøknad utbetaling advarsel' })
    }, [])
    return (
        <Alert variant="warning" className="mt-4">
            Vi har utbetalt sykepengene dine tidligere enn vanlig. Vær derfor oppmerksom på at det kan ta litt tid før
            en eventuell neste utbetaling.
        </Alert>
    )
}
