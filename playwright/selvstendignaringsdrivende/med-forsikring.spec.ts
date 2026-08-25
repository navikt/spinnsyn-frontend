import { expect, test } from '../fixtures'
import { verifyDagTabellRows, visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - med forsikring', () => {
    test('Burde åpne riktig vedtak', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=med-forsikring')

        await page.getByRole('link', { name: /Sykmeldt som selvstendig næringsdrivende/i }).click()
        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()
    })

    test('Viser info om selvstendig næringsdrivende', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=med-forsikring&id=tilfeldig-uuid-med-forsikring')

        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()
        const beregningRegion = await visBeregningRegion(page)
        await expect(beregningRegion.getByText('2022')).toBeVisible()
        await expect(beregningRegion.getByText('720 000')).toBeVisible()

        await expect(
            beregningRegion.getByText(
                'Som selvstendig næringsdrivende har du rett til sykepenger tilsvarende 80 % av sykepengegrunnlaget.',
            ),
        ).toBeVisible()

        await expect(
            beregningRegion.getByText(
                'Sykepengene dine er beregnet med forsikringen din for selvstendig næringsdrivende, som gir deg 100 % fra dag 1 av sykepengegrunnlaget (folketrygdloven §8-35).',
            ),
        ).toBeVisible()

        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()
        const dagTabell = page.getByTestId('dag-tabell-body').first()
        await verifyDagTabellRows(dagTabell, [['01. aug.', 'Dekkes ikke av Nav', '-']])

        await beregningRegion.getByRole('button', { name: 'Mer om beregningen' }).click()
        await expect(
            beregningRegion.getByText(
                'Vi bruker vanligvis gjennomsnittet av den pensjonsgivende inntekten din for de siste tre årene før du ble syk for å beregne sykepengegrunnlaget. Inntekten blir justert etter årlige endringer i grunnbeløpet i folketrygden.',
            ),
        ).toBeVisible()
    })
})
