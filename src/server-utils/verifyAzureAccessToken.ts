import jwt from 'jsonwebtoken'
import jwks from 'jwks-rsa'
import getConfig from 'next/config'

import { logger } from '../utils/logger'

const { serverRuntimeConfig } = getConfig()


const jwksClient = jwks({
    jwksUri: serverRuntimeConfig.azureOpenidConfigJwksUri
})


export async function verifyToken(token: string) {
    logger.info('token: ' + token)
    const decoded = jwt.decode(token, { complete: true })!

    const kid = decoded.header.kid!

    const key = await jwksClient.getSigningKey(kid)
    const signingKey = key.getPublicKey()
    const verified = jwt.verify(token, signingKey)


    logger.info('Verified', verified)

}
