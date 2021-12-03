import { getAzureAuthClient } from './azureClient'

export async function getOboAccessToken(userToken: string, scope: string): Promise<string> {
    const oidcClient = await getAzureAuthClient()

    const oboTokenSet = await oidcClient.grant({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
        requested_token_use: 'on_behalf_of',
        scope,
        assertion: userToken,
    })

    if (!oboTokenSet.access_token) {
        throw new Error('OBO Access token is undefined')
    }

    return oboTokenSet.access_token
}
