import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { RedirectTilForsiden } from '../../components/redirect'
import VedtakSide from '../../components/vedtak-side/vedtak-side'
import { ArkiveringContext } from '../../context/arkivering-context'
import { prefetchVedtak } from '../../prefetching/prefetchVedtak'
import useVedtak from '../../query-hooks/useVedtak'


const VedtakPage = () => {
    const router = useRouter()
    const { id } = router.query
    const { data: vedtak } = useVedtak()

    const vedtaket = vedtak?.find((v) => v.id == id)
    if (!vedtaket) {
        return (<RedirectTilForsiden />)
    }
    return (
        <ArkiveringContext.Provider value={false}>
            <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                <VedtakSide vedtak={vedtaket} />
            </main>
        </ArkiveringContext.Provider>
    )
}

export const getServerSideProps = prefetchVedtak


export default VedtakPage
