import { kunArbeidsgiverperiode } from '../src/data/testdata/data/vedtak/kunArbeidsgiverperiode'

import { harSynligTekst, harSynligTittel, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Vedtak som kun er innenfor arbeidsgiverperioden', () => {
    test('Viser vedtak', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=ingen-utbetaling-kun-arbeidsgiverperiode')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunArbeidsgiverperiode.id)

        await harSynligTekst(page, 'Søknaden er behandlet')
        await harSynligTittel(page, 'Utbetaling fra arbeidsgiver', 2)
        await harSynligTekst(
            page,
            'Arbeidsgiverperioden er de første 16 dagene av et sykefravær. I denne perioden er det Posten Norge AS, Bærum som betaler sykepengene dine.',
        )
    })
})
