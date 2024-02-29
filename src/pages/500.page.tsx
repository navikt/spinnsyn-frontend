import { Page } from '@navikt/ds-react'
import React from 'react'

import { useUpdateBreadcrumbs } from '../hooks/useBreadcrumbs'

function ServerError(): JSX.Element | boolean {
    useUpdateBreadcrumbs(() => [{ title: 'Ukjent feil' }])

    return (
        <Page>
            <Page.Block width="xl">
                <div>Det oppsto en uforventet feil</div>
            </Page.Block>
        </Page>
    )
}

export default ServerError
