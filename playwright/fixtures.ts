import { test as base, expect } from '@playwright/test'

import { IgnoreRule, validerAxe } from './uuvalidering'

type UUOptions = {
    skipUU?: boolean
    disableRules?: string[]
    ignoreRules?: IgnoreRule[]
}

// Utvid base-test med UU-options.
export const test = base.extend<{ uuOptions: UUOptions; _setup: void }>({
    uuOptions: [{ skipUU: false, disableRules: [] }, { option: true }],
    // Auto-fixture: kjører for ALLE tester som bruker denne test-instansen.
    _setup: [
        async ({ context, page }, use) => {
            // Forhindrer devtools-hint popover fra å blokkere klikk.
            await page.addInitScript(() => {
                window.localStorage.setItem('devtools-hint', 'false')
            })
            // Resetter leste vedtak før hver test.
            await context.clearCookies()
            await use()
        },
        { auto: true },
    ],
})

// Automatisk UU-validering for ALLE tester.
test.afterEach(async ({ page, uuOptions, browserName }, testInfo) => {
    if (!uuOptions.skipUU) {
        await validerAxe(browserName, page, testInfo, uuOptions.disableRules, uuOptions.ignoreRules)
    }
})

export { expect }
