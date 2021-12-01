import jwt, { JwtPayload } from 'jsonwebtoken'
import jwks from 'jwks-rsa'
import getConfig from 'next/config'

import { ErrorMedStatus } from './ErrorMedStatus'

const { serverRuntimeConfig } = getConfig()


const jwksClient = jwks({
    jwksUri: serverRuntimeConfig.azureOpenidConfigJwksUri
})

interface PreauthorizedApps {
    name: string,
    clientId: string
}


export async function verifyToken(token: string) {
    const decoded = jwt.decode(token, { complete: true })!

    const kid = decoded.header.kid!

    const key = await jwksClient.getSigningKey(kid)
    const signingKey = key.getPublicKey()
    const verified = jwt.verify(token, signingKey) as JwtPayload

    if (verified.aud !== serverRuntimeConfig.azureAppClientId) {
        throw new ErrorMedStatus('Audience matcher ikke min client ID', 401)
    }
    const preAuthorizedApps = JSON.parse(serverRuntimeConfig.azureAppPreAuthorizedApps) as PreauthorizedApps[]

    const spinnsynArkiveringClientId = preAuthorizedApps.find(a => a.name.endsWith('-gcp:flex:spinnsyn-arkivering'))
    if (!spinnsynArkiveringClientId) {
        throw new ErrorMedStatus('Fant ikke spinnsyn arkivering client id', 500)
    }

    const azp = verified.azp
    if (!azp) {
        throw new ErrorMedStatus('Fant ikke azp claim i token', 401)
    }

    if (azp != spinnsynArkiveringClientId.clientId) {
        throw new ErrorMedStatus('AZP claim matcher ikke spinnsyn arkivering', 401)
    }
}
