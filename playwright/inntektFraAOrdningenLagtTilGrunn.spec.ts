import { inntektHentetFraAordningen } from '../src/data/testdata/data/vedtak/inntektHentetFraAordningen'
import { formaterValuta } from '../src/utils/valuta-utils'

import { expect, test } from './fixtures'
import {
    beregnetManedsinntektRegion,
    harSynligTittel,
    trykkPaVedtakMedId,
    visBeregningRegion,
} from './utils/hjelpefunksjoner'

test.describe('Vedtak med inntekt fra a-ordningen lagt i grunn', () => {
    test('Sjekker informasjon relatert til inntekt fra a-ordningen', async ({ page }) => {
        const vedtak = inntektHentetFraAordningen

        await page.goto(`/syk/sykepenger?testperson=diverse-data`)
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await trykkPaVedtakMedId(page, vedtak.id)

        await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)

        const beregningRegion = await visBeregningRegion(page)

        const beregnetManedsInntekt = await beregnetManedsinntektRegion(page, 'a-ordningen')
        await expect(beregnetManedsInntekt).toContainText(formaterValuta(74_675))

        await expect(beregningRegion.getByRole('region', { name: 'Omregnet til årsinntekt' })).toContainText(
            formaterValuta(896100),
        )

        await page.getByText('Mer om beregningen').click()

        await expect(
            page.getByText(
                'Nav bruker vanligvis gjennomsnittet av inntekten din fra de siste tre månedene før du ble syk for å beregne sykepengene dine.',
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

        const behandlingHeader = page.getByTestId('behandling-header')
        await expect(behandlingHeader).toHaveText('Søknaden ble behandlet automatisk')
        await expect(behandlingHeader).toBeVisible()

        const behandlingBody = page.getByTestId('behandling-body')
        await expect(behandlingBody).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din og offentlige registre.  Søknaden ble behandlet 23. oktober 2021.',
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
