import { expect, test } from '../fixtures'
import { visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - begrenset 6G', () => {
    test('Viser info om 6G begrensning', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=seks-g-begrensning&id=tilfeldig-uuid-6-g')
        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)

        await expect(beregningRegion.getByText('Sykepengegrunnlaget ditt er begrenset til seks ganger')).toBeVisible()
    })
})
