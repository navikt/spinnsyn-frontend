import { NextApiRequest, NextApiResponse } from 'next'
import getConfig from 'next/config'
import { getToken, validateAzureToken } from '@navikt/oasis'
import { requestAzureOboToken } from '@navikt/oasis/dist/obo'

import { hentModiaContext } from '../../../data/hentModiaContext'
import { hentVedtakFraSpinnsynBackendForInterne } from '../../../data/hentVedtakForInterne'

const { serverRuntimeConfig } = getConfig()

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const accessToken = getToken(req)
    if (!accessToken) {
        return res.status(401).json({ message: 'Mangler autorisasjonstoken.' })
    }
    const validert = await validateAzureToken(accessToken)
    if (!validert.ok) {
        return res.status(401).json({ message: 'Feil i autorisasjonstoken.' })
    }

    const spinnsynObo = await requestAzureOboToken(accessToken, serverRuntimeConfig.spinnsynBackendClientId)
    if (!spinnsynObo.ok) {
        return res.status(401).json({ message: 'Kunne ikke hente spinnsyn obo token' })
    }

    const sykmeldtFnr = await hentModiaContext(req)
    if (!sykmeldtFnr) {
        return res.status(200).json({ vedtak: [], sykmeldtFnr: null })
    }

    const vedtakene = await hentVedtakFraSpinnsynBackendForInterne(spinnsynObo.token, sykmeldtFnr)
    return res.status(200).json({ vedtak: vedtakene, sykmeldtFnr })
}

export default handler
