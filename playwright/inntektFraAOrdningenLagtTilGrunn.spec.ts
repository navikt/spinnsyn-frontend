import { inntektHentetFraAordningen } from '../src/data/testdata/data/vedtak/inntektHentetFraAordningen'
import { formaterValuta } from '../src/utils/valuta-utils'

import { expect, test } from './fixtures'

test.describe('Vedtak med inntekt fra a-ordningen lagt i grunn', () => {
    test('Sjekker informasjon relatert til inntekt fra a-ordningen', async ({ page }) => {
        const vedtak = inntektHentetFraAordningen

        await page.goto(`/syk/sykepenger?testperson=diverse-data`)
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.locator(`a[href*="${vedtak.id}"]`).click()

        const header = page.getByRole('main').getByRole('heading', { level: 1 }).first()
        await expect(header).toBeVisible()

        const beregningArticle = page.getByRole('article', { name: 'Beregning av sykepengene' })
        await page.getByRole('main').getByRole('region', { name: 'Beregning av sykepengene' }).click()

        const viewportWidth = page.viewportSize()?.width

        if (viewportWidth === 1920) {
            await expect(
                beregningArticle.getByRole('region', { name: 'Beregnet månedsinntekt (hentet fra a-ordningen)' }),
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

        await expect(beregningArticle.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            formaterValuta(896100),
        )

        await page.getByText('Mer om beregningen').click()

        await expect(
            page.getByText(
                'Nav bruker vanligvis gjennomsnittet av inntekten din fra de siste 3 månedene før du ble syk for å beregne sykepengene dine.',
            ),
        ).toBeVisible()

        const link = page.getByText('Her kan du lese mer om hvilke inntekter som tas med i beregningen.')
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', 'https://www.nav.no/arbeidsgiver/inntektsmelding#manedsinntekten')

        await expect(
            page.getByText(
                'Hvis du har flere arbeidsforhold, men ikke er sykmeldt fra alle, vil Nav beregne månedsinntekten din for de arbeidsforholdene du ikke er sykmeldt',
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
                .getByText('Feil i vedtaket på grunn av feil i søknaden din?')
                .locator('..')
                .getByText('Du kan endre dette selv ved å'),
        )
        expect(page.getByText('Spørsmål til opplysninger hentet fra a-ordningen?'))
    })
})
