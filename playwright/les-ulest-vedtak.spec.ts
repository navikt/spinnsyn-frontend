import { vedtakAnnullert } from '../src/data/testdata/data/vedtak/annullert'
import { vedtakRevurdert } from '../src/data/testdata/data/vedtak/revurdert'
import { alleAvvisteDager } from '../src/data/testdata/data/vedtak/alleAvvisteDager'

import { test, expect } from './fixtures'

test.describe('Les uleste vedtak', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
    })

    test('Laster startside', async ({ page }) => {
        await expect(page).toHaveURL(/syk\/sykepenger$/)
    })

    test('Det er 5 uleste vedtak og 6 leste', async ({ page }) => {
        await expect(page.locator('[data-cy="uleste-vedtak"] a')).toHaveCount(5)
        await expect(page.locator('[data-cy="leste-vedtak"] a')).toHaveCount(6)
    })

    test('Åpner et ulest vedtak', async ({ page }) => {
        await page.locator(`[data-cy="uleste-vedtak"] a[href*="${alleAvvisteDager.id}"]`).click()
        await expect(page).toHaveURL(new RegExp(`id=${alleAvvisteDager.id}`))
        await expect(page.getByText('Vi fattet vedtaket 22.')).toBeVisible()
    })

    test('Den grønne boksen har riktig innhold', async ({ page }) => {
        await page.locator(`[data-cy="uleste-vedtak"] a[href*="${alleAvvisteDager.id}"]`).click()
        await expect(page.getByText('6 200 kroner')).toBeVisible()
        await expect(page.getByText('Utbetales til Integrasjon AS')).toBeVisible()
        const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningRegion.click()
        await beregningRegion.getByText('Mer om beregningen').click()
        await expect(page.getByRole('link', { name: /folketrygdloven § 8-28/ })).toHaveAttribute(
            'href',
            'https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-28',
        )
        await expect(page.getByRole('region', { name: /Beregnet månedsinntekt/ })).toContainText('30\u00a0000 kr')
        await expect(page.getByRole('region', { name: /Omregnet til årsinntekt/ })).toContainText('360\u00a0000 kr')
        await expect(page.getByRole('region', { name: /Sykepengegrunnlag/ })).toContainText('370\u00a0000 kr')
    })

    test('Den blå boksen har riktig innhold', async ({ page }) => {
        await page.locator(`[data-cy="uleste-vedtak"] a[href*="${alleAvvisteDager.id}"]`).click()
        const region = page.getByRole('region', { name: 'Antall sykepengedager som gjenstår' })
        await expect(region).toContainText('10 sykepengedager')
        await expect(region).toContainText('Brukt per 5. mars 2021')
        await region.click()
        await expect(page.getByText('238 sykepengedager')).toBeVisible()
        await expect(page.getByText('Gjenstår per 5. mars 2021')).toBeVisible()
        await expect(page.getByText('2. feb. 2022')).toBeVisible()
        await expect(page.getByText('Beregnet slutt på sykepenger')).toBeVisible()
        await expect(page.getByText('Datoen gjelder hvis du er sykmeldt uten opphold.')).toBeVisible()
    })

    test('Vi går tilbake til oversikten', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
    })

    test('Det er fortsatt 5 uleste vedtak og 6 leste', async ({ page }) => {
        await expect(page.locator('[data-cy="uleste-vedtak"] a')).toHaveCount(5)
        await expect(page.locator('[data-cy="leste-vedtak"] a')).toHaveCount(6)
    })

    test('Åpner et annullert vedtak', async ({ page }) => {
        await page.locator('[data-cy="leste-vedtak"] a').nth(2).click({ force: true })
        await expect(page).toHaveURL(new RegExp(`id=${vedtakAnnullert.id}`))
        await page.getByText('Dette lurer mange på når vedtaket behandles på nytt').click()
        const info = page.locator('[data-cy="annullering-info"]')
        await expect(info).toContainText('Må jeg gjøre noe nå?')
        await expect(info).not.toContainText('Vil dette ha noe å si for pengene jeg får?')
        await expect(info).not.toContainText('Hvem har sendt opplysningene?')
        await expect(info).not.toContainText('Hvorfor behandles vedtaket på nytt?')
    })

    test('Åpner et revurdert vedtak', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await page.locator('[data-cy="leste-vedtak"] a').nth(3).click({ force: true })
        await expect(page).toHaveURL(new RegExp(`id=${vedtakRevurdert.id}`))
        await page.getByText('Dette lurer mange på når vedtaket behandles på nytt').click()
        const info = page.locator('[data-cy="annullering-info"]')
        await expect(info).toContainText('Vil dette ha noe å si for pengene jeg får?')
        await expect(info).toContainText('Hvem har sendt opplysningene?')
        await expect(info).toContainText('Hvorfor behandles vedtaket på nytt?')
        await expect(info).toContainText('Må jeg gjøre noe nå?')
    })

    test('Vedtaket viser beregnet sluttdato sendt fra bømlo', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await page.locator('[data-cy="leste-vedtak"] a').nth(3).click({ force: true })
        const region = page.getByRole('region', { name: 'Antall sykepengedager som gjenstår' }).nth(0)
        await expect(region).toContainText('9 sykepengedager')
        await expect(region).toContainText('Brukt per 3. mai 2021')
        await expect(region).toHaveCSS('background-color', 'rgb(236, 238, 240)')
        await region.click()
        await expect(page.getByText('186 sykepengedager')).toBeVisible()
        await expect(page.getByText('Gjenstår per 3. mai 2021')).toBeVisible()
        await expect(page.getByText('11. nov. 1918')).toBeVisible()
        await expect(page.getByText('Beregnet slutt på sykepenger')).toBeVisible()
    })
})
