import { expect } from '@playwright/test'

import { test } from './fixtures'

test.describe('Tester visning av forside', () => {
    test('Laster startside', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?id=a147e9a9-0aa2-4f5f-a8e3-c16c901e4071')
        await page.emulateMedia({ reducedMotion: 'reduce' })

        const header = page.locator('main').locator('h1').first()
        await expect(header).toBeVisible()

        await expect(header).toContainText('Svar på søknad om sykepenger')
        await expect(page.locator('text=Pengene utbetales til arbeidsgiveren din\n')).toBeVisible()
    })
})
