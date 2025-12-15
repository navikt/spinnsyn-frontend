import { vedtakAnnullert } from '../src/data/testdata/data/vedtak/annullert'
import { vedtakRevurdert } from '../src/data/testdata/data/vedtak/revurdert'
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
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 21. mars 2022 av Smart, Petter og Duck, Donald.',
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
        await expect(alert).toContainText(
            'Vi har fått nye opplysninger i saken din og søknaden er vurdert på nytt. Dette svaret er erstattet av et annet og gjelder derfor ikke lenger.',
        )
        await expect(alert).toContainText(
            'Du finner nytt svar i oversikten på Ditt sykefravær. Du trenger ikke å gjøre noe. ',
        )
        await expect(page.getByTestId('behandling-header')).toHaveText('Søknaden ble behandlet manuelt')
        await expect(page.getByTestId('behandling-body')).toContainText(
            'Svaret på søknaden er basert på opplysninger fra den som sykmeldte deg, søknaden din, offentlige registre og arbeidsgiveren din. Søknaden ble behandlet 6. mai 2021 av Smart, Petter og Duck, Donald.',
        )
        await expect(page.getByRole('region', { name: 'Gjenstående sykepengedager' }).first()).toHaveCSS(
            'background-color',
            'rgb(236, 238, 240)',
        )
    })
})
