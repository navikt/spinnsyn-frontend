import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
} from '../src/data/testdata/data/vedtak/skjønnsfastsatt'

import { test, expect } from './fixtures'

test.describe('Skjønnsfastsatt sykepengegrunnlag', () => {
    test.describe('Direkteutbetaling skjønnsfastsatt over 6G', () => {
        test.beforeEach('Åpner vedtaket', async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-brukerutbetaling&id=${skjønnsfastsattBrukerutbetaling.id}`,
            )
            await expect(page.getByRole('heading', { level: 1 })).toContainText('Svar på søknad om sykepenger')
        })
        test('Åpner Beregning av sykepengene', async ({ page }) => {
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()
            await expect(
                beregning.getByRole('region', { name: /Årsinntekt rapportert til skatteetaten/ }),
            ).toContainText('350\u00a0000')
            await expect(beregning.getByRole('region', { name: /Utregnet avvik/ })).toContainText('61,4 %')
            await expect(
                beregning.getByText(
                    'Årsinntekten din er skjønnsfastsatt. Se begrunnelse for skjønnsfastsetting under.',
                ),
            ).toBeVisible()
            await expect(beregning.getByRole('region', { name: /Skjønnsfastsatt årsinntekt/ })).toContainText(
                '660\u00a0000',
            )
        })

        test('Åpner begrunnelse for skjønnsfastsetting', async ({ page }) => {
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()
            await beregning.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()
            const begrunnelse = page
                .getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
                .locator('..')
                .locator('div')
            await expect(begrunnelse).toContainText(
                'Dette er en mal begrunnelse som kommer fra speil. Vi takler nye linjer.',
            )
            await expect(begrunnelse).toContainText('Nulla euismod, nisl eget ultrices ultrices')
            await expect(begrunnelse).toContainText('Dette er en tekstlig begrunnelse fra saksbehandleren din.')
        })
    })

    test.describe('Skjønnsfastsatt flere arbeidsgivere', () => {
        test.beforeEach('Åpner vedtaket', async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-flere-arbeidsgivere&id=${skjønnsfastsattFlereArbeidsgivere.id}`,
            )
            await expect(page.getByRole('heading', { level: 1 })).toContainText('Svar på søknad om sykepenger')
        })

        test('Åpner Beregning av sykepengene', async ({ page }) => {
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()
            await expect(
                beregning.getByRole('region', { name: /Årsinntekt rapportert til skatteetaten/ }),
            ).toContainText('350\u00a0000')
            await expect(beregning.getByRole('region', { name: /Utregnet avvik/ })).toContainText('61,4 %')
            await expect(
                beregning.getByText(
                    'Årsinntekten din er skjønnsfastsatt. Se begrunnelse for skjønnsfastsetting under.',
                ),
            ).toBeVisible()
            await expect(beregning.getByRole('region', { name: /Skjønnsfastsatt årsinntekt/ })).toContainText(
                '660\u00a0000',
            )
        })

        test('Åpner begrunnelse for skjønnsfastsetting', async ({ page }) => {
            const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
            await beregning.click()
            await beregning.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()
            const begrunnelse = page
                .getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
                .locator('..')
                .locator('div')
            await expect(begrunnelse).toContainText(
                'Dette er en mal begrunnelse som kommer fra speil. Vi takler nye linjer.',
            )
            await expect(begrunnelse).toContainText('Nulla euismod, nisl eget ultrices ultrices')
            await expect(begrunnelse).toContainText('Begrunnelse fra saksbehandler ved flere arbeidsgivere')
        })
    })
})
