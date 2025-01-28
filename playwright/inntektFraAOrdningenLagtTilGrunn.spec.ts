import { Browser, BrowserContextOptions, expect, Page, test as base } from '@playwright/test'

import { inntektHentetFraAordningen } from '../src/data/testdata/data/vedtak/inntektHentetFraAordningen'
import { formaterValuta } from '../src/utils/valuta-utils'

const configurations = [
    { name: 'Desktop Chromium', options: { viewport: { width: 1920, height: 1080 } } },
    { name: 'Mobile Chromium', options: { viewport: { width: 375, height: 667 }, isMobile: true } },
    { name: 'Desktop Firefox', options: { viewport: { width: 1920, height: 1080 }, browserName: 'firefox' } },
    {
        name: 'Mobile Firefox',
        options: { viewport: { width: 375, height: 667 }, isMobile: true, browserName: 'firefox' },
    },
    { name: 'Desktop WebKit', options: { viewport: { width: 1920, height: 1080 }, browserName: 'webkit' } },
    {
        name: 'Mobile WebKit',
        options: { viewport: { width: 375, height: 667 }, isMobile: true, browserName: 'webkit' },
    },
]

configurations.forEach(({ name, options }: { name: string; options: BrowserContextOptions }) => {
    const test = base.extend<{
        page: Page
    }>({
        page: async ({ browser }: { browser: Browser }, use: (page: Page) => Promise<void>) => {
            const filteredOptions =
                browser.browserType().name() === 'firefox'
                    ? // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      (({ isMobile, ...rest }) => rest)(options) // Inline destructuring to exclude `isMobile`
                    : options

            const context = await browser.newContext(filteredOptions)
            const page = await context.newPage()
            // eslint-disable-next-line react-hooks/rules-of-hooks
            await use(page)
            await context.close()
        },
    })

    test.describe('Vedtak med inntekt fra a-ordningen lagt i grunn' + name, () => {
        test('Sjekker informasjon relatert til inntekt fra a-ordningen', async ({ page }) => {
            const vedtak = inntektHentetFraAordningen

            await page.goto('http://localhost:3000/syk/sykepenger?testperson=diverse-data')
            await page.emulateMedia({ reducedMotion: 'reduce' })
            await page.locator(`a[href*="${vedtak.id}"]`).click()

            const header = page.locator('main').locator('h1').first()
            await expect(header).toBeVisible()

            const beregningArticle = page.locator('role=article[name="Beregning av sykepengene"]')
            await page.locator('main').locator('role=region[name="Beregning av sykepengene"]').click()

            if (options.viewport?.width === 1920) {
                await expect(
                    beregningArticle.locator('role=region[name="Beregnet månedsinntekt (hentet fra a-ordningen)"]'),
                ).toContainText(formaterValuta(74675))
            } else {
                const beregnetMaanedsinntekt = beregningArticle.locator('.navds-body-short.navds-body-short--small', {
                    hasText: 'Beregnet månedsinntekt',
                })
                await expect(beregnetMaanedsinntekt).toBeVisible()

                const hentetFraAOrdningen = beregningArticle.locator('.navds-body-short.navds-body-short--small p')
                await expect(hentetFraAOrdningen).toHaveText('(hentet fra a-ordningen)')

                await expect(beregningArticle).toContainText(formaterValuta(74675))
            }

            await expect(beregningArticle.locator('role=region[name="Omregnet til årsinntekt"]')).toContainText(
                formaterValuta(896100),
            )

            await page.getByText('Mer om beregningen').click()

            await expect(
                page.getByText(
                    'Nav bruker vanligvis gjennomsnittet av inntekten din fra de siste 3 månedene før du ble syk for å beregne sykepengene dine.',
                ),
            ).toBeVisible()

            const link = page.locator('text=Her kan du lese mer om hvilke inntekter som tas med i beregningen.')
            await expect(link).toBeVisible()
            await expect(link).toHaveAttribute(
                'href',
                'https://www.nav.no/arbeidsgiver/inntektsmelding#manedsinntekten',
            )

            await expect(
                page.locator(
                    'text=Hvis du har flere arbeidsforhold, men ikke er sykmeldt fra alle, vil Nav beregne månedsinntekten din for de arbeidsforholdene du ikke er sykmeldt',
                ),
            ).toBeVisible()

            const behandlingHeader = page.locator('[data-cy="behandling-header"]')
            await expect(behandlingHeader).toHaveText('Søknaden er behandlet automatisk')
            await expect(behandlingHeader).toBeVisible()

            const behandlingBody = page.locator('[data-cy="behandling-body"]')
            await expect(behandlingBody).toContainText(
                'Vi fattet vedtaket 23. oktober 2021. Opplysningene er hentet fra søknaden din og offentlige registre.',
            )
            expect(
                page
                    .locator('text=Feil i vedtaket på grunn av feil i søknaden din?')
                    .locator('..')
                    .locator('text=Du kan endre dette selv ved å'),
            )
            expect(page.locator('text=Spørsmål til opplysninger hentet fra a-ordningen?'))
        })
    })
})
