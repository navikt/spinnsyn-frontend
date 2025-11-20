import { vedtakMed40Grad } from '../src/data/testdata/data/vedtak/gradert40'
import { alleAvvisteDager } from '../src/data/testdata/data/vedtak/alleAvvisteDager'
import { formaterValuta } from '../src/utils/valuta-utils'

import { expect, test } from './fixtures'
import { harSynligTittel, trykkPaVedtakMedId, verifyDagTabellRows, visBeregningRegion } from './utils/hjelpefunksjoner'

const EXPECTED_NUMBER_OF_SYKMELDT_LINKS = 11

test.describe('Utbetalingsoversikt', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(EXPECTED_NUMBER_OF_SYKMELDT_LINKS)
    })

    test('Utbetalingsoversikt', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)
        await harSynligTittel(page, '8 960 kr Utbetales til Pengeløs Sparebank', 2)

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        const dagTabell = page.getByTestId('dag-tabell-body').first()
        await verifyDagTabellRows(dagTabell, [
            ['08.feb.', '40 % syk', formaterValuta(896)],
            ['21.feb.', 'Helg', '-'],
        ])
    })

    test('Mer om beregningen har riktig sykepengegrunnlag', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)
        await visBeregningRegion(page)
        await page.getByRole('button', { name: 'Mer om beregningen' }).click()
        await expect(page.getByRole('region', { name: 'Sykepengegrunnlag' })).toContainText(formaterValuta(582_161))
        await expect(page.getByRole('heading', { name: 'Flere arbeidsforhold' })).toBeHidden()
        await expect(
            page.getByText(/Har du flere arbeidsforhold, og du til sammen tjener mer enn 6 G/),
        ).not.toBeVisible()
    })

    test('Forklaring', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        const forklaring = beregningRegion.getByTestId('dagtabell-forklaring')
        await expect(forklaring.locator('.navds-tag').nth(0)).toHaveText('Syk')
        await expect(forklaring.locator('.navds-tag').nth(1)).toHaveText('Helg')
        await harSynligTittel(page, 'Forklaring', 4)

        await expect(forklaring).toContainText(
            'Du har vært sykmeldt denne dagen og kan få sykepenger for den tiden du ikke har jobbet. Hvor mye du får kommer an på om du har hatt inntekt eller jobbet mens du var syk, eller om du har fått annen pengestøtte fra Nav i tillegg. Se folketrygdloven § 8-13, andre avsnitt.',
        )
        await expect(forklaring).toContainText(
            'Du får bare sykepenger for dagene mandag til fredag. Hvis du jobber i helgen, blir disse dagene likevel tatt med i beregningen, men utbetalingen blir fordelt på ukedagene. Du får ikke sykepenger hvis du bare har vært sykmeldt lørdag og/eller søndag. Se folketrygdloven § 8-11.',
        )
    })

    test('Sjekker utbetalingsoversikt på vedtak med alle dagtyper', async ({ page }) => {
        await trykkPaVedtakMedId(page, alleAvvisteDager.id)
        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        await test.step('Sjekker dagtabell', async () => {
            const dagTabell = page.getByTestId('dag-tabell-body').first()
            await verifyDagTabellRows(dagTabell, [
                ['30.jan.', 'Ikke sykmeldt', '-'],
                ['31.jan.', 'Helg', '-'],
                ['01.feb.', '100 % syk', formaterValuta(1_000)],
                ['06.feb.', 'Helg', '-'],
                ['08.feb.', '40 % syk', formaterValuta(400)],
                ['11.feb.', 'Ferie', '0 kr'],
                ['13.feb.', 'Søkt for sent', '0 kr'],
                ['14.feb.', 'Ukjent', '-'],
                ['15.feb.', 'Maks antall dager', '0 kr'],
                ['16.feb.', 'For lav inntekt', '0 kr'],
                ['17.feb.', 'Egenmelding', '0 kr'],
                ['18.feb.', 'Jobbet eller tjent for mye', '0 kr'],
                ['19.feb.', 'Jobbet for kort', '0 kr'],
                ['20.feb.', 'Ikke medlem', '0 kr'],
                ['21.feb.', 'Etter dødsfall', '0 kr'],
                ['22.feb.', 'Ukjent', '0 kr'],
                ['23.feb.', 'Over 70 år', '0 kr'],
                ['06.mar.', 'Dekkes ikke av Nav', '-'],
            ])
        })

        await test.step('Sjekker forklaring', async () => {
            const forklaring = beregningRegion.getByTestId('dagtabell-forklaring')

            const labelForklaringer = [
                {
                    key: 'ArbeidsgiverperiodeDag',
                    tekst: 'Arbeidsgiveren din betaler sykepengene de første 16 dagene du er syk.',
                },
                {
                    key: 'Arbeidsdag',
                    tekst: 'Du får ikke sykepenger for dager du ikke har brukt sykmeldingen.',
                },
                {
                    key: 'NavDagSyk',
                    tekst: 'Du har vært sykmeldt denne dagen og kan få sykepenger for den tiden du ikke har jobbet.',
                },
                {
                    key: 'NavHelgDag',
                    tekst: 'Du får bare sykepenger for dagene mandag til fredag.',
                },
                {
                    key: 'Feriedag',
                    tekst: 'Du får ikke sykepenger for dager der du eller arbeidsgiveren din har oppgitt at du hadde ferie.',
                },
                {
                    key: 'Permisjonsdag',
                    tekst: 'Du får ikke sykepenger for dager der du eller arbeidsgiveren din har oppgitt at du hadde permisjon.',
                },
                {
                    key: 'ForeldetDag',
                    tekst: 'Du må søke om sykepenger senest tre måneder etter den siste måneden du var syk.',
                },
                {
                    key: 'Ventetidsdag',
                    tekst: 'Du kan få sykepenger fra og med 17. dagen i sykefraværet ditt.',
                },
                {
                    key: 'UkjentDag',
                    tekst: 'Vi har ikke mottatt informasjon om denne dagen, så den regnes som arbeidsdag.',
                },
            ]

            for (const forklaring_item of labelForklaringer) {
                await expect(
                    forklaring.locator(`[data-testid="dag-beskrivelse-${forklaring_item.key}"]`),
                ).toContainText(forklaring_item.tekst)
            }

            const avvistForklaringer = [
                {
                    key: 'Over70',
                    tekst: 'Etter at du har fylt 70 år, får du ikke sykepenger fra Nav.',
                },
                {
                    key: 'SykepengedagerOppbrukt',
                    tekst: 'Du kan få sykepenger i opptil 248 ukedager.',
                },
                {
                    key: 'MinimumInntekt',
                    tekst: 'Du må ha et sykepengegrunnlag på minst 50 % av grunnbeløpet (G) for å få sykepenger.',
                },
                {
                    key: 'EgenmeldingUtenforArbeidsgiverperiode',
                    tekst: 'Du kan ikke få sykepenger ved å bruke egenmelding denne dagen.',
                },
                {
                    key: 'MinimumSykdomsgrad',
                    tekst: 'Du må ha tapt minst 20 % av arbeidstiden og/eller inntekten din mens du var syk for å få sykepenger.',
                },
                {
                    key: 'ManglerOpptjening',
                    tekst: 'Du må ha vært i arbeid i minst fire uker (28 dager) fra og med dagen før du ble sykmeldt.',
                },
                {
                    key: 'ManglerMedlemskap',
                    tekst: 'Du må være medlem i folketrygden for å få sykepenger.',
                },
                {
                    key: 'EtterDødsdato',
                    tekst: 'Nav betaler ikke sykepenger for tiden etter dødsfall.',
                },
            ]

            for (const forklaring_item of avvistForklaringer) {
                await expect(
                    forklaring.locator(`[data-testid="dag-beskrivelse-${forklaring_item.key}"]`),
                ).toContainText(forklaring_item.tekst)
            }
        })
    })
})
