import '@testing-library/jest-dom'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.stubEnv('NEXT_PUBLIC_ENVIRONMENT', 'labs')
vi.stubEnv('NEXT_PUBLIC_MOCK_BACKEND', 'true')
vi.stubEnv('NEXT_PUBLIC_UMAMI_ENABLED', 'false')
vi.stubEnv('NEXT_PUBLIC_SPINNSYN_FRONTEND_INTERNE', 'false')
vi.stubEnv('NEXT_PUBLIC_SPINNSYN_FRONTEND_ARKIVERING', 'false')
vi.stubEnv('NEXT_PUBLIC_SYKEFRAVAER_URL', 'https://www.ekstern.dev.nav.no/syk/sykefravaer')
vi.stubEnv('NEXT_PUBLIC_MINSIDE_URL', 'https://www.intern.dev.nav.no/minside/')
vi.stubEnv('NEXT_PUBLIC_ARKIVERTE_VEDTAK_URL', 'https://www.ansatt.dev.nav.no/dokumentarkiv/tema/SYK')
vi.stubEnv('NEXT_PUBLIC_DECORATOR_ENV', 'prod')

vi.mock('next/router', () => ({
    useRouter: () => ({
        query: {},
        pathname: '/',
        push: vi.fn(),
        replace: vi.fn(),
        reload: vi.fn(),
        back: vi.fn(),
        prefetch: vi.fn(),
        beforePopState: vi.fn(),
        events: {
            on: vi.fn(),
            off: vi.fn(),
            emit: vi.fn(),
        },
        isFallback: false,
        isLocaleDomain: false,
        isReady: true,
        isPreview: false,
    }),
}))

afterEach(() => {
    cleanup()
})
