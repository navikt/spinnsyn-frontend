import { skjonnsfastsattRiktigAarsinntekt } from '../src/data/testdata/data/vedtak/skjonnsfastsattRiktigAarsinntekt'

import { test, expect } from './fixtures'

test.describe('Tester riktig omregner årsinntekt ved skjønnsfastsettelse', () => {
    const skjonnsfastsattRiktigAarsinntektVedtak = skjonnsfastsattRiktigAarsinntekt[3]

    test.describe('Vedtak for sjokkerende elektriker', () => {
        test.beforeEach(async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=${skjonnsfastsattRiktigAarsinntektVedtak.id}`,
            )
        })

        test('Åpner Beregning av sykepengene', async ({ page }) => {
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()

            await expect(
                page.getByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' }),
            ).toContainText('Beregnet månedsinntekt')
            await expect(
                page.getByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' }),
            ).toContainText('21\u00a0000')

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
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()

            await expect(
                page.getByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' }),
            ).toContainText('Beregnet månedsinntekt')
            await expect(
                page.getByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' }),
            ).toContainText('15\u00a0000')

            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
                'Omregnet til årsinntekt',
            )
            await expect(page.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText('180\u00a0000')

            await expect(page.getByRole('region', { name: 'Sjokkerende Elektriker Årsinntekt' })).toContainText(
                'Årsinntekt',
            )
            await expect(page.getByRole('region', { name: 'Sjokkerende Elektriker Årsinntekt' })).toContainText(
                '252\u00a0000',
            )

            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('Samlet årsinntekt')
            await expect(page.getByRole('region', { name: 'Samlet årsinntekt' })).toContainText('432\u00a0000')
        })
    })
})
