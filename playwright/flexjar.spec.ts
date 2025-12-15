import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

import { test, expect } from './fixtures'
import { harSynligTittel, trykkPaVedtakMedId } from './utils/hjelpefunksjoner'

const baseUrl = 'http://localhost:3000/syk/sykepenger?testperson=direkte-uten-kontonummer'
const poHelseUrl =
    'http://localhost:3000/syk/sykepenger?testperson=flexjar-pohelse&flexjar-spinnsyn-pohelse-helsemetrikk=true&flexjar-spinnsyn-frontend=false&id=348a5462-456a-4bfc-9b54-11cd77a9937f'

test.describe('Flexjar', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(baseUrl)
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)
        await trykkPaVedtakMedId(page, kunDirekte.id)
        await harSynligTittel(page, 'Svar på søknad om sykepenger', 1)
    })

    test('Kan gi positiv feedback', async ({ page }) => {
        const flexjarHeading = await harSynligTittel(page, 'Vil du hjelpe oss å gjøre denne siden bedre?', 2)
        const region = page.getByRole('region').filter({ has: flexjarHeading })
        await region.getByRole('radio', { name: 'Veldig enkelt' }).check()
        await expect(region.getByRole('radio', { name: 'Veldig enkelt' })).toBeChecked()
        await region.getByRole('button', { name: 'Send tilbakemelding' }).click()
        await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible({ timeout: 10 })
    })

    test('Kan gi negativ feedback', async ({ page }) => {
        await page.reload()
        const flexjarHeading = await harSynligTittel(page, 'Vil du hjelpe oss å gjøre denne siden bedre?', 2)
        const region = page.getByRole('region').filter({ has: flexjarHeading })
        await region.getByRole('radio', { name: 'Veldig vanskelig' }).check()
        await expect(region.getByRole('radio', { name: 'Veldig vanskelig' })).toBeChecked()
        await region.getByRole('radio', { name: 'Skjønte ikke hvorfor svaret ble som det ble' }).check()
        await expect(region.getByRole('radio', { name: 'Skjønte ikke hvorfor svaret ble som det ble' })).toBeChecked()
        await region.getByRole('textbox').fill('Dette er en test')
        await region.getByRole('button', { name: 'Send tilbakemelding' }).click()
        await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible({ timeout: 10 })
    })

    test('Har flexjar når det er riktige toggles', async ({ page }) => {
        await page.goto(poHelseUrl)
        await expect(page.getByText('Hvordan opplevde du å søke og å få svar på søknaden om sykepenger?')).toBeVisible()
        const flexjarHeading = await harSynligTittel(page, 'Hva synes du?', 2)
        const region = page.getByRole('region').filter({ has: flexjarHeading })

        const braBtn = region.getByRole('button', { name: 'Bra', exact: true })
        await expect(braBtn).toHaveAttribute('aria-pressed', 'false')
        await braBtn.click()
        await expect(braBtn).toHaveAttribute('aria-pressed', 'true')
        await region.getByRole('textbox').fill('Dette er en test')
        await region.getByRole('button', { name: 'Send tilbakemelding' }).click()
        await expect(page.getByText('Takk for tilbakemeldingen!')).toBeVisible({ timeout: 10 })
    })
})
