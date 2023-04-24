import { Alert } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import React from 'react'

import { RedirectTilForsiden } from '../components/redirect'
import Listevisning from '../components/listevisning/listevisning'
import VedtakSide from '../components/vedtak-side/vedtak-side'
import { ArkiveringContext } from '../context/arkivering-context'
import useVedtak from '../hooks/useVedtak'
import { prefetchVedtak } from '../prefetching/prefetchVedtak'
import { PrefetchResults } from '../types/prefecthing'
import { spinnsynFrontendInterne } from '../utils/environment'
import { InterneInfo } from '../components/interne-info/InterneInfo'

const Index = ({ sykmeldtFnr }: PrefetchResults) => {
    if (spinnsynFrontendInterne()) {
        if (sykmeldtFnr) {
            return (
                <IndexMedData>
                    <InterneInfo fnr={sykmeldtFnr} />
                </IndexMedData>
            )
        } else {
            return (
                <ArkiveringContextOgMain>
                    <Alert variant="warning">
                        Du har ingen aktiv person åpen i modia. Åpne en person i modia og refresh denne siden.
                    </Alert>
                </ArkiveringContextOgMain>
            )
        }
    }

    return <IndexMedData />
}

const IndexMedData = ({ children }: { children?: React.ReactNode }) => {
    const router = useRouter()
    const { id } = router.query
    const { data: vedtak } = useVedtak()

    if (id) {
        const vedtaket = vedtak?.find((v) => v.id == id)
        if (!vedtaket) {
            return <RedirectTilForsiden />
        }
        return (
            <ArkiveringContextOgMain>
                {children}
                <VedtakSide vedtak={vedtaket} />
            </ArkiveringContextOgMain>
        )
    }
    return (
        <ArkiveringContextOgMain>
            {children}
            <Listevisning />
        </ArkiveringContextOgMain>
    )
}

const ArkiveringContextOgMain = ({ children }: { children: React.ReactNode }) => (
    <ArkiveringContext.Provider value={false}>
        <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
            {children}
        </main>
    </ArkiveringContext.Provider>
)

export const getServerSideProps = prefetchVedtak

export default Index
