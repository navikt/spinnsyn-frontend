import { ContentContainer } from '@navikt/ds-react'
import React from 'react'

function NotFound(): JSX.Element | boolean {
    return (
        <ContentContainer>
            <div>Fant ikke siden</div>
        </ContentContainer>
    )
}

export default NotFound
