import getConfig from 'next/config'

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig()

export function isProd() {
    return publicRuntimeConfig.environment === 'prod'
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

export function amplitudeEnabled() {
    return publicRuntimeConfig.amplitudeEnabled === 'true'
}

export function spinnsynFrontendInterne() {
    return publicRuntimeConfig.spinnsynFrontendInterne === 'true'
}

export function arkiverteVedtakUrl() {
    return publicRuntimeConfig.arkiverteVedtakUrl
}
