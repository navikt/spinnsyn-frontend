import { expect, test } from '@playwright/test'

test.describe('Begrunnelse', () => {
    test('Vedtak med innvilget begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=innvilgelse&id=bcd7b2ec-fcc1-4a8b-816c-42256138d0c4',
        )

        const panel = page.locator('[data-cy="utbetaling-panel-refusjon"]')

        await expect(panel.locator('text=Utbetales til Sauefabrikk')).toBeVisible()
        await expect(panel.locator('text=Noen av dagene er ikke innvilget fordi:')).toHaveCount(0)

        await panel.locator('button:has-text("Se nærmere begrunnelse her")').click()

        const button = page.getByRole('button', { name: 'Begrunnelse for innvilget søknad' })
        await expect(button).toContainText('Begrunnelse for innvilget søknad')

        const siblingDiv = button.locator('xpath=following-sibling::div')
        await expect(siblingDiv).toContainText('Her får du penger')
    })

    test('Vedtak med innvilget tom tekst begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=innvilgelse-tom-begrunnelse&id=bcd7b2ec-fcc1-4a8b-816c-42256138d088',
        )

        const panel = page.locator('[data-cy="utbetaling-panel-refusjon"]')

        await expect(panel.locator('text=Utbetales til Sauefabrikk')).toBeVisible()
        await expect(panel.locator('text=Noen av dagene er ikke innvilget fordi:')).toHaveCount(0)

        await expect(panel.locator('button:has-text("Se nærmere begrunnelse her")')).toHaveCount(0)
    })
})
