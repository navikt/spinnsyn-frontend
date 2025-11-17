import { kunAgPeriode } from '../src/data/testdata/data/vedtak/kunAgPeriode'

import { harSynligTittel, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Vedtak som kun er innenfor arbeidsgiverperioden', () => {
    test('Viser vedtak', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=kun-ag-periode')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunAgPeriode.id)

        await harSynligTittel(page, 'Ingen utbetaling', 2)
    })
})
