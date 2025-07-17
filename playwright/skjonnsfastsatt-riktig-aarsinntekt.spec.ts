import { skjonnsfastsattRiktigAarsinntekt } from '../src/data/testdata/data/vedtak/skjonnsfastsattRiktigAarsinntekt'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test, expect } from './fixtures'
import { beregnetManedsinntektRegion, visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Tester riktig omregner årsinntekt ved skjønnsfastsettelse', () => {
    const skjonnsfastsattRiktigAarsinntektVedtak = skjonnsfastsattRiktigAarsinntekt[3]

    test.describe('Vedtak for sjokkerende elektriker', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=${skjonnsfastsattRiktigAarsinntektVedtak.id}`,
            )
        })

        test('Åpner Beregning av sykepengene', async ({ page }) => {
            await visBeregningRegion(page)

            const beregnetManedsInntekt = await beregnetManedsinntektRegion(page)
            await expect(beregnetManedsInntekt).toContainText('21\u00a0000')

            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
                'Omregnet til årsinntekt',
            )
            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText('252\u00a0000')

            await expect(page.getByRole('region', { name: 'Sauefabrikk Årsinntekt' })).toContainText('Årsinntekt')
            await expect(page.getByRole('region', { name: 'Sauefabrikk Årsinntekt' })).toContainText('180\u00a0000')

            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('432\u00a0000')
        })
    })

    test.describe('Vedtak for sauefabrikk', () => {
        const skjonnsfastsattRiktigAarsinntektVedtak = skjonnsfastsattRiktigAarsinntekt[2]

        test.beforeEach(async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=${skjonnsfastsattRiktigAarsinntektVedtak.id}`,
            )
        })

        test('Åpner Beregning av sykepengene', async ({ page }) => {
            await visBeregningRegion(page)

            const beregnetManedsinntekt = await beregnetManedsinntektRegion(page)
            await expect(beregnetManedsinntekt).toContainText(formaterValuta(15_000))

            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
                'Omregnet til årsinntekt',
            )
            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
                formaterValuta(180_000),
            )

            await expect(page.getByRole('region', { name: 'Sjokkerende Elektriker Årsinntekt' })).toContainText(
                'Årsinntekt',
            )
            await expect(page.getByRole('region', { name: 'Sjokkerende Elektriker Årsinntekt' })).toContainText(
                formaterValuta(252_000),
            )

            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText(formaterValuta(432_000))
        })
    })
})
