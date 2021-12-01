import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function isDev() {
    return publicRuntimeConfig.environment === 'dev'
}

export function isQ1() {
    return publicRuntimeConfig.environment === 'q1'
}

export function isProd() {
    return publicRuntimeConfig.environment === 'prod'
}

export function flexGatewayRoot() {
    return publicRuntimeConfig.flexGatewayRoot
}

export function isMockBackend() {
    return publicRuntimeConfig.mockBackend === 'true'
}

export function isOpplaering() {
    return publicRuntimeConfig.opplaering === 'true'
}

export function loginServiceUrl() {
    return publicRuntimeConfig.loginserviceUrl
}

export function loginServiceRedirectUrl() {
    return publicRuntimeConfig.loginServiceRedirectUrl
}

export function sykefravaerUrl() {
    return publicRuntimeConfig.sykefravaerUrl
}

export function dittNavUrl() {
    return publicRuntimeConfig.dittNavUrl
}

export function amplitudeKey() {
    return publicRuntimeConfig.amplitudeKey
}

export function amplitudeEnabled() {
    return publicRuntimeConfig.amplitudeEnabled === 'true'
}
