import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { useRouter } from 'next/router'
import React from 'react'

import InterneHeader from '../components/interne-header/InterneHeader'
import { RedirectTilForsiden } from '../components/redirect'
import VedtakListe from '../components/vedtak-liste/vedtak-liste'
import VedtakSide from '../components/vedtak-side/vedtak-side'
import { ArkiveringContext } from '../context/arkivering-context'
import { prefetchVedtak } from '../prefetching/prefetchVedtak'
import useVedtak from '../query-hooks/useVedtak'
import { PrefetchResults } from '../types/prefecthing'
import { spinnsynFrontendInterne } from '../utils/environment'


const Index = ({ sykmeldtFnr, dehydratedState }: PrefetchResults) => {
    if (!sykmeldtFnr && spinnsynFrontendInterne()) {
        return (
            <IndexInterneUtenFnr sykmeldtFnr={sykmeldtFnr} dehydratedState={dehydratedState} />
        )
    }
    return (<IndexMedData sykmeldtFnr={sykmeldtFnr} dehydratedState={dehydratedState} />)
}

const IndexInterneUtenFnr = ({ sykmeldtFnr }: PrefetchResults) => {

    return (
        <ArkiveringOgMain sykmeldtFnr={sykmeldtFnr}>
            <AlertStripeAdvarsel>
                Du har ingen aktiv person åpen i modia. Åpne en person i modia og refresh denne siden.
            </AlertStripeAdvarsel>
        </ArkiveringOgMain>
    )

}

const IndexMedData = ({ sykmeldtFnr }: PrefetchResults) => {
    const router = useRouter()
    const { id } = router.query
    const { data: vedtak } = useVedtak()

    if (id) {
        const vedtaket = vedtak?.find((v) => v.id == id)
        if (!vedtaket) {
            return (<RedirectTilForsiden />)
        }
        return (
            <ArkiveringOgMain sykmeldtFnr={sykmeldtFnr}>
                <VedtakSide vedtak={vedtaket} />
            </ArkiveringOgMain>
        )
    }
    return (
        <ArkiveringOgMain sykmeldtFnr={sykmeldtFnr}>
            <VedtakListe />
        </ArkiveringOgMain>
    )
}

interface ArkiveringOgMainProps {
    children: React.ReactNode;
    sykmeldtFnr?: string
}

const ArkiveringOgMain = ({ children, sykmeldtFnr }: ArkiveringOgMainProps) => (
    <>
        {spinnsynFrontendInterne() && <InterneHeader fnr={sykmeldtFnr} />}
        <ArkiveringContext.Provider value={false}>
            <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                {children}
            </main>
        </ArkiveringContext.Provider>
    </>
)

export const getServerSideProps = prefetchVedtak


export default Index
