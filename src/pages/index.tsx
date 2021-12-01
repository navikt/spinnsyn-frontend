import React from 'react'

import VedtakListe from '../components/vedtak-liste/vedtak-liste'
import { ArkiveringContext } from '../context/arkivering-context'
import { prefetchVedtak } from '../prefetching/prefetchVedtak'


const Index = () => {
    return (
        <ArkiveringContext.Provider value={false}>
            <main id="maincontent" className="maincontent" role="main" tabIndex={-1}>
                <VedtakListe />
            </main>
        </ArkiveringContext.Provider>
    )
}

export const getServerSideProps = prefetchVedtak


export default Index
