import { under2gInntekt } from '../src/data/testdata/data/personas/personas'

import { test, expect } from './fixtures'
import { harSynligTittel, visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Melding ved under 2 G', () => {
    const vedtak = under2gInntekt.vedtak[0]

    test.beforeEach(async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?testperson=under-2g-beskjed&id=${vedtak.id}`)
        await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)
    })

    test('Utbetalingsoversikt og melding', async ({ page }) => {
        await expect(page.getByText('8 459')).toBeVisible()
        await expect(page.getByText('Utbetales til Sauefabrikk')).toBeVisible()
        await visBeregningRegion(page)
        await expect(
            page.getByText(
                'Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller kravene for arbeidsavklaringspenger, kan du velge å få det isteden.',
            ),
        ).toBeVisible()
    })
})
