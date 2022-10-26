import { ContentContainer } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'

function NotFound(): JSX.Element | boolean {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent side' }])

    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/syk/sykepenger'
        }
    }, [])

    return (
        <ContentContainer>
            <h1>Fant ikke siden</h1>
        </ContentContainer>
    )
}

export default NotFound
