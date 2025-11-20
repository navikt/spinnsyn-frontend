import { ingenUtbetalingFordiAlleDagerHelg } from '../src/data/testdata/data/vedtak/ingenUtbetalingFordiAlleDagerHelg'

import { expect, test } from './fixtures'
import { harSynligTittel, trykkPaVedtakMedId, verifyDagTabellRows, visBeregningRegion } from './utils/hjelpefunksjoner'

const baseUrl = 'http://localhost:3000/syk/sykepenger?testperson=diverse-data'

test.describe('Ved et vedtak med null utbetaling vises ikke tekst om hvem som får null kroner', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl)
        await trykkPaVedtakMedId(page, ingenUtbetalingFordiAlleDagerHelg.id)
    })

    test('Inntekter', async ({ page }) => {
        await harSynligTittel(page, 'Ingen utbetaling', 2)
        await expect(page.locator('body')).not.toContainText('0 kroner')
        await expect(page.getByText('Hvorfor får jeg ingen utbetaling')).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByText('Dine sykepenger per dag').click()

        const dager = beregningRegion.getByTestId('dag-tabell-body')
        await verifyDagTabellRows(dager, [
            ['26. okt.', 'Helg', '-'],
            ['27. okt.', 'Helg', '-'],
        ])

        const forklaring = beregningRegion.getByTestId('dagtabell-forklaring')
        await expect(
            forklaring.getByText(
                'Du får bare sykepenger for dagene mandag til fredag. Hvis du jobber i helgen, blir disse dagene likevel tatt med i beregningen, men utbetalingen blir fordelt på ukedagene. Du får ikke sykepenger hvis du bare har vært sykmeldt lørdag og/eller søndag. Se folketrygdloven § 8-11.',
            ),
        ).toBeVisible()
    })
})
