import { test, expect } from './fixtures'
import { verifyBeregningPanel, verifyDagTabellRows } from './utils/hjelpefunksjoner'

const baseUrl = 'http://localhost:3000/syk/sykepenger/vedtak/arkivering/utvikling-arkivering'

test.describe('Vedtak for arkivering', () => {
    test('Vanlig vedtak med refusjon der alt er ekspandert', async ({ page }) => {
        await page.goto(baseUrl)
        await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
        await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)

        const utbetalingPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(utbetalingPanel.getByText('Delvis innvilget søknad')).toBeVisible()
        await expect(utbetalingPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()
        await expect(utbetalingPanel.getByRole('listitem').getByText(/For mye arbeid og\/eller inntekt/)).toBeVisible()
        await expect(utbetalingPanel.getByRole('button', { name: /Se nærmere begrunnelse her/ })).toBeVisible()

        const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningRegion.click()

        const dager = beregningRegion.locator('[data-cy="dag-tabell-body"]')
        await verifyDagTabellRows(dager, [
            ['01.feb.', 'Syk', '1\u00a0000 kr'],
            ['06.feb.', 'Helg', '-'],
        ])

        const merOmBeregningen = beregningRegion.locator('[data-cy="mer-om-beregningen"]')
        await verifyBeregningPanel(merOmBeregningen, false)

        const gjenstar = page.getByRole('region', { name: 'Antall sykepengedager som gjenstår' })
        await expect(gjenstar).toContainText('Det er bare dager Nav skal utbetale som er med i tellingen over')
    })

    test('Skjønnsfastsatt brukerutbetaling der alt er ekspandert', async ({ page }) => {
        await page.goto(`${baseUrl}?testperson=skjonnsfastsatt-brukerutbetaling`)
        await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
        await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)

        const panel = page.locator('[data-cy="utbetaling-panel-personutbetaling"]')
        await expect(panel.getByRole('button', { name: /Når får du sykepengene/ })).toBeVisible()
        await expect(panel.getByRole('link', { name: /Les mer om når du kan forvente å få pengene/ })).toBeVisible()

        const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await expect(beregningRegion.getByRole('button', { name: /Begrunnelse for skjønnsfastsetting/ })).toBeVisible()
        await expect(beregningRegion.getByRole('heading', { name: 'Konklusjon' })).toBeVisible()
        await expect(beregningRegion).toContainText(
            'Dette er konklusjonen fra speil. 200 000kr er et skjønnsfastsatt beløp.',
        )

        const dager = beregningRegion.locator('[data-cy="dag-tabell-body"]')
        await verifyDagTabellRows(dager, [
            ['08.feb.', 'Syk', '2\u00a0455 kr'],
            ['13.feb.', 'Helg', '-'],
        ])

        const merOmBeregningen = beregningRegion.locator('[data-cy="mer-om-beregningen"]')
        await verifyBeregningPanel(merOmBeregningen, false)

        const gjenstar = page.getByRole('region', { name: 'Antall sykepengedager som gjenstår' })
        await expect(gjenstar).toContainText('Det er bare dager Nav skal utbetale som er med i tellingen over')
    })

    test('Delvis innvilgelse fra bømlo der alt er ekspandert', async ({ page }) => {
        await page.goto(`${baseUrl}?testperson=kombinasjon-delvisInnvilgelse-og-skj%C3%B8nnsfastsatt-fra-bomlo`)
        await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
        await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)

        const refusjonPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(refusjonPanel.getByText('Delvis innvilget søknad')).toBeVisible()
        await expect(refusjonPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()
        await expect(refusjonPanel.getByRole('listitem').getByText(/For mye arbeid og\/eller inntekt/)).toBeVisible()
        await refusjonPanel.getByRole('button', { name: /Se nærmere begrunnelse her/ }).click()

        const personPanel = page.locator('[data-cy="utbetaling-panel-personutbetaling"]')
        await expect(personPanel.getByRole('button', { name: /Når får du sykepengene/ })).toBeVisible()
        await expect(
            personPanel.getByRole('link', { name: /Les mer om når du kan forvente å få pengene/ }),
        ).toBeVisible()

        const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await expect(beregningRegion.getByRole('button', { name: /Begrunnelse for skjønnsfastsetting/ })).toBeVisible()
        await expect(beregningRegion.getByText('Konklusjon')).toBeVisible()
        await expect(beregningRegion).toContainText('Vi har skjønnsfastsatt årsinntekten din til 504 012,00 kroner.')

        const begrunnelseForDelvisInnvilget = page.getByRole('button', {
            name: 'Begrunnelse for delvis innvilget søknad',
        })
        await expect(begrunnelseForDelvisInnvilget).toBeVisible()
        const begrunnelseContainer = page
            .locator('div')
            .filter({ hasText: 'Begrunnelse for delvis innvilget søknad' })
            .first()
        await expect(begrunnelseContainer).toContainText('Delvis innvilgelse.')
        await expect(begrunnelseContainer).toContainText('Ny linje.')

        const sykepengerTilArbeidsgiverKnapp = page.getByRole('button', { name: 'Sykepenger per dag til arbeidsgiver' })
        await expect(sykepengerTilArbeidsgiverKnapp).toBeVisible()
        const sykepengerTilArbeidsgiver = sykepengerTilArbeidsgiverKnapp.locator('..').getByRole('table')
        await expect(sykepengerTilArbeidsgiver).toBeVisible()
        await verifyDagTabellRows(sykepengerTilArbeidsgiver, [
            ['08.feb.', 'Arbeidsgiveren\u00a0betaler', '-'],
            ['20.feb.', 'Syk'],
        ])

        const sykepengerTilDegKnapp = page.getByRole('button', { name: 'Sykepenger per dag til deg' })
        await expect(sykepengerTilDegKnapp).toBeVisible()
        const sykepengerTilDeg = sykepengerTilDegKnapp.locator('..').getByRole('table')
        await expect(sykepengerTilDeg).toBeVisible()
        await verifyDagTabellRows(sykepengerTilDeg, [['23.feb.', 'Syk']])
        await expect(beregningRegion).toContainText('Du har vært syk en hel dag, og du får sykepenger for denne dagen.')

        const merOmBeregningen = beregningRegion.locator('[data-cy="mer-om-beregningen"]')
        await verifyBeregningPanel(merOmBeregningen, false)

        const gjenstar = page.getByRole('region', { name: 'Antall sykepengedager som gjenstår' })
        await expect(gjenstar).toContainText('Det er bare dager Nav skal utbetale som er med i tellingen over')
    })
})
