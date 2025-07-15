import { vedtakMedFlereArbeidsgivere } from '../src/data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test, expect } from './fixtures'
import { beregnetManedsinntektRegion, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'

test.describe('Vedtak med flere arbeidsgivere', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await expect(page).toHaveURL(/syk\/sykepenger\?testperson=et-vedtak-flere-arbeidsgivere/)
        await trykkPaVedtakMedId(page, vedtakMedFlereArbeidsgivere.id)
        await expect(page.getByRole('heading', { name: 'Svar på søknad om sykepenger' })).toBeVisible()
    })

    test('Inntekter', async ({ page }) => {
        await expect(page.getByText('1 359 kroner')).toBeVisible()
        await expect(page.getByText('Utbetales til Industrifabrikken AS')).toBeVisible()

        const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregning.click()

        const beregnetManedsinntekt = await beregnetManedsinntektRegion(page)
        await expect(beregnetManedsinntekt).toContainText(formaterValuta(41_958))

        await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            'Omregnet til årsinntekt',
        )
        await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText('503\u00a0504')

        await expect(page.locator('[data-cy="annen-arbeidsgiver-0"]')).toContainText('Den Andre Sjappa')

        await expect(page.getByRole('region', { name: 'Den Andre Sjappa Årsinntekt' })).toContainText('Årsinntekt')
        await expect(page.getByRole('region', { name: 'Den Andre Sjappa Årsinntekt' })).toContainText('406\u00a0252')

        await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
        await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('909\u00a0757')

        await expect(page.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText('Sykepengegrunnlag')
        await expect(page.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText('638\u00a0394')
    })
})
