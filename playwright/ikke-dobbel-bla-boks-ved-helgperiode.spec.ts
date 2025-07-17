import { ingenUtbetalingFordiAlleDagerHelg } from '../src/data/testdata/data/vedtak/ingenUtbetalingFordiAlleDagerHelg'

import { test, expect } from './fixtures'
import { trykkPaVedtakMedId, verifyDagTabellRows, visBeregningRegion } from './utils/hjelpefunksjoner'

const baseUrl = 'http://localhost:3000/syk/sykepenger?testperson=diverse-data'

test.describe('Ved et vedtak med null utbetaling vises ikke tekst om hvem som får null kroner', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl)
        await trykkPaVedtakMedId(page, ingenUtbetalingFordiAlleDagerHelg.id)
    })

    test('Inntekter', async ({ page }) => {
        await expect(page.getByRole('heading', { level: 2, name: 'Ingen utbetaling' })).toBeVisible()
        await expect(page.locator('body')).not.toContainText('0 kroner')
        await expect(page.getByText('Hvorfor får jeg ingen utbetaling')).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByText('Dine sykepenger per dag').click()

        const dager = beregningRegion.locator('[data-cy="dag-tabell-body"]')
        await verifyDagTabellRows(dager, [
            ['26.okt.', 'Helg', '-'],
            ['27.okt.', 'Helg', '-'],
        ])

        const forklaring = beregningRegion.locator('[data-cy="dagtabell-forklaring"]')
        await expect(forklaring.getByText('Sykepenger betales bare for dagene mandag til fredag')).toBeVisible()
    })
})
