import { formaterValuta } from '../src/utils/valuta-utils'

import { expect, test } from './fixtures'
import {
    harSynligTittel,
    verifyBeregningPanel,
    verifyDagTabellRows,
    visBeregningRegion,
} from './utils/hjelpefunksjoner'

const baseUrl = '/syk/sykepenger/vedtak/arkivering/utvikling-arkivering'

test.describe('Vedtak for arkivering', () => {
    test.afterEach(({ uuOptions }) => {
        uuOptions.disableRules = ['landmark-one-main', 'page-has-heading-one', 'region']
    })

    test('Vanlig vedtak med refusjon der alt er ekspandert', async ({ page }) => {
        await test.step('Gå til baseUrl og sjekk innledende elementer', async () => {
            await page.goto(baseUrl)
            await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
            await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)
        })

        await test.step('Verifiser utbetaling panel', async () => {
            const utbetalingPanel = page.getByTestId('utbetaling-panel-refusjon')
            await expect(utbetalingPanel.getByText('Søknaden er delvis innvilget')).toBeVisible()
            await expect(utbetalingPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()
            await expect(utbetalingPanel.getByRole('listitem').getByText(/Jobbet eller tjent for mye/)).toBeVisible()
            await expect(utbetalingPanel.getByRole('link', { name: /Se nærmere begrunnelse her/ })).toBeVisible()
        })

        await test.step('Verifiser beregning region og dagtabell', async () => {
            const beregningRegion = await visBeregningRegion(page)
            const dager = beregningRegion.getByTestId('dag-tabell-body')
            await verifyDagTabellRows(dager, [
                ['01. feb.', '100 % syk', formaterValuta(1_000)],
                ['06. feb.', 'Helg', '-'],
            ])
        })

        await test.step('Verifiser mer om beregningen panel', async () => {
            const beregningRegion = await visBeregningRegion(page)
            const merOmBeregningen = beregningRegion.getByTestId('mer-om-beregningen')
            await verifyBeregningPanel(merOmBeregningen, false)
        })

        await test.step('Verifiser antall sykepengedager som gjenstår', async () => {
            const gjenstar = page.getByRole('region', { name: 'Gjenstående sykepengedager' })
            await expect(
                gjenstar.getByText(
                    'Du kan vanligvis få sykepenger i opptil 248 dager. Hvis du bruker opp de 248 dagene, må det gå 26 uker før du kan ha rett til sykepenger igjen.',
                ),
            ).toBeVisible()
        })
    })

    test('Skjønnsfastsatt brukerutbetaling der alt er ekspandert', async ({ page }) => {
        await test.step('Gå til baseUrl med testperson og sjekk innledende elementer', async () => {
            await page.goto(`${baseUrl}?testperson=skjonnsfastsatt-brukerutbetaling`)
            await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
            await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)
        })

        await test.step('Verifiser utbetaling panel for personutbetaling', async () => {
            const panel = page.getByTestId('utbetaling-panel-personutbetaling')
            await expect(panel.getByRole('button', { name: /Når får du sykepengene/ })).toBeVisible()
            await expect(panel.getByRole('link', { name: /Les mer om når du kan forvente å få pengene/ })).toBeVisible()
        })

        await test.step('Verifiser beregning region og innhold', async () => {
            const beregningRegion = await visBeregningRegion(page)
            await expect(
                beregningRegion.getByRole('button', { name: /Begrunnelse for skjønnsfastsetting/ }),
            ).toBeVisible()
            await harSynligTittel(page, 'Konklusjon', 3)
            await expect(beregningRegion).toContainText(
                'Dette er konklusjonen fra speil. 200 000kr er et skjønnsfastsatt beløp.',
            )
        })

        await test.step('Verifiser dagtabell', async () => {
            const beregningRegion = await visBeregningRegion(page)
            const dager = beregningRegion.getByTestId('dag-tabell-body')
            await verifyDagTabellRows(dager, [
                ['08. feb.', '100 % syk', formaterValuta(2_455)],
                ['13. feb.', 'Helg', '-'],
            ])
        })

        await test.step('Verifiser mer om beregningen panel', async () => {
            const beregningRegion = await visBeregningRegion(page)
            const merOmBeregningen = beregningRegion.getByTestId('mer-om-beregningen')
            await verifyBeregningPanel(merOmBeregningen, false)
        })

        await test.step('Verifiser antall sykepengedager som gjenstår', async () => {
            const gjenstar = page.getByRole('region', { name: 'Gjenstående sykepengedager' })
            await expect(
                gjenstar.getByText(
                    'Du kan vanligvis få sykepenger i opptil 248 dager. Hvis du bruker opp de 248 dagene, må det gå 26 uker før du kan ha rett til sykepenger igjen.',
                ),
            ).toBeVisible()
        })
    })

    test('Delvis innvilgelse fra bømlo der alt er ekspandert', async ({ page }) => {
        await test.step('Gå til baseUrl med testperson og sjekk innledende elementer', async () => {
            await page.goto(`${baseUrl}?testperson=kombinasjon-delvisInnvilgelse-og-skjønnsfastsatt-fra-bomlo`)
            await expect(page.getByText('Du kan lese mer om hvordan sykepengene beregnes i')).toBeVisible()
            await expect(page.locator('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)')).toHaveCount(0)
        })

        await test.step('Verifiser refusjon panel', async () => {
            const refusjonPanel = page.getByTestId('utbetaling-panel-refusjon')
            await expect(refusjonPanel.getByText('Søknaden er delvis innvilget')).toBeVisible()
            await expect(refusjonPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()
            await expect(refusjonPanel.getByRole('listitem').getByText(/Jobbet eller tjent for mye/)).toBeVisible()
            await refusjonPanel.getByRole('link', { name: /Se nærmere begrunnelse her/ }).click()
        })

        await test.step('Verifiser personutbetaling panel', async () => {
            const personPanel = page.getByTestId('utbetaling-panel-personutbetaling')
            await expect(personPanel.getByRole('button', { name: /Når får du sykepengene/ })).toBeVisible()
            await expect(
                personPanel.getByRole('link', { name: /Les mer om når du kan forvente å få pengene/ }),
            ).toBeVisible()
        })

        await test.step('Verifiser beregning region og innhold', async () => {
            const beregningRegion = await visBeregningRegion(page)
            await expect(
                beregningRegion.getByRole('button', { name: /Begrunnelse for skjønnsfastsetting/ }),
            ).toBeVisible()
            await expect(beregningRegion.getByText('Konklusjon')).toBeVisible()
            await expect(beregningRegion).toContainText(
                'Vi har skjønnsfastsatt årsinntekten din til 504 012,00 kroner.',
            )
        })

        await test.step('Verifiser begrunnelse for delvis innvilget', async () => {
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
        })

        await test.step('Verifiser sykepenger til arbeidsgiver', async () => {
            const sykepengerTilArbeidsgiverKnapp = page.getByRole('button', {
                name: 'Sykepenger per dag til arbeidsgiver',
            })
            await expect(sykepengerTilArbeidsgiverKnapp).toBeVisible()
            const sykepengerTilArbeidsgiver = sykepengerTilArbeidsgiverKnapp.locator('..').getByRole('table')
            await expect(sykepengerTilArbeidsgiver).toBeVisible()
            await verifyDagTabellRows(sykepengerTilArbeidsgiver, [
                ['08. feb.', 'Arbeidsgiverperiode', '-'],
                ['20. feb.', '100 % syk'],
            ])
        })

        await test.step('Verifiser sykepenger til deg', async () => {
            const sykepengerTilDegKnapp = page.getByRole('button', { name: 'Sykepenger per dag til deg' })
            await expect(sykepengerTilDegKnapp).toBeVisible()
            const sykepengerTilDeg = sykepengerTilDegKnapp.locator('..').getByRole('table')
            await expect(sykepengerTilDeg).toBeVisible()
            await verifyDagTabellRows(sykepengerTilDeg, [['23. feb.', '100 % syk']])
            const beregningRegion = await visBeregningRegion(page)
            await expect(
                beregningRegion.getByText(
                    'Du har vært sykmeldt denne dagen og kan få sykepenger for den tiden du ikke har jobbet. Hvor mye du får kommer an på om du har hatt inntekt eller jobbet mens du var syk, ' +
                        'eller om du har fått annen pengestøtte fra Nav i tillegg. Se folketrygdloven § 8-13, andre avsnitt.',
                ),
            ).toHaveCount(2)
        })

        await test.step('Verifiser mer om beregningen panel', async () => {
            const beregningRegion = await visBeregningRegion(page)
            const merOmBeregningen = beregningRegion.getByTestId('mer-om-beregningen')
            await verifyBeregningPanel(merOmBeregningen, false)
        })

        await test.step('Verifiser antall sykepengedager som gjenstår', async () => {
            const gjenstar = page.getByRole('region', { name: 'Gjenstående sykepengedager' })
            await expect(
                gjenstar.getByText(
                    'Du kan vanligvis få sykepenger i opptil 248 dager. Hvis du bruker opp de 248 dagene, må det gå 26 uker før du kan ha rett til sykepenger igjen.',
                ),
            ).toBeVisible()
        })
    })

    test('Revurdering viser alert med sammeligning av vedtak', async ({ page }) => {
        await page.goto(`${baseUrl}?testperson=revurdert-og-annullert`)

        await expect(page.getByText('Endringer i svar på søknaden')).toBeVisible()
        await page.getByRole('button', { name: 'Hvorfor søknaden blir vurdert' }).click()
        await expect(
            page.getByText('Når vi får nye opplysninger om saken din, kan det påvirke sykepengene dine.'),
        ).toBeVisible()
    })
})
