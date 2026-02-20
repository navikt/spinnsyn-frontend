import { test, expect } from './fixtures'
import { harSynligTittel } from './utils/hjelpefunksjoner'

test.describe('Tester visning av forside', () => {
    test('Laster startside', async ({ page }) => {
        await page.goto('/syk/sykepenger?id=a147e9a9-0aa2-4f5f-a8e3-c16c901e4071')
        await page.emulateMedia({ reducedMotion: 'reduce' })

        await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)
        await expect(page.getByText('Pengene utbetales til arbeidsgiveren din\n')).toBeVisible()
    })
})
