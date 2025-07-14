import { Page } from '@playwright/test'

import { test, expect } from './fixtures'
import { tabUntilFocusedContainsText } from './utils/tastaturSnarvei'

const baseURL = 'http://localhost:3000/syk/sykepenger?testperson=kombinasjon'

test.use({ baseURL })

async function tabTilForsteSoknadIListen(page: Page, browserName: string) {
    await test.step('Åpne første søknad i listen', async () => {
        await tabUntilFocusedContainsText(browserName, page, /Svar på søknad om sykepenger/)
        await page.keyboard.press('Enter')
        await expect(page.getByRole('heading', { level: 1, name: 'Svar på søknad om sykepenger' })).toBeVisible()
    })
}

test.describe('Kombinasjonutbetaling keyboard', () => {
    test.beforeEach(async ({ page, browserName }) => {
        await page.goto('', { waitUntil: 'networkidle' })
        if (browserName == 'webkit') {
            await page.waitForTimeout(200)
            await page.locator('main').focus()
        }
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(2)
    })

    test('Finner vedtaket i listevisningen', async ({ page }) => {
        await test.step('Sjekk at riktig side og elementer vises', async () => {
            await expect(page).toHaveURL(baseURL)
            await expect(page.getByRole('heading', { level: 1, name: 'Svar på søknader' })).toBeVisible()
            await page.locator('#maincontent').focus()
            await expect(page.getByRole('heading', { level: 2, name: 'Nye svar på søknader' })).toBeVisible()
            await expect(page.getByRole('heading', { level: 2, name: 'Tidligere svar på søknader' })).toBeVisible()
        })
    })

    test('Viser info om utbetaling til personen', async ({ page, browserName }) => {
        await tabTilForsteSoknadIListen(page, browserName)
        await test.step('Tabb til Min side og "Når får du sykepengene?"', async () => {
            await expect(page.getByText('Kontonummer for utbetaling')).toBeVisible()
            await tabUntilFocusedContainsText(browserName, page, /Min side/)

            await tabUntilFocusedContainsText(browserName, page, /Når får du sykepengene\?/)
            await page.keyboard.press('Enter')

            await tabUntilFocusedContainsText(browserName, page, /Les mer om når du kan forvente/)
        })
    })

    test('Tabber gjennom beregning av sykepengene', async ({ page, browserName }) => {
        await tabTilForsteSoknadIListen(page, browserName)
        await test.step('Tabb og sjekk beregningsseksjon', async () => {
            await tabUntilFocusedContainsText(browserName, page, /Beregning av sykepengene/, { checkParent: true })
            await page.keyboard.press('Enter')
            await tabUntilFocusedContainsText(browserName, page, /Sykepenger per dag til arbeidsgiver/)
            await tabUntilFocusedContainsText(browserName, page, /Sykepenger per dag til deg/)
            await tabUntilFocusedContainsText(browserName, page, /Mer om beregningen/)
        })
    })

    test('Viser info om sykepengedager brukt', async ({ page, browserName }) => {
        await tabTilForsteSoknadIListen(page, browserName)
        await test.step('Tabb og sjekk sykepengedager', async () => {
            const sykepengedager = page.getByRole('heading', { level: 3, name: /248 sykepengedager/ })
            await expect(sykepengedager).not.toBeVisible()
            await tabUntilFocusedContainsText(browserName, page, /12 sykepengedager/, { checkParent: true })
            await page.keyboard.press('Enter')
            await expect(sykepengedager).toBeVisible()
        })
    })

    test('Annen info i bunnen av vedtaket', async ({ page, browserName }) => {
        await tabTilForsteSoknadIListen(page, browserName)
        await test.step('Tabb gjennom bunnlenker', async () => {
            await tabUntilFocusedContainsText(browserName, page, /endre svarene i søknaden/)
            await tabUntilFocusedContainsText(browserName, page, /Ta kontakt med Nav/)
            await tabUntilFocusedContainsText(browserName, page, /retten til å klage/)
            await tabUntilFocusedContainsText(browserName, page, /klageveilederen/)
        })
    })
})
