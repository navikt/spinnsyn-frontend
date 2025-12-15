import { logger } from '@navikt/next-logger'
import { GetServerSideProps } from 'next'
import getConfig from 'next/config'
import React from 'react'
import { getToken, requestAzureClientCredentialsToken, validateAzureToken } from '@navikt/oasis'

import { VedtakArkivering } from '../../../components/vedtak-arkivering/vedtak-arkivering'
import { hentVedtakForArkivering } from '../../../data/hentVedtakForArkivering'
import { ErrorMedStatus } from '../../../server-utils/ErrorMedStatus'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak-felles'

const { serverRuntimeConfig } = getConfig()

interface VedtakArkiveringProps {
    vedtak?: RSVedtakWrapper
    status?: number
    fnr?: string
    utbetalingId?: string
    alleVedtak?: RSVedtakWrapper[]
}

const ServerVedtak = ({ vedtak, status, fnr, utbetalingId, alleVedtak }: VedtakArkiveringProps) => {
    if (!vedtak || !fnr || !utbetalingId || !alleVedtak) {
        return <span>{status}</span>
    }

    return <VedtakArkivering vedtak={vedtak} alleVedtak={alleVedtak} />
}

export const getServerSideProps: GetServerSideProps<VedtakArkiveringProps> = async (ctx) => {
    try {
        if (serverRuntimeConfig.arkivering !== 'true') {
            throw new ErrorMedStatus('Arkivering ikke enablet', 400)
        }

        const tokenInn = getToken(ctx.req)
        if (!tokenInn) {
            throw new ErrorMedStatus('Ingen auth header', 401)
        }
        const tokenResult = await validateAzureToken(tokenInn)
        if (!tokenResult.ok) {
            throw new ErrorMedStatus('Kunne ikke validere token ' + tokenResult.errorType, 401)
        }
        const utbetalingId: string = ctx.params!.id as any
        const fnr: string = ctx.req.headers.fnr as any

        const token = await requestAzureClientCredentialsToken(serverRuntimeConfig.spinnsynBackendClientId)
        if (!token.ok) {
            throw new ErrorMedStatus('Kunne ikke hente token: ' + token.error, 500)
        }

        const alleVedtak = await hentVedtakForArkivering(fnr, token.token)
        const vedtaket = alleVedtak.find((i) => i.id == utbetalingId)
        if (!vedtaket) {
            throw new ErrorMedStatus('Fant ikke vedtaket', 404)
        }

        ctx.res.setHeader('x-nais-app-image', serverRuntimeConfig.naisAppImage)
        ctx.res.setHeader('x-vedtak-fom', vedtaket.vedtak.fom)
        ctx.res.setHeader('x-vedtak-tom', vedtaket.vedtak.tom)
        logger.info(`Rendrer vedtak ${utbetalingId} for arkivering`)

        return {
            props: {
                vedtak: vedtaket,
                fnr: fnr,
                utbetalingId: utbetalingId,
                alleVedtak: alleVedtak,
            },
        }
    } catch (e: any) {
        logger.warn(e, 'Kunne ikke hente serverSideProps.')
        ctx.res.statusCode = e.status || 500

        return {
            props: { status: ctx.res.statusCode },
        }
    }
}

export default ServerVedtak
