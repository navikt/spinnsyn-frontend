import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

import { trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Personutbetaling uten kontonummer', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=direkte-uten-kontonummer')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunDirekte.id)
    })

    test('Viser info om at kontonummer mangler', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 2, name: '24 550 kr' })).toBeVisible()
        const personutbetaling = page.getByTestId(/personutbetaling/)
        await expect(personutbetaling.getByText('Du får utbetalt')).toBeVisible()
        await expect(personutbetaling).toContainText('Kontonummer for utbetaling')
        await expect(personutbetaling).toContainText(
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
        )
    })
})
