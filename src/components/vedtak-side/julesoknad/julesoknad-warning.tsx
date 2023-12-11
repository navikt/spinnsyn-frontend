import { Alert } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { logEvent } from '../../amplitude/amplitude'

export const JulesoknadWarning = () => {
    useEffect(() => {
        logEvent('alert vist', { komponent: 'julesoknad warning' })
    }, [])
    return (
        <Alert variant="warning" className="mt-4">
            For å sikre at så mange som mulig skal få utbetalt sykepenger før jul, gjør vi det for noen mulig å sende
            søknaden før sykmeldingsperioden er over. Vi gjør oppmerksom på at det kan bety at det kan gå noe tid fra
            utbetalingen i desember til neste utbetaling.
        </Alert>
    )
}
