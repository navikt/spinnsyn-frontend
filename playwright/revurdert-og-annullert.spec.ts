import { test, expect } from './fixtures'

test.describe('Revurdert og annullert', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=revurdert-og-annullert&id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
        )
    })

    test('Har annullert tekst, men ikke revurdert tekst', async ({ page }) => {
        await expect(
            page.getByText('Av tekniske årsaker er saken din flyttet til et annet saksbehandlingssystem.'),
        ).toBeVisible()
        await expect(page.getByText('Denne beslutningen er behandlet på nytt.')).not.toBeVisible()
    })
})
