import { Page, Locator, expect } from '@playwright/test'

export async function tabUntilFocusedContainsText(
    page: Page,
    expectedText: string | RegExp,
    maxTabs: number = 10,
): Promise<Locator> {
    let tabsAttempted = 0
    let focusedElement: Locator = page.locator(':focus') // Initialize for error message

    while (tabsAttempted < maxTabs) {
        await page.keyboard.press('Tab')
        tabsAttempted++

        let currentFocused: Locator = page.locator(':focus')

        // Filter out known irrelevant elements
        currentFocused = currentFocused.and(
            page.locator(':not(nextjs-portal):not([aria-label="Open Next.js Dev Tools"])'),
        )

        // If no relevant element is currently focused, continue to the next tab
        if ((await currentFocused.count()) === 0) {
            // Update focusedElement for the final error message if needed
            focusedElement = page.locator(':focus')
            continue
        }

        // Assign the potentially valid focused element for text content check
        focusedElement = currentFocused

        // Get the text content of the focused element
        const textContent = (await focusedElement.textContent()) ?? ''

        // Manually check if the text content matches the expectedText
        const isMatch =
            typeof expectedText === 'string' ? textContent.includes(expectedText) : expectedText.test(textContent)

        if (isMatch) {
            // If a match is found, assert its visibility and return it
            await expect(focusedElement).toBeVisible() // Confirm it's a visible element
            return focusedElement
        }
    }

    // If the loop finishes without finding the element
    throw new Error(
        `Failed to find the desired focused element containing text ` +
            `"${expectedText instanceof RegExp ? expectedText.source : expectedText}" ` +
            `after ${maxTabs} tabs. Current focused element (if any): ${
                (await focusedElement.count()) > 0
                    ? await focusedElement.evaluate((el: HTMLElement) => el.outerHTML)
                    : 'No relevant element focused on last check'
            }`,
    )
}
