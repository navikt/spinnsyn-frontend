import { expect, test } from '../fixtures'
import { harSynligTittel } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - bare venteperiode', () => {
    test('Viser ingen utbetaling', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=bare-venteperiode&id=tilfeldig-uuid-bare-venteperiode-vedtak')
        await expect(page.getByText('Gjelder sykefravær som selvstendig næringsdrivende.')).toBeVisible()

        await harSynligTittel(page, 'Ingen utbetaling', 2)
    })
})
