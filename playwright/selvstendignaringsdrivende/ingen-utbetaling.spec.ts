import { expect, test } from '../fixtures'
import { harSynligTittel, verifyDagTabellRows, visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - ingen utbetaling', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            '/syk/sykepenger?testperson=ingen-utbetaling-selvstendig&id=tilfeldig-uuid-ingen-utbetaling-selvstendig-vedtak',
        )
    })

    test('Viser ingen utbetaling', async ({ page }) => {
        await expect(page.getByText('Gjelder sykefravær som selvstendig næringsdrivende.')).toBeVisible()
        await harSynligTittel(page, 'Ingen utbetaling', 2)
    })

    test('Viser dekkes ikke etikett og beskrivelsestekst', async ({ page }) => {
        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        await verifyDagTabellRows(beregningRegion.getByTestId('dag-tabell-body'), [
            ['27. jul.', 'Dekkes ikke', '-'],
            ['28. jul.', 'Dekkes ikke', '-'],
        ])

        await expect(
            beregningRegion.getByText('Denne dagen teller ikke med i de 16 dagene du selv dekker', {
                exact: false,
            }),
        ).toBeVisible()

        await expect(beregningRegion.getByRole('link', { name: 'folketrygdloven § 8-34' }).first()).toBeVisible()
    })

    test('Viser dekkes ikke av nav etikett og beskrivelsestekst', async ({ page }) => {
        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        await verifyDagTabellRows(beregningRegion.getByTestId('dag-tabell-body'), [
            ['01. aug.', 'Dekkes ikke av Nav', '-'],
            ['02. aug.', 'Dekkes ikke av Nav', '-'],
            ['03. aug.', 'Dekkes ikke av Nav', '-'],
        ])

        await expect(
            beregningRegion.getByText('Denne dagen teller ikke med i de 16 dagene du selv dekker', {
                exact: false,
            }),
        ).toBeVisible()

        await expect(beregningRegion.getByRole('link', { name: 'folketrygdloven § 8-34' }).first()).toBeVisible()
    })
})
