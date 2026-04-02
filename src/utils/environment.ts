/**
 * Public runtime config replaces the removed Next.js publicRuntimeConfig.
 * On the server, values are read from process.env.
 * On the client, values are read from window.__publicEnv injected by _document.
 */
export interface PublicEnv {
    ENVIRONMENT?: string
    MOCK_BACKEND?: string
    OPPLAERING?: string
    SYKEFRAVAER_URL?: string
    MINSIDE_URL?: string
    UMAMI_ENABLED?: string
    SPINNSYN_FRONTEND_INTERNE?: string
    ARKIVERING?: string
    ARKIVERTE_VEDTAK_URL?: string
    NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL?: string
    NAIS_APP_IMAGE?: string
    NAIS_APP_NAME?: string
}

// JSON.stringify() does not escape </script> sequences. If any env var value contained </script>, it would break out
// of the script tag and woudl be a latent XSS vector.
export function safeJsonStringify(data: unknown): string {
    return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/\//g, '\\u002f')
}

export function getPublicEnv(): PublicEnv {
    return {
        ENVIRONMENT: process.env.ENVIRONMENT,
        MOCK_BACKEND: process.env.MOCK_BACKEND,
        OPPLAERING: process.env.OPPLAERING,
        SYKEFRAVAER_URL: process.env.SYKEFRAVAER_URL,
        MINSIDE_URL: process.env.MINSIDE_URL,
        UMAMI_ENABLED: process.env.UMAMI_ENABLED,
        SPINNSYN_FRONTEND_INTERNE: process.env.SPINNSYN_FRONTEND_INTERNE,
        ARKIVERING: process.env.ARKIVERING,
        ARKIVERTE_VEDTAK_URL: process.env.ARKIVERTE_VEDTAK_URL,
        NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL: process.env.NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
        NAIS_APP_IMAGE: process.env.NAIS_APP_IMAGE,
        NAIS_APP_NAME: process.env.NAIS_APP_NAME,
    }
}

declare global {
    interface Window {
        __publicEnv?: PublicEnv
    }
}

function getEnvVar(key: keyof PublicEnv): string | undefined {
    if (typeof window !== 'undefined') {
        return window.__publicEnv?.[key]
    }
    return process.env[key]
}

export function isProd() {
    return getEnvVar('ENVIRONMENT') === 'prod'
}

export function isMockBackend() {
    return getEnvVar('MOCK_BACKEND') === 'true'
}

export function isOpplaering() {
    return getEnvVar('OPPLAERING') === 'true'
}

export function sykefravaerUrl() {
    return getEnvVar('SYKEFRAVAER_URL') || ''
}

export function minSideUrl() {
    return getEnvVar('MINSIDE_URL') || ''
}

export function umamiEnabled() {
    return getEnvVar('UMAMI_ENABLED') === 'true'
}

export function spinnsynFrontendInterne() {
    return getEnvVar('SPINNSYN_FRONTEND_INTERNE') === 'true'
}

export function spinnsynFrontendArkivering() {
    return getEnvVar('ARKIVERING') === 'true'
}

export function arkiverteVedtakUrl() {
    return getEnvVar('ARKIVERTE_VEDTAK_URL')
}

export function telemetryCollectorURL() {
    return getEnvVar('NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL')
}

export function naisAppImage() {
    return getEnvVar('NAIS_APP_IMAGE')
}

export function naisAppName() {
    return getEnvVar('NAIS_APP_NAME')
}

export function basePath() {
    return '/syk/sykepenger'
}
