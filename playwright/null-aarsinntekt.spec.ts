import { nullOmregnetAarsinntekt } from '../src/data/testdata/data/vedtak/nullOmregnetAarsinntekt'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test, expect } from './fixtures'
import { beregnetManedsinntektRegion, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'

test.describe('Har null i årsinntekt', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=null-omregnet-aarsinntekt')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, nullOmregnetAarsinntekt.id)
        await expect(page.getByRole('heading', { level: 1, name: 'Svar på søknad om sykepenger' })).toBeVisible()
    })

    test('Åpner beregning av sykepengene', async ({ page }) => {
        await page.getByRole('region', { name: 'Beregning av sykepengene' }).click()
        const artikkel = page.getByRole('article', { name: 'Beregning av sykepengene' })

        const manedsinntekt = await beregnetManedsinntektRegion(page)
        await expect(manedsinntekt).toContainText(formaterValuta(0))

        const aarsinntekt = artikkel.getByRole('region', { name: 'Omregnet til årsinntekt' })
        await expect(aarsinntekt).toContainText('Omregnet til årsinntekt')
        await expect(aarsinntekt).toContainText(formaterValuta(0))
    })

    test('Åpner begrunnelse for skjønnsfastsetting', async ({ page }) => {
        const beregning = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregning.click()
        await beregning.getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()
        const begrunnelse = page
            .getByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
            .locator('..')
            .locator('div')
        await expect(begrunnelse).toBeVisible()
        await expect(begrunnelse.locator('..')).toContainText(
            'Du er sykmeldt ved overgang fra foreldrepenger bla bla mer greier',
        )
    })
})
