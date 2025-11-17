import { vedtakAnnullert } from '../src/data/testdata/data/vedtak/annullert'
import { vedtakRevurdert } from '../src/data/testdata/data/vedtak/revurdert'
import { vedtakRevurdertDirekte } from '../src/data/testdata/data/vedtak/revurdertDirekte'
import { kombinertDirekteOgRefusjon } from '../src/data/testdata/data/vedtak/kombinert'
import { vedtakMedFlereArbeidsgivere } from '../src/data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { vedtakMedDetMeste } from '../src/data/testdata/data/vedtak/medDetMeste'

import { test, expect } from './fixtures'

test.describe('Tester logikk i behandling.tsx', () => {
    test('Automatisk behandlet', async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?id=${vedtakMedDetMeste.id}`)
        await expect(page.getByTestId('behandling-header')).toHaveText('Søknaden ble behandlet automatisk')
        await expect(page.getByTestId('behandling-body')).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 23. oktober 2021.',
        )
        await expect(page.getByTestId('ugyldig')).toHaveCount(0)
    })

    test('Varianter av opplysningene', async ({ page }) => {
        await page.goto(
            `http://localhost:3000/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere&id=${vedtakMedFlereArbeidsgivere.id}`,
        )
        await expect(page.getByTestId('behandling-header')).toHaveText('Søknaden ble behandlet manuelt')
        await expect(page.getByTestId('behandling-body')).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 21. mars 2022.',
        )
        await expect(page.getByTestId('ugyldig')).toHaveCount(0)
    })

    test('Automatisk behandlet annullert vedtak', async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?id=${vedtakAnnullert.id}`)
        const alert = page.locator('.navds-alert')
        await expect(alert).toContainText('Til din informasjon')
        await expect(alert).toContainText(
            'Av tekniske årsaker er saken din flyttet til et annet saksbehandlingssystem.',
        )
        await expect(alert).toContainText('Dersom det er endringer i tidligere vedtak, får du et eget vedtak om dette.')
        await expect(alert).not.toContainText('Du finner det nye vedtaket i listen over svar på søknader')
        await expect(page.getByTestId('behandling-header')).toHaveText('Søknaden ble behandlet automatisk')
        await expect(page.getByTestId('behandling-body')).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 4. mai 2021.',
        )
        await expect(page.getByRole('region', { name: 'Gjenstående sykepengedager' }).first()).toHaveCSS(
            'background-color',
            'rgb(236, 238, 240)',
        )
    })

    test('Manuelt behandlet revurdert vedtak', async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?id=${vedtakRevurdert.id}`)
        const alert = page.locator('.navds-alert')
        await expect(alert).toContainText('Denne beslutningen er behandlet på nytt.')
        await expect(alert).toContainText('Nytt svar for denne perioden finner du her')
        await expect(alert).not.toContainText(
            'Dersom det er endringer i tidligere vedtak, får du et eget vedtak om dette.',
        )
        await expect(page.getByTestId('behandling-header')).toHaveText('Søknaden ble behandlet manuelt')
        await expect(page.getByTestId('behandling-body')).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 6. mai 2021.',
        )
        await expect(page.getByRole('region', { name: 'Gjenstående sykepengedager' }).first()).toHaveCSS(
            'background-color',
            'rgb(236, 238, 240)',
        )
    })

    test('Revurdert vedtak med direkte utbetaling', async ({ page }) => {
        await page.goto(`http://localhost:3000/syk/sykepenger?id=${vedtakRevurdertDirekte.id}`)
        await page.getByText('Dette lurer mange på når vedtaket behandles på nytt').click()
        await expect(page.locator('.navds-body-long.navds-body-long.navds-typo--spacing').nth(1)).toContainText(
            'Du får sykepenger direkte fra Nav. Den nye behandlingen kan påvirke hva Nav utbetaler til deg.',
        )
    })

    test('Revurdert vedtak med kombinasjonsutbetaling', async ({ page }) => {
        await page.goto(
            `http://localhost:3000/syk/sykepenger?testperson=kombinert-revurdert&id=${kombinertDirekteOgRefusjon.id}`,
        )
        await page.getByText('Dette lurer mange på når vedtaket behandles på nytt').click()
        await expect(page.locator('.navds-body-long.navds-body-long.navds-typo--spacing').nth(1)).toContainText(
            'Du får sykepenger både fra arbeidsgiveren din og direkte fra Nav. Den nye behandlingen kan påvirke hva Nav betaler både til deg og til arbeidsgiveren din.',
        )
    })

    test('Revurdert vedtak får infoboks', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger?testperson=kombinasjon')
        await page.getByText('Ny beslutning').click()
        await expect(page.locator('.navds-alert--info')).toContainText(
            'Dette er en ny beslutning som erstatter et tidligere svar.',
        )
    })
})
