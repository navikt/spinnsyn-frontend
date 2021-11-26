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
    utbetalingId?: string
}


const ServerVedtak = ({ vedtak, status, fnr, utbetalingId }: VedtakArkiveringProps) => {
    if (!vedtak || !fnr || !utbetalingId) {
        return <span>{status}</span>
    }


    return (
        <VedtakArkivering vedtak={vedtak} fnr={fnr} utbetalingId={utbetalingId} />
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

        const utbetalingId: string = ctx.params!.id as any
        const fnr: string = ctx.req.headers.fnr as any

        const token = await getAccessToken()

        const vedtak = await hentVedtak(fnr, token.access_token)
        const vedtaket = vedtak.find(i => i.id == utbetalingId)
        if (!vedtaket) {
            throw new ErrorMedStatus('Fant ikke vedtaket', 404)
        }
        ctx.res.setHeader('x-nais-app-image', serverRuntimeConfig.naisAppImage)
        ctx.res.setHeader('x-vedtak-fom', vedtaket.vedtak.fom)
        ctx.res.setHeader('x-vedtak-tom', vedtaket.vedtak.tom)

        return {
            props: {
                vedtak: vedtaket,
                fnr: fnr,
                utbetalingId: utbetalingId,
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
