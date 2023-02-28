import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'

import { hentVedtakFraSpinnsynBackendForInterne } from '../../../data/hentVedtakForInterne'
import { verifyAzureAccessTokenSpinnsynInterne } from '../../../auth/verifyAzureAccessTokenVedArkivering'
import { hentModiaContext } from '../../../data/hentModiaContext'
import { getOboAccessToken } from '../../../auth/getOboAccessToken'

const { serverRuntimeConfig } = getConfig()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const bearerToken: string | null | undefined = req.headers['authorization']
    if (!bearerToken) {
        return res.status(401).json({ message: 'Mangler autorisasjonstoken.' })
    }
    try {
        await verifyAzureAccessTokenSpinnsynInterne(bearerToken)
    } catch (e) {
        return res.status(401).json({ message: 'Feil i autorisasjonstoken.' })
    }
    const sykmeldtFnr = await hentModiaContext(req)
    if (!sykmeldtFnr) {
        return res.status(404).json({ message: 'Ingen person i modia' })
    }

    const oboSpinnsynBackend = await getOboAccessToken(
        req?.headers.authorization?.split(' ')[1],
        serverRuntimeConfig.spinnsynBackendClientId,
    )

    const vedtekene = await hentVedtakFraSpinnsynBackendForInterne(oboSpinnsynBackend, sykmeldtFnr)
    return res.status(200).json(vedtekene)
}

export default handler
