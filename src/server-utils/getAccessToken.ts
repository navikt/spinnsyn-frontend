import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()


interface TokenResponse {
    'token_type': string,
    'expires_in': number,
    'access_token': string
}

export const getAccessToken = async(): Promise<TokenResponse> => {

    const params = new URLSearchParams()
    params.append('client_id', serverRuntimeConfig.azureAppClientId)
    params.append('scope', serverRuntimeConfig.spinnsynBackendClientId)
    params.append('client_secret', serverRuntimeConfig.azureAppClientSecret)
    params.append('grant_type', 'client_credentials')


    const response = await fetch(serverRuntimeConfig.azureOpenidConfigTokenEndpoint, { method: 'POST', body: params })
    if (response.status != 200) {
        throw Error('Ikke 200 response fra azure')
    }
    return (await response.json())
}

