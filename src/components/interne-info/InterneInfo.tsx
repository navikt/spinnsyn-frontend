import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'

import useVedtak from '../../hooks/useVedtak'
import { spinnsynFrontendInterne } from '../../utils/environment'

export function InterneInfo(): React.JSX.Element | null {
    const { data, isLoading } = useVedtak()

    if (!spinnsynFrontendInterne()) {
        return null
    }
    if (isLoading) {
        return <Loader />
    }
    if (data) {
        if (!data.sykmeldtFnr) {
            return (
                <Alert variant="warning">
                    Du har ingen aktiv person åpen i modia. Åpne en person i modia og refresh denne siden.
                </Alert>
            )
        }
        const fnrForVisning = `${data.sykmeldtFnr.slice(0, 6)} ${data.sykmeldtFnr.slice(6)}`
        return <Alert variant="info">{`Slik ser svar på søknader ut for ${fnrForVisning}`}</Alert>
    }
    return null
}
