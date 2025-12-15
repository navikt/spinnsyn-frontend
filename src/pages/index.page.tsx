import { useRouter } from 'next/router'
import React from 'react'
import { Alert } from '@navikt/ds-react'

import { RedirectTilForsiden } from '../components/redirect'
import Listevisning from '../components/listevisning/listevisning'
import VedtakSide from '../components/vedtak-side/vedtak-side'
import { ArkiveringContext } from '../context/arkivering-context'
import useVedtak from '../hooks/useVedtak'
import { InterneInfo } from '../components/interne-info/InterneInfo'
import { beskyttetSideUtenProps } from '../auth/beskyttetSide'
import { ScrollProvider } from '../context/scroll-context'

export default function Index() {
    return (
        <ArkiveringContext.Provider value={false}>
            <ScrollProvider>
                <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                    <InterneInfo />
                    <Innhold />
                </main>
            </ScrollProvider>
        </ArkiveringContext.Provider>
    )
}

function Innhold() {
    const router = useRouter()
    const { id } = router.query
    const { data, isError } = useVedtak()

    const enkeltVedtak = data?.alleVedtak?.find((v) => v.id == id)
    const vedtakIkkeFunnetMedId = id && !enkeltVedtak && data

    if (vedtakIkkeFunnetMedId) {
        return <RedirectTilForsiden />
    } else if (enkeltVedtak && data) {
        return <VedtakSide vedtak={enkeltVedtak} alleVedtak={data.alleVedtak} />
    } else if (isError) {
        return (
            <Alert variant="error">
                Noe gikk galt under henting av svar på sykepengesøknader. Vennligst prøv igjen senere.
            </Alert>
        )
    } else {
        return <Listevisning alleVedtak={data?.alleVedtak} />
    }
}

export const getServerSideProps = beskyttetSideUtenProps
