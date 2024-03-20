import { createHash } from 'node:crypto'

import { decodeJwt, JWTPayload } from 'jose'

import { ClientCredentialsResult, ClientCredientialsProvider } from '../client-credentials'

import SieveCache from './cache'

function sha256(content: string): string {
    return createHash('sha256').update(content).digest('hex')
}

let cache: SieveCache

function getCache() {
    if (!cache) {
        const averageJwtSize = 1024 // bytes
        const maxCacheSize = 128 /* MB */ * 1024 /* KB */ * 1024 /* bytes */
        const maxCacheCapacity = Math.floor(maxCacheSize / averageJwtSize)

        cache = new SieveCache(maxCacheCapacity)
    }
    return cache
}

function getSecondsToExpire(payload: JWTPayload): number {
    function secondsUntil(timestamp: number): number {
        return Math.max(Math.round(timestamp - Math.round(Date.now() / 1000)), 0)
    }

    return payload.exp ? secondsUntil(payload.exp) : 0
}

export const withCache = (oboProvider: ClientCredientialsProvider): ClientCredientialsProvider => {
    return async (audience: string) => {
        const cache = getCache()
        const key = sha256(audience)
        const cachedToken = cache.get(key)
        if (cachedToken) {
            return Promise.resolve(ClientCredentialsResult.Ok(cachedToken))
        }

        return oboProvider(audience).then((result) => {
            if (result.ok) {
                const ttl = getSecondsToExpire(decodeJwt(result.token))
                if (ttl > 0) {
                    cache.set(key, result.token, ttl)
                }
            }

            return result
        })
    }
}
