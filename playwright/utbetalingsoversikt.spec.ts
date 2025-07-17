import { vedtakMed40Grad } from '../src/data/testdata/data/vedtak/gradert40'
import { alleAvvisteDager } from '../src/data/testdata/data/vedtak/alleAvvisteDager'
import { formaterValuta } from '../src/utils/valuta-utils'

import { expect, test } from './fixtures'
import { trykkPaVedtakMedId, verifyDagTabellRows, visBeregningRegion } from './utils/hjelpefunksjoner'
import { DAGTYPE_FORKLARINGER } from './utils/dagtype-forklaringer'

const EXPECTED_NUMBER_OF_SYKMELDT_LINKS = 11

const FORKLARING_DELVIS_SYK_TEXT =
    'Du får sykepenger for den delen av arbeidstiden du ikke jobber. Vi bruker opplysningene du ga i søknaden, om hvor mye du jobbet i perioden.'
const FORKLARING_HELG_TEXT =
    'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten du har på helgedagene, fordeles på ukedagene. Hvis du derimot kun er sykmeldt en lørdag eller søndag, utbetales det ikke sykepenger. Se folketrygdloven § 8-11.'

test.describe('Utbetalingsoversikt', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(EXPECTED_NUMBER_OF_SYKMELDT_LINKS)
    })

    test('Utbetalingsoversikt', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)

        await expect(page.getByText('8 960 kroner')).toBeVisible()
        await expect(page.getByText('Utbetales til Pengeløs Sparebank')).toBeVisible()

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
        await expect(page.getByRole('heading', { name: 'Flere arbeidsforhold' })).not.toBeVisible()
        await expect(
            page.getByText(/Har du flere arbeidsforhold, og du til sammen tjener mer enn 6 G/),
        ).not.toBeVisible()
    })

    test('Forklaring', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        const forklaring = beregningRegion.getByTestId('dagtabell-forklaring')
        await expect(forklaring.locator('.navds-tag').nth(0)).toHaveText('Delvis syk')
        await expect(forklaring.locator('.navds-tag').nth(1)).toHaveText('Helg')
        await expect(forklaring.getByRole('heading', { name: 'Forklaring' })).toBeVisible()

        await expect(forklaring).toContainText(FORKLARING_DELVIS_SYK_TEXT)
        await expect(forklaring).toContainText(FORKLARING_HELG_TEXT)
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
                ['01.feb.', 'Syk', formaterValuta(1_000)],
                ['06.feb.', 'Helg', '-'],
                ['08.feb.', '40 % syk', formaterValuta(400)],
                ['11.feb.', 'Fridag', '-'],
                ['13.feb.', 'Søkt for sent', '-'],
                ['14.feb.', 'Ukjent', '-'],
                ['15.feb.', 'Maks antall dager', '-'],
                ['16.feb.', 'For lav inntekt', '-'],
                ['17.feb.', 'Egenmelding', '-'],
                ['18.feb.', 'For mye arbeid og/eller inntekt', '-'],
                ['19.feb.', 'Jobbet for kort', '-'],
                ['20.feb.', 'Ikke medlem', '-'],
                ['21.feb.', 'Etter dødsfall', '-'],
                ['22.feb.', 'Ukjent', '-'],
                ['23.feb.', 'Over 70 år', '-'],
            ])
        })

        await test.step('Sjekker forklaring', async () => {
            const forklaring = beregningRegion.getByTestId('dagtabell-forklaring')

            for (const [key, value] of Object.entries(DAGTYPE_FORKLARINGER)) {
                await expect(forklaring.locator(`[data-testid="dag-label-${key}"]`)).toHaveText(value.label)
                await expect(forklaring.locator(`[data-testid="dag-beskrivelse-${key}"]`)).toContainText(
                    value.description,
                )
            }
        })
    })
})
