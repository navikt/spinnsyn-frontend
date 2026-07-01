import { arbeidstakerKunArbeidsgiverperiode } from '../src/data/testdata/data/vedtak/arbeidstakerKunArbeidsgiverperiode'

import { harSynligTekst, harSynligTittel, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'
import { test, expect } from './fixtures'

test.describe('Vedtak som kun er innenfor arbeidsgiverperioden', () => {
    test('Viser vedtak', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=ingen-utbetaling-kun-arbeidsgiverperiode')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, arbeidstakerKunArbeidsgiverperiode.id)

        await harSynligTekst(page, 'Søknaden er behandlet')
        await harSynligTittel(page, 'Ingen utbetaling fra Nav', 2)
        await harSynligTekst(page, 'Sykefraværet er innenfor arbeidsgiverperioden')
        await harSynligTekst(
            page,
            'Arbeidsgiverperioden er de første 16 dagene av et sykefravær. ' +
                'I denne perioden er det Posten Norge AS, Bærum som er ansvarlig for å utbetale sykepengene dine.',
        )
    })
})

test.describe('Vedtak med arbeidsgiverperiode etterfulgt av helg', () => {
    test('Viser vedtak med helg-forklaring', async ({ page }) => {
        await page.goto(
            '/syk/sykepenger?testperson=ingen-utbetaling-arbeidsgiverperiode-og-helg&id=d9732ef6-2652-4f4e-b31f-d711e4b672f6',
        )

        await harSynligTekst(page, 'Søknaden er behandlet')
        await harSynligTittel(page, 'Ingen utbetaling fra Nav', 2)
        await harSynligTekst(page, 'Derfor utbetaler ikke Nav sykepenger for denne perioden')
        await harSynligTekst(
            page,
            'Arbeidsgiverperioden er de første 16 dagene av et sykefravær. ' +
                'I denne perioden er det Klonelabben som er ansvarlig for å utbetale sykepengene dine. ' +
                'Søknaden din inneholder også dager i helgen. Nav utbetaler ikke sykepenger for lørdager og søndager.',
        )
    })
})
