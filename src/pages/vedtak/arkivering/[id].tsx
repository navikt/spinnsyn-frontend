import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { ErrorMedStatus } from '../../../server-utils/ErrorMedStatus'
import { getAccessToken } from '../../../server-utils/getAccessToken'
import { hentVedtak } from '../../../server-utils/hentVedtak'
import { verifyToken } from '../../../server-utils/verifyAzureAccessToken'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { logger } from '../../../utils/logger'

const { serverRuntimeConfig } = getConfig()

interface VedtakArkiveringProps {
    vedtak?: RSVedtakWrapper
    status?: number
    fnr?: string
}


const ServerVedtak = ({ vedtak, status, fnr }: VedtakArkiveringProps) => {
    if (!vedtak) {
        return <span>{status}</span>
    }
    if (!fnr) {
        return <span>{status}</span>
    }

    return (
        <VedtakArkivering vedtak={vedtak} fnr={fnr} />
    )
}

export const getServerSideProps: GetServerSideProps<VedtakArkiveringProps> = async(ctx) => {
    try {
        if (serverRuntimeConfig.arkivering !== 'true') {
            throw new ErrorMedStatus('Arkivering ikke enablet', 400)
        }

        const authHeader = ctx.req.headers.authorization

        if (!authHeader) {
            throw new ErrorMedStatus('Ingen auth header', 401)

        }
        const tokenInn = authHeader.split(' ')[ 1 ]
        await verifyToken(tokenInn)

        const vedtakId: string = ctx.params!.id as any
        const fnr: string = ctx.req.headers.fnr as any

        const token = await getAccessToken()

        const vedtak = await hentVedtak(fnr, token.access_token)
        const vedtaket = vedtak.find(i => i.id == vedtakId)
        if (!vedtaket) {
            throw new ErrorMedStatus('Fant ikke vedtaket', 404)
        }
        return {
            props: {
                vedtak: vedtaket,
                fnr: fnr,
            }
        }
    } catch (e) {
        logger.error({ err: e })
        ctx.res.statusCode = e.status || 500

        return {
            props: { status: ctx.res.statusCode }
        }
    }
}


export default ServerVedtak
