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

export function umamiEnabled() {
    return publicRuntimeConfig.umamiEnabled === 'true'
}

export function spinnsynFrontendInterne() {
    return publicRuntimeConfig.spinnsynFrontendInterne === 'true'
}

export function spinnsynFrontendArkivering() {
    return publicRuntimeConfig.spinnsynFrontendArkivering === 'true'
}

export function arkiverteVedtakUrl() {
    return publicRuntimeConfig.arkiverteVedtakUrl
}

export function telemetryCollectorURL() {
    return publicRuntimeConfig.telemetryCollectorURL
}

export function naisAppImage() {
    return publicRuntimeConfig.naisAppImage
}

export function naisAppName() {
    return publicRuntimeConfig.naisAppName
}

export function basePath() {
    return publicRuntimeConfig.basePath
}
