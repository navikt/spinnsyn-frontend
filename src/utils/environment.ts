import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

interface EnvironmentInterface {
    isDev(): boolean
    isQ1(): boolean
    isProd(): boolean
    sykmeldingerBackendProxyRoot(): string
    flexGatewayRoot(): string
    isMockBackend(): boolean
    isOpplaering(): boolean
    loginServiceUrl(): string
    loginServiceRedirectUrl(): string
    sykefravaerUrl(): string
    dittNavUrl(): string
    amplitudeEnabled(): boolean
    amplitudeKey(): string
}

class Environment implements EnvironmentInterface{

    isDev() {
        return publicRuntimeConfig.environment === 'dev'
    }

    isQ1() {
        return publicRuntimeConfig.environment === 'q1'
    }

    isProd() {
        return publicRuntimeConfig.environment === 'prod'
    }

    sykmeldingerBackendProxyRoot() {
        return publicRuntimeConfig.sykmeldingerBackendProxyRoot
    }

    flexGatewayRoot() {
        return publicRuntimeConfig.flexGatewayRoot
    }

    isMockBackend() {
        return publicRuntimeConfig.mockBackend === 'true'
    }

    isOpplaering() {
        return publicRuntimeConfig.opplaering === 'true'
    }

    loginServiceUrl() {
        return publicRuntimeConfig.loginserviceUrl
    }

    loginServiceRedirectUrl() {
        return publicRuntimeConfig.loginServiceRedirectUrl
    }

    sykefravaerUrl() {
        return publicRuntimeConfig.sykefravaerUrl
    }

    dittNavUrl() {
        return publicRuntimeConfig.dittNavUrl
    }

    amplitudeKey() {
        return publicRuntimeConfig.amplitudeKey
    }

    amplitudeEnabled() {
        return publicRuntimeConfig.amplitudeEnabled === 'true'
    }
}

const env = new Environment()

export default env
