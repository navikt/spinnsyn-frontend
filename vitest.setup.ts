import '@testing-library/jest-dom'
import { vi, expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

vi.mock('next/config', () => ({
    default: () => ({
        publicRuntimeConfig: {
            amplitudeEnabled: 'false',
        },
    }),
}))

afterEach(() => {
    cleanup()
})
