import { Issuer } from 'openid-client'

import { withCache } from '../token-cache'

export type ClientCredientialsProvider = (scope: string) => Promise<ClientCredentialsResult>

export type ClientCredentialsResult = { ok: true; token: string } | { ok: false; error: Error }

export const ClientCredentialsResult = {
    Error: (error: Error | string): ClientCredentialsResult => ({
        ok: false,
        error: typeof error === 'string' ? Error(error) : error,
    }),
    Ok: (token: string): ClientCredentialsResult => {
        const res = {
            ok: true,
            token,
            toString: () => {
                throw Error(
                    "OboResult object can not be used as a string. If you tried to get the token, access the 'token' property.",
                )
            },
        } as const
        return res
    },
}

/**
 * Requests client credentials token from Azure. Requires Azure to be enabled in
 * nais application manifest.
 *
 * @param audience The target app you request a token for.
 */
export const requestAzureClientCredentialsToken: ClientCredientialsProvider = withCache(async (scope) =>
    grantClientCredentialsToken({
        issuer: process.env.AZURE_OPENID_CONFIG_ISSUER!,
        token_endpoint: process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT!,
        client_id: process.env.AZURE_APP_CLIENT_ID!,
        client_secret: process.env.AZURE_APP_CLIENT_SECRET!,
        scope: scope,
    }),
)

const grantClientCredentialsToken: (opts: {
    issuer: string
    token_endpoint: string
    client_id: string
    client_secret: string
    scope: string
}) => Promise<ClientCredentialsResult> = async ({ issuer, token_endpoint, client_id, client_secret, scope }) => {
    try {
        const { access_token } = await new new Issuer({
            issuer,
            token_endpoint,
            token_endpoint_auth_signing_alg_values_supported: ['RS256'],
        }).Client({ client_id, client_secret, token_endpoint_auth_method: 'client_secret_post' }).grant({
            grant_type: 'client_credentials',
            scope,
        })

        return access_token
            ? ClientCredentialsResult.Ok(access_token)
            : ClientCredentialsResult.Error(Error('TokenSet does not contain an access_token'))
    } catch (e) {
        return ClientCredentialsResult.Error(e as Error)
    }
}
