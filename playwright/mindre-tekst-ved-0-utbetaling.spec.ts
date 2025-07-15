import { vedtakMed0Utbetaling } from '../src/data/testdata/data/vedtak/vedtakMed0Utbetaling'

import { trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Ved et vedtak med null utbetaling vises ikke tekst om hvem som får null kroner', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=vedtak-med-0-utbetaling')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, vedtakMed0Utbetaling.id)
    })

    test('Inntekter', async ({ page }) => {
        await expect(page.getByText('Gjelder sykefravær fra Coop Extra Brumunddal')).toBeVisible()
        await expect(page.locator('body')).not.toContainText('Beløpet går til arbeidsgiveren din')
    })
})
