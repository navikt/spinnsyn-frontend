import { under2gInntekt } from '../src/data/testdata/data/personas/personas'

import { test, expect } from './fixtures'

test.describe('Melding ved under 2g', () => {
    const vedtak = under2gInntekt.vedtak[0]

    test.beforeEach(async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?testperson=under-2g-beskjed&id=${vedtak.id}`)
        await expect(page.getByRole('heading', { name: /Svar på søknad om sykepenger/i })).toBeVisible()
    })

    test('Utbetalingsoversikt og melding', async ({ page }) => {
        await expect(page.getByText('8 459')).toBeVisible()
        await expect(page.getByText('Utbetales til Sauefabrikk')).toBeVisible()

        const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningRegion.click()

        await expect(
            page.getByText(
                'Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller kravene for arbeidsavklaringspenger, kan du velge å få det isteden.',
            ),
        ).toBeVisible()
    })
})
