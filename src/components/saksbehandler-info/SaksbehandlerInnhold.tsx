import { Alert, Loader } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React from 'react'

import useVedtak from '../../hooks/useVedtak'
import { FetchError } from '../../utils/fetch'
import VedtakSide from '../vedtak-side/vedtak-side'

export function SaksbehandlerInnhold(): React.JSX.Element {
    const router = useRouter()
    const { id } = router.query
    const { data, error, isLoading } = useVedtak()

    if (typeof id !== 'string') {
        return <Alert variant="info">Åpne vedtaket fra Speil for å se hva den sykmeldte har fått.</Alert>
    }
    if (isLoading) {
        return <Loader title="Henter vedtaket" />
    }
    if (error instanceof FetchError && error.status === 403) {
        return <Alert variant="warning">Du har ikke tilgang til å se dette vedtaket.</Alert>
    }
    if (error instanceof FetchError && error.status === 400) {
        return <Alert variant="warning">Lenken til vedtaket er ugyldig. Åpne vedtaket fra Speil på nytt.</Alert>
    }
    if (error instanceof FetchError && error.status === 404) {
        return <Alert variant="info">Vedtaket er ikke tilgjengelig ennå. Prøv igjen om litt.</Alert>
    }

    const vedtak = data?.alleVedtak.find((v) => v.id === id)
    if (error || !data || !vedtak) {
        return <Alert variant="error">Vi klarte ikke å hente vedtaket. Prøv igjen senere.</Alert>
    }

    return (
        <>
            <Alert variant="info" className="mb-4">
                Du ser vedtaket slik den sykmeldte ser det.
            </Alert>
            <VedtakSide vedtak={vedtak} alleVedtak={data.alleVedtak} />
        </>
    )
}
