import { test, expect } from './fixtures'

test.describe('Julesøknadwarning', () => {
    const advarseltekst =
        'Vi har utbetalt sykepengene dine tidligere enn vanlig. Vær derfor oppmerksom på at det kan ta litt tid før en eventuell neste utbetaling.'

    test.describe('vedtak med warning', () => {
        test('Har advarsel', async ({ page }) => {
            await page.goto('/syk/sykepenger?testperson=julesoknad&id=348a5462-456a-4bfc-9b54-11cd77a99bbb')
            await expect(page).toHaveURL(/testperson=julesoknad/)
            await expect(page.getByText(advarseltekst)).toBeVisible()
        })
    })

    test.describe('vedtak uten warning', () => {
        test('Har ikke advarsel', async ({ page }) => {
            await page.goto('/syk/sykepenger?testperson=kun-direkte&id=348a5462-456a-4bfc-9b54-11cd77a9937f')
            await expect(page).toHaveURL(/testperson=kun-direkte/)
            await expect(page.getByText('24 550 kr')).toBeVisible()
            await expect(page.getByText(advarseltekst)).not.toBeVisible()
        })
    })
})
