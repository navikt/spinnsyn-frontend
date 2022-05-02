import type { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import onHeaders from 'on-headers'

import { beskyttetApi } from '../../../auth/beskyttetApi'
import { getOboAccessToken } from '../../../auth/getOboAccessToken'
import { hentModiaContext } from '../../../data/hentModiaContext'
import { hentVedtak } from '../../../data/hentVedtak'
import { hentVedtakFraSpinnsynBackendForInterne } from '../../../data/hentVedtakForInterne'
import { RSVedtakWrapper } from '../../../types/rs-types/rs-vedtak'
import { spinnsynFrontendInterne } from '../../../utils/environment'

const { serverRuntimeConfig } = getConfig()

const handler = beskyttetApi(
    async (req: NextApiRequest, res: NextApiResponse) => {
        onHeaders(res, function () {
            this.setHeader(
                'Cache-Control',
                'no-cache, no-store, must-revalidate'
            )
            this.removeHeader('ETag')
        })
        if (req.method !== 'GET') {
            return res.status(404).json('Må være GET')
        }
        let vedtakene: RSVedtakWrapper[] | null = null
        if (spinnsynFrontendInterne()) {
            const sykmeldtFnr = await hentModiaContext(req)
            if (!sykmeldtFnr) {
                res.status(404)
                return
            }
            const oboSpinnsynBackend = await getOboAccessToken(
                req.headers.authorization?.split(' ')[1],
                serverRuntimeConfig.spinnsynBackendClientId
            )
            vedtakene = await hentVedtakFraSpinnsynBackendForInterne(
                oboSpinnsynBackend,
                sykmeldtFnr!
            )
        } else {
            vedtakene = await hentVedtak(req, req.cookies)
        }
        res.status(200).json(vedtakene)
    }
)

export default handler
