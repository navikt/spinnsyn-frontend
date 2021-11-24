import jwt, { JwtPayload } from 'jsonwebtoken'
import jwks from 'jwks-rsa'
import getConfig from 'next/config'

import { logger } from '../utils/logger'

const { serverRuntimeConfig } = getConfig()

let discoveryData: DiscoveryData | null = null
let jwksClient: jwks.JwksClient | null = null


interface DiscoveryData {
    jwks_uri: string;
    issuer: string;
}

async function getJwksUrlFromDiscoveryEndpoint(): Promise<DiscoveryData> {
    const discoveryUrl = serverRuntimeConfig.idportenWellKnownUrl
    return fetch(discoveryUrl)
        .then(res => {
            if (!res.ok) {
                throw new Error(`Received unexpected status ${res.status} from ${discoveryUrl}`)
            }

            return res.json()
        })
        .then(discoveryData => {
            const jwks_uri = discoveryData.jwks_uri
            const issuer = discoveryData.issuer

            if (!jwks_uri) {
                throw new Error('Could not find "jwks_uri" from discovery endpoint: ' + JSON.stringify(discoveryData))
            } else if (!issuer) {
                throw new Error('Could not find "issuer" from discovery endpoint: ' + JSON.stringify(discoveryData))
            }

            return {
                jwks_uri,
                issuer
            }
        })
}

async function initJwksClient() {
    if (discoveryData == null) {
        discoveryData = await getJwksUrlFromDiscoveryEndpoint()
        jwksClient = jwks({
            jwksUri: discoveryData.jwks_uri
        })
    }
}


export async function verifyIdportenAccessToken(bearerToken: string) {
    const token = bearerToken.split(' ')[ 1 ]

    await initJwksClient()
    if (!jwksClient) {
        throw Error('jwksClient skal være satt')
    }
    const decoded = jwt.decode(token, { complete: true })!

    const kid = decoded.header.kid!

    const key = await jwksClient.getSigningKey(kid)
    const signingKey = key.getPublicKey()
    const verified = jwt.verify(token, signingKey) as JwtPayload
    logger.info('Jwt som ble verifisert: ' + token)
    if (verified.client_id !== serverRuntimeConfig.idportenClientId) {
        throw new Error('client_id matcher ikke min client ID')
    }
}
