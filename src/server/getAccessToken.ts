interface TokenResponse {
    'token_type': string,
    'expires_in': number,
    'access_token': string
}

export const getAccessToken = async(): Promise<TokenResponse> => {

    const params = new URLSearchParams()
    params.append('client_id', process.env.AZURE_APP_CLIENT_ID!)
    params.append('scope', 'api://dev-gcp.flex.spinnsyn-backend/.default')
    params.append('client_secret', process.env.AZURE_APP_CLIENT_SECRET!)
    params.append('grant_type', 'client_credentials')


    const response = await fetch(process.env.AZURE_OPENID_CONFIG_TOKEN_ENDPOINT!, { method: 'POST', body: params })
    if (response.status != 200) {
        throw Error('Ikke 200 response fra azure')
    }
    return (await response.json())
}

