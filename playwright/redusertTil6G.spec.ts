import { vedtakMedDetMeste } from '../src/data/testdata/data/vedtak/medDetMeste'
import { formaterValuta } from '../src/utils/valuta-utils'

import { beregnetManedsinntektRegion, trykkPaVedtakMedId, visBeregningRegion } from './utils/hjelpefunksjoner'
import { expect, test } from './fixtures'

test.describe('Redusert til 6G', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
        await trykkPaVedtakMedId(page, vedtakMedDetMeste.id)
    })

    test('Utbetalingsoversikt', async ({ page }) => {
        await expect(page.getByText('3 021 kroner').locator('..')).toContainText('til Posten Norge AS, Bærum')

        const beregningRegion = await visBeregningRegion(page)
        const beregnetManedsinntekt = await beregnetManedsinntektRegion(page)
        await expect(beregnetManedsinntekt).toContainText(formaterValuta(74_675))

        await expect(beregningRegion.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            'Omregnet til årsinntekt',
        )
        await expect(beregningRegion.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            formaterValuta(896_100),
        )

        await expect(beregningRegion.locator('[data-cy="annen-arbeidsgiver-0"]')).toContainText(
            'The Ministry Of Magic AS',
        )

        await expect(
            beregningRegion.getByRole('region', { name: 'The Ministry Of Magic AS Årsinntekt' }),
        ).toContainText('Årsinntekt')
        await expect(
            beregningRegion.getByRole('region', { name: 'The Ministry Of Magic AS Årsinntekt' }),
        ).toContainText(formaterValuta(195_781))

        await expect(beregningRegion.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText(
            'Samlet årsinntekt',
        )
        await expect(beregningRegion.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText(
            formaterValuta(1_091_881),
        )

        await expect(beregningRegion.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText(
            'Sykepengegrunnlag',
        )
        await expect(beregningRegion.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText(
            formaterValuta(638_394),
        )

        await expect(beregningRegion).toContainText('Sykepengegrunnlaget er begrenset til 6G')
    })
})
