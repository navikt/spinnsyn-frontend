import { kombinertDirekteOgRefusjon } from '../src/data/testdata/data/vedtak/kombinert'

import { test, expect } from './fixtures'
import { trykkPaVedtakMedId } from './utils/hjelpefunksjoner'

const vedtak = kombinertDirekteOgRefusjon
const baseURL = 'http://localhost:3000/syk/sykepenger'

test.use({ baseURL })

test.describe('Kombinasjonutbetaling', () => {
    test.beforeEach(async ({ page }) => {
        await test.step('Gå til testpersonens side og åpne vedtak', async () => {
            await page.goto(`?testperson=kombinasjon`, { waitUntil: 'domcontentloaded' })
            await expect(page.locator('role=link[name=/Sykmeldt fra /i]')).toHaveCount(2)
            await expect(page).toHaveURL(`${baseURL}?testperson=kombinasjon`)
            await trykkPaVedtakMedId(page, vedtak.id)
        })
    })

    test('Viser info om utbetaling til personen', async ({ page }) => {
        await test.step('Sjekk hovedinfo om utbetaling til personen', async () => {
            await expect(
                page.getByText(
                    'Du får noen av sykepengene dine fra Nav og resten fra arbeidsgiveren din. Arbeidsgiveren din får igjen pengene fra Nav senere.',
                ),
            ).toBeVisible()
        })

        const personutbetalingSection = page.getByTestId('personutbetaling')

        await test.step('Sjekk detaljer om utbetaling', async () => {
            await expect(
                personutbetalingSection.getByText(
                    'Beløpet er før skatt, kreditortrekk og tilbakebetalingskrav fra kommunen.',
                ),
            ).toBeVisible()
            await expect(
                personutbetalingSection.getByText(
                    'Kreditortrekk kan være fra kemneren, Statens innkrevingssentral eller Nav innkreving. Tilbakebetalingskrav fra kommunen kan være i forbindelse med sosialhjelp.',
                ),
            ).toBeVisible()
            await expect(personutbetalingSection.getByText('Pengene utbetales til deg')).toBeVisible()
            await expect(
                personutbetalingSection.getByText(
                    'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
                ),
            ).toBeVisible()
        })

        await test.step('Sjekk "Når får du sykepengene?" utvidelse', async () => {
            await personutbetalingSection.getByRole('button', { name: 'Når får du sykepengene?' }).click()
            await expect(
                personutbetalingSection
                    .locator('.navds-read-more--open')
                    .getByText(
                        'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.',
                    ),
            ).toBeVisible()
        })

        await test.step('Sjekk headerbeløp', async () => {
            await expect(page.getByTestId('header-sykepenger-til-deg')).toContainText('24 550 kroner')
            await expect(page.getByTestId('header-sykepenger-til-deg')).toContainText('sykepenger til deg')
        })
    })

    test('Viser info om utbetaling til arbeidsgiveren', async ({ page }) => {
        await test.step('Sjekk utbetaling til arbeidsgiver', async () => {
            await expect(page.getByText('Pengene utbetales til arbeidsgiveren din')).toBeVisible()
            await expect(page.getByText('4 910 kroner').locator('..')).toContainText('Utbetales til Matbutikken AS')
        })

        const refusjonSection = page.getByTestId('refusjon')
        await test.step('Sjekk at "Når får du sykepengene?" ikke vises for arbeidsgiver', async () => {
            await expect(refusjonSection.getByText('Når får du sykepengene?')).not.toBeVisible()
        })
    })
})
