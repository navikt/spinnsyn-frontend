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
    frontendloggerRoot(): string
    amplitudeEnabled(): boolean
    amplitudeKey(): string
}
class Environment implements EnvironmentInterface {

    private env = (window as any)._env_;

    isDev() {
        return this.env.ENVIRONMENT === 'dev'
    }

    isQ1() {
        return this.env.ENVIRONMENT === 'q1'
    }

    isProd() {
        return this.env.ENVIRONMENT === 'prod'
    }

    sykmeldingerBackendProxyRoot() {
        return this.env.SYKMELDINGER_BACKEND_PROXY_ROOT
    }

    flexGatewayRoot() {
        return this.env.FLEX_GATEWAY_ROOT
    }

    isMockBackend() {
        return this.env.MOCK_BACKEND === 'true'
    }

    isOpplaering() {
        return this.env.OPPLAERING === 'true'
    }

    loginServiceUrl() {
        return this.env.LOGINSERVICE_URL
    }

    loginServiceRedirectUrl() {
        return this.env.LOGINSERVICE_REDIRECT_URL
    }

    sykefravaerUrl() {
        return this.env.SYKEFRAVAER_URL
    }

    dittNavUrl() {
        return this.env.DITTNAV_URL
    }

    frontendloggerRoot() {
        return this.env.FRONTENDLOGGER_ROOT
    }

    amplitudeKey() {
        return this.env.AMPLITUDE_KEY
    }

    amplitudeEnabled() {
        return this.env.AMPLITUDE_ENABLED === 'true'
    }
}

class MockEnvironment implements EnvironmentInterface {
    isDev() {
        return true
    }

    isQ1() {
        return false
    }

    isProd() {
        return false
    }

    sykmeldingerBackendProxyRoot() {
        return ''
    }

    flexGatewayRoot() {
        return ''
    }

    isMockBackend() {
        return true
    }

    isOpplaering() {
        return process.env.REACT_APP_OPPLAERING === 'true'
    }

    loginServiceUrl() {
        return ''
    }

    loginServiceRedirectUrl() {
        return ''
    }

    sykefravaerUrl() {
        return ''
    }

    dittNavUrl() {
        return ''
    }

    frontendloggerRoot() {
        return ''
    }

    amplitudeKey() {
        return ''
    }

    amplitudeEnabled() {
        return false
    }
}

function hentEnvironment(): EnvironmentInterface {
    if (process.env.NODE_ENV === 'development') {
        return new MockEnvironment()
    }
    return new MockEnvironment()
    //return new Environment()
}

const env = hentEnvironment()

export default env
