import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

import { test, expect } from './fixtures'
import { trykkPaVedtakMedId, visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Kun personutbetaling', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=kun-direkte')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunDirekte.id)
    })
    test('Viser info om utbetaling til person', async ({ page }) => {
        const personutbetalingSection = page.getByTestId(/personutbetaling/)
        await expect(
            personutbetalingSection.getByText(
                'Du får noen av sykepengene dine fra Nav og resten fra arbeidsgiveren din. Arbeidsgiveren din får igjen pengene fra NAV senere.',
            ),
        ).not.toBeVisible()
        await expect(page.getByText('Utbetales til Matbutikken AS')).not.toBeVisible()

        const header = page.getByRole('heading', { level: 2, name: '24 550 kr' })
        await expect(header).toBeVisible()

        const panel = page.getByTestId('utbetaling-panel-personutbetaling')
        await expect(panel).toHaveCSS('background-color', 'rgb(216, 249, 255)')

        await expect(panel.getByRole('heading', { name: /Kontonummer for utbetaling:/ })).toBeVisible()
        await expect(panel.getByText('1001 11 10011')).toBeVisible()
        await panel.getByText('Når får du sykepengene?').click()
        await expect(panel).toContainText('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden')

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByText('Mer om beregningen').click()
        await expect(beregningRegion).toContainText('Totalbeløp')
        await expect(beregningRegion).toContainText('Når du får utbetalt sykepenger fra Nav viser totalbeløp')
    })

    test('Ekspanderer blått panel', async ({ page }) => {
        await page.getByText('Gjenstående sykedager').click({ force: true })
        await expect(page.getByText('238 sykepengedager')).toBeVisible()
    })
})
