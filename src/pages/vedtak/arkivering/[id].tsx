import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import Vedtak from '../../../components/vedtak-side/vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { getAccessToken } from '../../../server-utils/getAccessToken'
import { hentVedtak } from '../../../server-utils/hentVedtak'
import { verifyToken } from '../../../server-utils/verifyAzureAccessToken'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { logger } from '../../../utils/logger'

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
            <div className="server-vedtak">
                <Vedtak vedtak={vedtak} />
            </div>
        </ArkiveringContext.Provider>
    )
}

export const getServerSideProps: GetServerSideProps<VedtakArkiveringProps> = async(ctx) => {
    if (serverRuntimeConfig.arkivering !== 'true') {
        return {
            props: {}
        }
    }

    const authHeader = ctx.req.headers.authorization
    if (!authHeader) {
        ctx.res.statusCode = 401
        return {
            props: {}
        }
    }
    logger.info('Auth header: ' + authHeader)
    const tokenInn = authHeader.split(' ')[1]

    await verifyToken(tokenInn)
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
