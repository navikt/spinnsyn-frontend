import { Page } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'

function NotFound() {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent side' }])

    useEffect(() => {
        if (window.location.pathname === '/') {
            window.location.pathname = '/syk/sykepenger'
        }
    }, [])

    return (
        <Page>
            <Page.Block width="xl">
                <div>Fant ikke siden</div>
            </Page.Block>
        </Page>
    )
}

export default NotFound
