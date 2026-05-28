import { test as base, expect } from '@playwright/test'

import { kunDirekte } from '../src/data/testdata/data/vedtak/kunDirekte'

const timezones = ['Europe/Oslo', 'America/New_York', 'UTC']

for (const timezoneId of timezones) {
    base.describe(`Datovisning i tidssone ${timezoneId}`, () => {
        base(`viser korrekte datoer på vedtakssiden`, async ({ browser }) => {
            const context = await browser.newContext({ timezoneId })
            const page = await context.newPage()

            await page.goto(`/syk/sykepenger?testperson=kun-direkte`)
            await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(1)

            const vedtakLink = page.locator(`a[href*="${kunDirekte.id}"]`).first()
            await expect(vedtakLink).toBeVisible()
            await vedtakLink.click()

            // Verifiser perioden (fom: '2021-02-08', tom: '2021-02-21')
            // Bruker tilLesbarPeriodeMedArstall som var sårbar for tidssone-bug
            await expect(page.getByText('8. – 21. februar 2021')).toBeVisible()

            // Verifiser "per {dato}" i sykepengedager-panelet
            // Bruker tilLesbarDatoMedArstall direkte med dato-streng tom='2021-02-21'
            await page.getByText('Gjenstående sykepengedager').click({ force: true })
            await expect(page.getByText('per 21. februar 2021')).toBeVisible()

            // Verifiser behandlingsdato (vedtakFattetTidspunkt: '2021-02-21')
            // Bruker tilLesbarDatoMedArstall via dayjs().toDate()
            await expect(page.getByText('Søknaden ble behandlet 21. februar 2021')).toBeVisible()

            await context.close()
        })
    })
}
