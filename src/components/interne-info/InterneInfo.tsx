import { Alert } from '@navikt/ds-react'
import React from 'react'

export function InterneInfo({ fnr }: { fnr: string }): JSX.Element {
    const fnrForVisning = `${fnr.slice(0, 6)} ${fnr.slice(6)}`
    return <Alert variant="info">{`Slik ser svar på søknader ut for ${fnrForVisning}`}</Alert>
}
