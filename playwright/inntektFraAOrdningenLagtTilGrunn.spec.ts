import { expect } from '@playwright/test'

import { inntektHentetFraAordningen } from '../src/data/testdata/data/vedtak/inntektHentetFraAordningen'
import { formaterValuta } from '../src/utils/valuta-utils'

import { test } from './fixtures'

test.describe('Vedtak med inntekt fra a-ordningen lagt i grunn', () => {
    const vedtak = inntektHentetFraAordningen

    test('Sjekker informasjon relatert til inntekt fra a-ordningen', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=diverse-data')
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.locator(`a[href*="${vedtak.id}"]`).click()

        const header = page.locator('main').locator('h1').first()
        await expect(header).toBeVisible()

        page.locator('text=3 021 kroner').locator('..').locator('text=til Posten Norge AS, Bærum')

        await page.locator('main').locator('role=region[name="Beregning av sykepengene"]').click()

        const beregningArticle = page.locator('role=article[name="Beregning av sykepengene"]')

        const beregnetMaanedsinntekt = beregningArticle.locator('.navds-body-short.navds-body-short--small', {
            hasText: 'Beregnet månedsinntekt',
        })
        await expect(beregnetMaanedsinntekt).toBeVisible()

        const hentetFraAOrdningen = beregningArticle.locator('.navds-body-short.navds-body-short--small p')
        await expect(hentetFraAOrdningen).toHaveText('(hentet fra a-ordningen)')

        await expect(beregningArticle).toContainText(formaterValuta(74675))

        await expect(beregningArticle.locator('role=region[name="Omregnet til årsinntekt"]')).toContainText(
            formaterValuta(896100),
        )

        await page.locator('text=Mer om beregningen').click({ force: true })

        await expect(
            page.locator(
                'text=Nav bruker vanligvis gjennomsnittet av inntekten din fra de siste 3 månedene før du ble syk for å beregne sykepengene dine.',
            ),
        ).toBeVisible()

        const link = page.locator('text=Her kan du lese mer om hvilke inntekter som tas med i beregningen.')
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', 'https://www.nav.no/arbeidsgiver/inntektsmelding#manedsinntekten')

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
