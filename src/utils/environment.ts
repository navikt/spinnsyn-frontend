import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

export function isProd() {
    return publicRuntimeConfig.environment === 'prod'
}

export function isMockBackend() {
    return publicRuntimeConfig.mockBackend === 'true'
}

export function isOpplaering() {
    return publicRuntimeConfig.opplaering === 'true'
}

export function sykefravaerUrl() {
    return publicRuntimeConfig.sykefravaerUrl
}

export function minSideUrl() {
    return publicRuntimeConfig.minSideUrl
}

export function publicPath() {
    return publicRuntimeConfig.publicPath
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

export function feilmeldingerUrl() {
    return publicRuntimeConfig.feilmeldingerUrl
}
