import { useRouter } from 'next/router'
import React from 'react'

import { RedirectTilForsiden } from '../components/redirect'
import VedtakListe from '../components/vedtak-liste/vedtak-liste'
import VedtakSide from '../components/vedtak-side/vedtak-side'
import { ArkiveringContext } from '../context/arkivering-context'
import { prefetchVedtak } from '../prefetching/prefetchVedtak'
import useVedtak from '../query-hooks/useVedtak'


const Index = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: vedtak } = useVedtak()

    if (id) {
        const vedtaket = vedtak?.find((v) => v.id == id)
        if (!vedtaket) {
            return (<RedirectTilForsiden />)
        }
        return (
            <ArkiveringOgMain>
                <VedtakSide vedtak={vedtaket} />
            </ArkiveringOgMain>
        )
    }
    return (
        <ArkiveringOgMain>
            <VedtakListe />
        </ArkiveringOgMain>
    )
}

interface ArkiveringOgMainProps {
    children: React.ReactNode;
}

const ArkiveringOgMain = ({ children, }: ArkiveringOgMainProps) => (
    <ArkiveringContext.Provider value={false}>
        <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
            {children}
        </main>
    </ArkiveringContext.Provider>
)

export const getServerSideProps = prefetchVedtak


export default Index
