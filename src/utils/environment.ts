import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

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
    return serverRuntimeConfig.loginserviceUrl
}

export function loginServiceRedirectUrl() {
    return serverRuntimeConfig.loginServiceRedirectUrl
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

export function spinnsynFrontendInterne() {
    return publicRuntimeConfig.spinnsynFrontendInterne === 'true'
}

export function arkiverteVedtakUrl() {
    return publicRuntimeConfig.arkiverteVedtakUrl
}
