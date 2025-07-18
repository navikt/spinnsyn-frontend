import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

import { test, expect } from './fixtures'
import { trykkPaVedtakMedId, visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Tidligere utbetalt hel arbeidsgiverperiode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=kun-direkte')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunDirekte.id)
        await expect(page.getByRole('heading', { level: 1, name: 'Svar på søknad om sykepenger' })).toBeVisible()
    })

    test('Åpner beregning av sykepengene', async ({ page }) => {
        const beregningRegion = await visBeregningRegion(page)
        await expect(beregningRegion.getByText('Dine sykepenger per dag')).toBeVisible()
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()
        await expect(beregningRegion).toContainText(
            'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at du ikke har gjenopptatt arbeidet og deretter vært friskmeldt i mer enn 16 dager. Nav har derfor utbetalt sykepenger fra første dag du ble sykmeldt.',
        )
    })
})
