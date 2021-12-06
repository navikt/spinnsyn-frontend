import { TokenSet } from 'openid-client'

import { logger } from '../utils/logger'
import { getAzureAuthClient } from './azureClient'

interface TokesetAndExp {
    expiresAt: number,
    tokenset: TokenSet
}

type TokensetMap = {
    [ scope: string ]: TokesetAndExp;
};

const tokens: TokensetMap = {}
const drift = 60

function now() {
    return Math.floor(Date.now() / 1000)
}

function erIkkeUtlopt(tokenset: TokesetAndExp) {
    return tokenset.expiresAt > now()
}

export const getAzureAdAccessToken = async(scope: string): Promise<TokenSet> => {
    const eksisterendeToken = tokens[ scope ]
    if (eksisterendeToken && erIkkeUtlopt(eksisterendeToken)) {
        logger.info('Gjenbruker token')
        return eksisterendeToken.tokenset
    }
    const oidcClient = await getAzureAuthClient()

    const tokenSet = await oidcClient.grant({
        grant_type: 'client_credentials',
        scope,
    })

    if (!tokenSet.access_token) {
        throw new Error(' Access token is undefined')
    }

    const expiresAt = (tokenSet.expires_in || 0) + now() - drift
    tokens[ scope ] = {
        tokenset: tokenSet,
        expiresAt: expiresAt
    }
    logger.info('Hentet nytt token som expires at ' + expiresAt)

    return tokenSet
}

