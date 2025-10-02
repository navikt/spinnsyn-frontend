import { expect, test } from './fixtures'
import { harSynligTittel } from './utils/hjelpefunksjoner'

test.describe('Begrunnelse', () => {
    test('Vedtak med innvilget begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=innvilgelse&id=bcd7b2ec-fcc1-4a8b-816c-42256138d0c4',
        )

        await harSynligTittel(page, '10 449 kroner Utbetales til Sauefabrikk', 2)
        await expect(page.getByText('Noen av dagene er ikke innvilget fordi:')).toHaveCount(0)

        await page.getByRole('button', { name: 'Se nærmere begrunnelse her' }).click()

        const button = page.getByRole('button', { name: 'Begrunnelse for innvilget søknad' })
        await expect(button).toContainText('Begrunnelse for innvilget søknad')

        await expect(page.getByText('Her får du penger')).toBeVisible()
    })

    test('Vedtak med innvilget tom tekst begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto(
            'http://localhost:3000/syk/sykepenger?testperson=innvilgelse-tom-begrunnelse&id=bcd7b2ec-fcc1-4a8b-816c-42256138d088',
        )

        await expect(page.getByText('Utbetales til Sauefabrikk')).toBeVisible()
        await expect(page.getByText('Noen av dagene er ikke innvilget fordi:')).toHaveCount(0)

        await expect(page.getByRole('button', { name: 'Se nærmere begrunnelse her' })).toHaveCount(0)
    })
})
