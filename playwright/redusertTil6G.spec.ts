import { vedtakMedDetMeste } from '../src/data/testdata/data/vedtak/medDetMeste'
import { formaterValuta } from '../src/utils/valuta-utils'

import { beregnetManedsinntektRegion, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { expect, test } from './fixtures'

test.describe('Redusert til 6G', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
        await trykkPaVedtakMedId(page, vedtakMedDetMeste.id)
    })

    test('Utbetalingsoversikt', async ({ page }) => {
        await expect(page.getByText('3 021 kroner').locator('..')).toContainText('til Posten Norge AS, Bærum')

        await page.getByRole('region', { name: 'Beregning av sykepengene' }).click()
        await page.getByText('Mer om beregningen').click({ force: true })

        const article = page.getByRole('article', { name: 'Beregning av sykepengene' })

        const beregnetManedsinntekt = await beregnetManedsinntektRegion(page)
        await expect(beregnetManedsinntekt).toContainText(formaterValuta(74_675))

        await expect(article.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            'Omregnet til årsinntekt',
        )
        await expect(article.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            formaterValuta(896_100),
        )

        await expect(article.locator('[data-cy="annen-arbeidsgiver-0"]')).toContainText('The Ministry Of Magic AS')

        await expect(article.getByRole('region', { name: 'The Ministry Of Magic AS Årsinntekt' })).toContainText(
            'Årsinntekt',
        )
        await expect(article.getByRole('region', { name: 'The Ministry Of Magic AS Årsinntekt' })).toContainText(
            formaterValuta(195_781),
        )

        await expect(article.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
        await expect(article.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText(
            formaterValuta(1_091_881),
        )

        await expect(article.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText('Sykepengegrunnlag')
        await expect(article.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText(formaterValuta(638_394))

        await expect(article).toContainText('Sykepengegrunnlaget er begrenset til 6G')
    })
})
