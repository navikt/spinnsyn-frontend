import { test, expect } from './fixtures'

test.describe('Minimum inntekt over 67', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=for-lav-inntekt-67&id=3ef1f882-4dbf-478d-bc98-5b878e7376ca',
        )
    })

    test('Vedtak med avviste dager og ingen utbetaling grunnet minimum inntekt over 67', async ({ page }) => {
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const beregningsRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningsRegion.click()
        const begrunnelseAccordion = page.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
        await expect(begrunnelseAccordion).toBeVisible()
        await begrunnelseAccordion.click()
        await expect(page.getByText('Dette er årsaken til avviket.')).toBeVisible()
    })
})
