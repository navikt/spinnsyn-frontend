import { GetServerSideProps } from 'next'
import React from 'react'

import Vedtak from '../../../components/vedtak-side/vedtak'
import { ArkiveringContext } from '../../../context/arkivering-context'
import { getAccessToken } from '../../../server/getAccessToken'
import { hentVedtak } from '../../../server/hentVedtak'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'


interface VedtakArkiveringProps {
    vedtak?: RSVedtakWrapper
}


const ServerVedtak = ({ vedtak }: VedtakArkiveringProps) => {
    if (!vedtak) {
        return (<div>404</div>)
    }

    return (
        <ArkiveringContext.Provider value={true}>
            <div className="limit server-vedtak">
                <Vedtak vedtak={vedtak} />
            </div>
        </ArkiveringContext.Provider>
    )
}

export const getServerSideProps: GetServerSideProps<VedtakArkiveringProps> = async(ctx) => {
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
