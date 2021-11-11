import { ContentContainer } from '@navikt/ds-react'
import React, { useEffect } from 'react'


function NotFound(): JSX.Element | boolean {
    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/syk/sykepenger'
        }

    }, [])

    return (
        <ContentContainer>
            <div>Fant ikke siden</div>
        </ContentContainer>
    )
}

export default NotFound
