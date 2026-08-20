import { bundledEnv } from './env'

const BASE_PATH = '/syk/sykepenger'

export function isProd() {
    return bundledEnv.NEXT_PUBLIC_ENVIRONMENT === 'prod'
}

export function isMockBackend() {
    return bundledEnv.NEXT_PUBLIC_MOCK_BACKEND
}

export function isOpplaering() {
    return bundledEnv.NEXT_PUBLIC_OPPLAERING
}

export function isIntegrationtest() {
    return isMockBackend() && !isOpplaering()
}

export function sykefravaerUrl() {
    return bundledEnv.NEXT_PUBLIC_SYKEFRAVAER_URL
}

export function minSideUrl() {
    return bundledEnv.NEXT_PUBLIC_MINSIDE_URL
}

export function umamiEnabled() {
    return bundledEnv.NEXT_PUBLIC_UMAMI_ENABLED
}

export function spinnsynFrontendInterne() {
    return bundledEnv.NEXT_PUBLIC_SPINNSYN_FRONTEND_INTERNE
}

export function spinnsynFrontendArkivering() {
    return bundledEnv.NEXT_PUBLIC_SPINNSYN_FRONTEND_ARKIVERING
}

export function arkiverteVedtakUrl() {
    return bundledEnv.NEXT_PUBLIC_ARKIVERTE_VEDTAK_URL
}

export function telemetryCollectorURL(): string | undefined {
    return bundledEnv.NEXT_PUBLIC_TELEMETRY_URL ?? undefined
}

export function naisAppImage() {
    return bundledEnv.NEXT_PUBLIC_VERSION ?? undefined
}

export function naisAppName() {
    return bundledEnv.NEXT_PUBLIC_APP_NAME
}

export function basePath() {
    return BASE_PATH
}
