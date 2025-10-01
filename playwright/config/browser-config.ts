// file: playwright/config/browser-config.ts
import { devices, type Project } from '@playwright/test'

// Extend Playwright's Project type to guarantee a name
export type NamedProject = Project & { name: string }

export function commonBrowserConfigs(opts: { baseURL: string }): NamedProject[] {
    return [
        {
            name: 'Desktop Chromium',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: 'Mobile Chromium',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: 'Desktop Firefox',
            use: {
                ...devices['Desktop Firefox'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: 'Mobile Firefox',
            use: {
                ...devices['Pixel 5'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: 'Desktop WebKit',
            use: {
                ...devices['Desktop Safari'],
                viewport: { width: 1920, height: 1080 },
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
        {
            name: 'Mobile WebKit',
            use: {
                ...devices['iPhone 12'],
                viewport: { width: 375, height: 667 },
                isMobile: true,
                baseURL: opts.baseURL,
            },
            testIgnore: '**/brodsmuler.spec.ts',
        },
    ]
}

export function velgBrowserConfigs(
    configs: NamedProject[],
    filterFn: (config: NamedProject) => boolean,
): NamedProject[] {
    return configs.filter(filterFn)
}
