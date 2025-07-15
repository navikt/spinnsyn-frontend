import { Locator, Page } from '@playwright/test'

import { expect } from '../fixtures'

export const trykkPaVedtakMedId = async (page: Page, vedtakId: string) => {
    await page.locator(`a[href*="${vedtakId}"]`).click()
}

export const beregnetManedsinntektRegion = async (page: Page, hentetFra?: string): Promise<Locator> => {
    const beregnetManedsinntekt = page.getByRole('region', {
        name: `Beregnet månedsinntekt (hentet fra ${hentetFra ? hentetFra : 'inntektsmeldingen'})`,
    })
    await expect(beregnetManedsinntekt).toBeVisible()
    await expect(beregnetManedsinntekt).toContainText('Beregnet månedsinntekt')
    return beregnetManedsinntekt
}
