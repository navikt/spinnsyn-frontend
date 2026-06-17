import { expect, test } from '../fixtures'
import { harSynligTittel, verifyDagTabellRows, visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - bare venteperiode', () => {
    test('Viser ingen utbetaling', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=bare-venteperiode&id=tilfeldig-uuid-bare-venteperiode-vedtak')
        await expect(page.getByText('Gjelder sykefravær som selvstendig næringsdrivende.')).toBeVisible()

        await harSynligTittel(page, 'Ingen utbetaling', 2)
    })

    test('Viser MeldingTilNavDagUtenforVentetid med riktig etikett og beskrivelsestekst', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=bare-venteperiode&id=tilfeldig-uuid-bare-venteperiode-vedtak')

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        await verifyDagTabellRows(beregningRegion.getByTestId('dag-tabell-body'), [
            ['16. aug.', 'Dekkes ikke', '-'],
            ['17. aug.', 'Dekkes ikke', '-'],
        ])

        await expect(
            beregningRegion.getByText('Denne dagen teller ikke med i de 16 dagene du selv dekker', {
                exact: false,
            }),
        ).toBeVisible()

        await expect(beregningRegion.getByRole('link', { name: 'folketrygdloven § 8-34' })).toBeVisible()
    })
})
