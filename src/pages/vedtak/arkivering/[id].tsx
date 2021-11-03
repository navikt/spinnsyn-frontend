import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import Vedtak from '../../../components/vedtak-side/vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { getAccessToken } from '../../../server/getAccessToken'
import { hentVedtak } from '../../../server/hentVedtak'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'

const { serverRuntimeConfig } = getConfig()

interface VedtakArkiveringProps {
    vedtak?: RSVedtakWrapper
}


const ServerVedtak = ({ vedtak }: VedtakArkiveringProps) => {
    if (!vedtak) {
        return <span>Disabled</span>
    }

    return (
        <ArkiveringContext.Provider value={true}>
            <Vedtak vedtak={vedtak} />
        </ArkiveringContext.Provider>
    )
}

export const getServerSideProps: GetServerSideProps<VedtakArkiveringProps> = async(ctx) => {
    if (serverRuntimeConfig.arkivering !== 'true') {
        return {
            props: {}
        }
    }

    try {
        const vedtakId: string = ctx.params!.id as any
        const fnr: string = ctx.req.headers.fnr as any

        const token = await getAccessToken()

        const vedtak = await hentVedtak(fnr, token.access_token)
        const vedtaket = vedtak.find(i => i.id == vedtakId)
        if (!vedtaket) {
            ctx.res.statusCode = 404
        }
        return {
            props: {
                vedtak: vedtaket
            }
        }
    } catch (e) {
        ctx.res.statusCode = 500

        return {
            props: {}
        }
    }
}


export default ServerVedtak
