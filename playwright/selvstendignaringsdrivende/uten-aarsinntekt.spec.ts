import { expect, test } from '../fixtures'
import { visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - begrenset 6G', () => {
    test('Viser info om 6G begrensning', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=uten-aarsintekt&id=tilfeldig-uuid-uten-aarsinntekt')
        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)

        await expect(beregningRegion.getByText('Inntekten din')).toBeHidden()
    })
})
