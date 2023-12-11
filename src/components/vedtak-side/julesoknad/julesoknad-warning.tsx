import { Alert } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { logEvent } from '../../amplitude/amplitude'

export const JulesoknadWarning = () => {
    useEffect(() => {
        logEvent('alert vist', { variant: 'warning', tekst: 'julesøknad utbetaling advarsel' })
    }, [])
    return (
        <Alert variant="warning" className="mt-4">
            For å sikre at så mange som mulig skal få utbetalt sykepenger før jul, gjør vi det mulig for noen å sende
            søknaden før sykmeldingsperioden er over. Vi gjør oppmerksom på at det kan bety at det kan gå noe tid fra
            utbetalingen i desember til neste utbetaling.
        </Alert>
    )
}
