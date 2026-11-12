import { formaterValuta } from '../../src/utils/valuta-utils'
import { expect, test } from '../fixtures'
import { visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - begrenset 6 G', () => {
    test('Viser info om 6 G begrensning', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=seks-g-begrensning&id=tilfeldig-uuid-6-g')
        await expect(page.getByText('Gjelder sykefravær som')).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)

        await expect(beregningRegion.getByRole('region', { name: 'Justert gjennomsnittlig årsinntekt' })).toContainText(
            formaterValuta(812_511),
        )
        await expect(beregningRegion.getByText('Sykepengegrunnlaget ditt er begrenset til seks ganger')).toBeVisible()
    })
})
