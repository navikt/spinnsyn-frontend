import { expect, test } from '../fixtures'
import { verifyDagTabellRows, visBeregningRegion } from '../utils/hjelpefunksjoner'

test.describe('Selvstendig næringsdrivende - beskjed til Nav ikke registrert', () => {
    test('Viser avviste dager med riktig etikett og beskrivelsestekst', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=avslaatt-melding-til-nav&id=a1b2c3d4-e5f6-7890-abcd-ef1234567890')

        const beregningRegion = await visBeregningRegion(page)
        await beregningRegion.getByRole('button', { name: 'Dine sykepenger per dag' }).click()

        await verifyDagTabellRows(beregningRegion.getByTestId('dag-tabell-body'), [
            ['09. sep.', 'Beskjed til Nav ikke registrert', '0 kr'],
            ['10. sep.', 'Beskjed til Nav ikke registrert', '0 kr'],
            ['11. sep.', 'Beskjed til Nav ikke registrert', '0 kr'],
        ])

        await expect(
            beregningRegion.getByText('Du oppga i søknaden at du ga Nav beskjed om at du var syk denne dagen.', {
                exact: false,
            }),
        ).toBeVisible()

        await expect(beregningRegion.getByRole('link', { name: 'folketrygdloven § 8-34' })).toBeVisible()

        await expect(
            beregningRegion.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()
    })
})
