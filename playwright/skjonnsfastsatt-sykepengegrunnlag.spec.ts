import {
    skjønnsfastsattBrukerutbetaling,
    skjønnsfastsattFlereArbeidsgivere,
} from '../src/data/testdata/data/vedtak/skjønnsfastsatt'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test, expect } from './fixtures'
import { harSynligTittel, visBeregningRegion } from './utils/hjelpefunksjoner'

test.describe('Skjønnsfastsatt sykepengegrunnlag', () => {
    test.describe('Direkteutbetaling skjønnsfastsatt over 6 G', () => {
        test.beforeEach('Åpner vedtaket', async ({ page }) => {
            await page.goto(
                `/syk/sykepenger?testperson=skjonnsfastsatt-brukerutbetaling&id=${skjønnsfastsattBrukerutbetaling.id}`,
            )
            await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)
        })
        test('Åpner beregningRegion av sykepengene', async ({ page }) => {
            const beregningRegion = await visBeregningRegion(page)
            await expect(
                beregningRegion.getByRole('region', { name: /Årsinntekt rapportert til skatteetaten/ }),
            ).toContainText(formaterValuta(350_000))
            await expect(beregningRegion.getByRole('region', { name: /Utregnet avvik/ })).toContainText('61,4 %')
            await expect(
                beregningRegion.getByText(
                    'Årsinntekten din er skjønnsfastsatt. Se begrunnelse for skjønnsfastsetting under.',
                ),
            ).toBeVisible()
            await expect(beregningRegion.getByRole('region', { name: /Skjønnsfastsatt årsinntekt/ })).toContainText(
                formaterValuta(660_000),
            )
        })

        test('Åpner begrunnelse for skjønnsfastsetting', async ({ page }) => {
            const beregningRegion = await visBeregningRegion(page)
            await beregningRegion.click()
            await beregningRegion.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()
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
            await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)
        })

        test('Åpner beregningRegion av sykepengene', async ({ page }) => {
            const beregningRegion = await visBeregningRegion(page)
            await beregningRegion.click()
            await expect(
                beregningRegion.getByRole('region', { name: /Årsinntekt rapportert til skatteetaten/ }),
            ).toContainText(formaterValuta(350_000))
            await expect(beregningRegion.getByRole('region', { name: /Utregnet avvik/ })).toContainText('61,4 %')
            await expect(
                beregningRegion.getByText(
                    'Årsinntekten din er skjønnsfastsatt. Se begrunnelse for skjønnsfastsetting under.',
                ),
            ).toBeVisible()
            await expect(beregningRegion.getByRole('region', { name: /Skjønnsfastsatt årsinntekt/ })).toContainText(
                formaterValuta(660_000),
            )
        })

        test('Åpner begrunnelse for skjønnsfastsetting', async ({ page }) => {
            const beregningRegion = await visBeregningRegion(page)
            await beregningRegion.click()
            await beregningRegion.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()
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
