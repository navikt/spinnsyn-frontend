import { vedtakMedFlereArbeidsgivere } from '../src/data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test, expect } from './fixtures'
import { beregnetManedsinntektRegion, trykkPaVedtakMedId, visBeregningRegion } from './utils/hjelpefunksjoner'

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

        await visBeregningRegion(page)

        const beregnetManedsinntekt = await beregnetManedsinntektRegion(page)
        await expect(beregnetManedsinntekt).toContainText(formaterValuta(41_958))

        await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            'Omregnet til årsinntekt',
        )
        await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            formaterValuta(503_504),
        )

        await expect(page.locator('[data-cy="annen-arbeidsgiver-0"]')).toContainText('Den Andre Sjappa')

        await expect(page.getByRole('region', { name: 'Den Andre Sjappa Årsinntekt' })).toContainText('Årsinntekt')
        await expect(page.getByRole('region', { name: 'Den Andre Sjappa Årsinntekt' })).toContainText(
            formaterValuta(406_252),
        )

        await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
        await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText(formaterValuta(909_757))

        await expect(page.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText('Sykepengegrunnlag')
        await expect(page.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText(formaterValuta(638_394))
    })
})
