import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

import { harSynligTittel, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Personutbetaling uten kontonummer', () => {
    test('Viser info om at kontonummer mangler', async ({ page }) => {
        await test.step('Åpner vedtak', async () => {
            await page.goto('/syk/sykepenger?testperson=direkte-uten-kontonummer')
            await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
            await trykkPaVedtakMedId(page, kunDirekte.id)
        })

        await harSynligTittel(page, '24 550 kr Utbetales til deg', 2)
        const personutbetaling = page.getByTestId(/personutbetaling/)
        await expect(personutbetaling).toContainText('Kontonummer for utbetaling')
        await expect(personutbetaling).toContainText(
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
        )
    })
})
