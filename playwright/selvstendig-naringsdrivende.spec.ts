import { expect, test } from './fixtures'
import { visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende', () => {
    test('Burde åpne riktig vedtak', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=standard-selvstendig')

        await page.getByRole('link', { name: /Sykmeldt som selvstendig næringsdrivende /i }).click()
        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()
    })

    test('Viser info om selvstendig næringsdrivende', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=standard-selvstendig&id=standard-vedtak-naringsdrivende')

        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()
        const beregningRegion = await visBeregningRegion(page)
        await expect(
            beregningRegion.getByText(
                'Som selvstendig næringsdrivende har du rett til sykepenger tilsvarende 80% av sykepengegrunnlaget.',
            ),
        ).toBeVisible()

        await beregningRegion.getByRole('button', { name: 'Mer om beregningen' }).click()
        await expect(
            beregningRegion.getByText(
                'Vi bruker vanligvis gjennomsnittet av den pensjonsgivende inntekten din for de siste 3 årene før du ble syk for å beregne sykepengegrunnlaget. Inntekten blir justert etter årlige endringer i grunnbeløpet i folketrygden.',
            ),
        ).toBeVisible()
    })
})
