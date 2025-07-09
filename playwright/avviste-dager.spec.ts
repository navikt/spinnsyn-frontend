import { alleAvvisteDager } from '../src/data/testdata/data/vedtak/alleAvvisteDager'
import {
    avslåttFraBømlo,
    delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo,
} from '../src/data/testdata/data/vedtak/delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo'
import { vedtakMed40Grad } from '../src/data/testdata/data/vedtak/gradert40'
import { avvistVedtak } from '../src/data/testdata/data/vedtak/avvistVedtak'
import { avvistVedtakMedLavInntekt } from '../src/data/testdata/data/vedtak/avvistMedLavInntekt'
import { avvistVedtakMedLavInntektDirekteUtbetaling } from '../src/data/testdata/data/vedtak/avvistVedtakMedLavInntektDirekteUtbetaling'

import { test, expect } from './fixtures'

test.describe('Avviste dager', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepenger')
        // Making the link count assertion more specific by targeting a common element
        // or assuming the test data ensures a consistent number. If the number can vary,
        // consider a more dynamic check or a specific element for count.
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
    })

    test('Laster startside', async ({ page }) => {
        await expect(page).toHaveURL('/syk/sykepenger')
    })

    test('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', async ({ page }) => {
        await page.locator(`a[href*="${vedtakMed40Grad.id}"]`).click({ force: true })
        await expect(page.getByRole('region', { name: 'Avviste sykepengedager' })).not.toBeVisible()
    })

    test('Vedtak med delvis godkjente utbetalingsdager', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await page.locator(`a[href*="${alleAvvisteDager.id}"]`).click({ force: true })

        // --- Section 1: Verifying initial panel content ---
        const refusjonsPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(refusjonsPanel.getByText('Delvis innvilget søknad')).toBeVisible()
        await expect(refusjonsPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()

        const reasons = [
            'Maks antall dager',
            'For lav inntekt',
            'Egenmelding',
            'For mye arbeid og/eller inntekt',
            'Jobbet for kort',
            'Ikke medlem',
            'Etter dødsfall',
            'Ukjent',
            'Over 70 år',
            'Arbeidsavklaringspenger',
            'Dagpenger',
            'Foreldrepenger',
            'Omsorgspenger',
            'Opplæringspenger',
            'Pleiepenger',
            'Svangerskapspenger',
        ]
        for (const reason of reasons) {
            await expect(refusjonsPanel.getByRole('listitem').getByText(reason)).toBeVisible()
        }
        await refusjonsPanel.getByRole('button', { name: 'Se nærmere begrunnelse her' }).click()

        // --- Section 2: Verifying content after clicking "Se nærmere begrunnelse her" ---
        await expect(
            page.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()
        await expect(page.locator('[data-cy="avvistedageroversikt"]')).toContainText('Dager Nav ikke utbetaler')

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        const dagTabellBody = avvisteDagerRegion.locator('[data-cy="dag-tabell-body"]')

        // --- Section 3: Verifying specific days and their reasons in the table ---
        const specificDayChecks = [
            { date: '11.feb.', reason: 'Fridag' },
            { date: '13.feb.', reason: 'Søkt for sent' },
            { date: '15.feb.', reason: 'Maks antall dager' },
            { date: '16.feb.', reason: 'For lav inntekt' },
            { date: '17.feb.', reason: 'Egenmelding' },
            { date: '18.feb.', reason: 'For mye arbeid og/eller inntekt' },
            { date: '19.feb.', reason: 'Jobbet for kort' },
            { date: '20.feb.', reason: 'Ikke medlem' },
            { date: '21.feb.', reason: 'Etter dødsfall' },
            { date: '22.feb.', reason: 'Ukjent' },
            { date: '27.feb.', reason: 'Arbeidsavklaringspenger' },
            { date: '28.feb.', reason: 'Dagpenger' },
            { date: '01.mars', reason: 'Foreldrepenger' },
            { date: '02.mars', reason: 'Omsorgspenger' },
            { date: '03.mars', reason: 'Opplæringspenger' },
            { date: '04.mars', reason: 'Pleiepenger' },
            { date: '05.mars', reason: 'Svangerskapspenger' },
            // Adding the second instance of 'Maks antall dager' with its date
            { date: '25.feb.', reason: 'Maks antall dager' },
        ]

        for (const { date, reason } of specificDayChecks) {
            // Asserting the specific row containing both date and reason is more robust.
            await expect(dagTabellBody.getByRole('row', { name: `${date} - ${reason}` })).toBeVisible()
        }

        // --- Section 4: Verifying explanation section ---
        // Scoping the getByRole to avvisteDagerRegion for specificity.
        await expect(avvisteDagerRegion.getByRole('heading', { name: 'Forklaring' })).toBeVisible()
        // Scoping getByText to avvisteDagerRegion to avoid ambiguity.
        await expect(
            avvisteDagerRegion.getByText('Du får ikke sykepenger for dager du har ferie eller permisjon.'),
        ).toBeVisible()
        await expect(
            avvisteDagerRegion.getByText('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet,'),
        ).toBeVisible()

        // --- Section 5: Accordion open/close functionality ---
        const avvisteDagerOversikt = avvisteDagerRegion.locator('[data-cy="avvistedageroversikt"]')
        await expect(avvisteDagerOversikt).toContainText('Dager Nav ikke utbetaler')
        await expect(avvisteDagerOversikt).toContainText('Forklaring')

        await avvisteDagerOversikt.locator('.navds-accordion__header').click()
        await expect(avvisteDagerRegion).toContainText('22 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')

        // Closing the accordion by clicking the region again.
        await avvisteDagerRegion.click()
        await expect(avvisteDagerRegion.getByText('Mer om beregningen')).not.toBeVisible()
    })

    test('Vedtak med avviste dager og ingen utbetaling', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await page.locator(`a[href*="${avvistVedtak.id}"]`).click({ force: true })
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('4 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click() // Expand the accordion

        await expect(
            page.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()
        // Scoping the assertion to the parent element is good practice.
        await expect(page.getByRole('region', { name: 'Beregning av sykepengene' })).not.toBeVisible()

        // Assuming 'avvistedageroversikt' is within the 'Avviste sykepengedager' region.
        const avvisteDagerOversikt = avvisteDagerRegion.locator('[data-cy="avvistedageroversikt"]')
        await avvisteDagerOversikt.click() // Open the detailed view

        const dagTabellBody = avvisteDagerRegion.locator('[data-cy="dag-tabell-body"]')
        for (const [dag, reason] of [
            ['17.aug.', 'Fridag'],
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'Etter dødsfall'],
        ]) {
            // Using getByRole('row') for robustness in table checks.
            await expect(dagTabellBody.getByRole('row', { name: `${dag} - ${reason}` })).toBeVisible()
        }
        // Scoping this text check to the region if it can appear elsewhere.
        await expect(avvisteDagerRegion.getByText('Mer om beregningen')).not.toBeVisible()
    })

    test('Vedtak med avviste dager og lav inntekt, refusjon', async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await page.locator(`a[href*="${avvistVedtakMedLavInntekt.id}"]`).click({ force: true })
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('5 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click() // Expand accordion

        // Scoping the text assertion.
        await expect(
            avvisteDagerRegion.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()

        const beregningsRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningsRegion.click() // Expand accordion
        // Scoping the locator for avviste dagsoversikt to be more precise.
        await avvisteDagerRegion.locator('[data-cy="avvistedageroversikt"]').click() // Open detailed view

        const dagTabellBody = avvisteDagerRegion.locator('[data-cy="dag-tabell-body"]')
        for (const [dag, reason] of [
            ['17.aug.', 'Fridag'],
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'For lav inntekt'],
            ['21.aug.', 'Etter dødsfall'],
        ]) {
            await expect(dagTabellBody.getByRole('row', { name: `${dag} - ${reason}` })).toBeVisible()
        }

        const merOmBeregningen = beregningsRegion.locator('[data-cy="mer-om-beregningen"]')
        await merOmBeregningen.click()
        await expect(merOmBeregningen).toContainText('Månedsinntekt')
        await expect(merOmBeregningen).toContainText('Årsinntekt')
        await expect(merOmBeregningen).toContainText('Sykepengegrunnlag')
        await expect(merOmBeregningen).not.toContainText('Sykepenger per dag')
        await expect(merOmBeregningen).not.toContainText('Totalbeløp')
        await expect(merOmBeregningen).not.toContainText('Utbetalingsdager')
        await expect(merOmBeregningen).not.toContainText('Utbetaling')
    })

    test('Vedtak med avviste dager og lav inntekt, direkte utbetaling', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=delvis-og-helt-avviste-vedtak')
        await page.locator(`a[href*="${avvistVedtakMedLavInntektDirekteUtbetaling.id}"]`).click({ force: true })
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const refusjonsPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(refusjonsPanel.getByText('Avslått søknad')).toBeVisible()
        await expect(refusjonsPanel.getByText('Søknaden er avslått fordi:')).toBeVisible()
        await expect(refusjonsPanel.getByRole('listitem').getByText('For lav inntekt')).toBeVisible()
        await expect(refusjonsPanel.getByRole('listitem').getByText('Etter dødsfall')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('4 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click() // Expand accordion

        // Scoping text assertion.
        await expect(
            avvisteDagerRegion.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()

        const beregningsRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
        await beregningsRegion.click() // Expand accordion
        await avvisteDagerRegion.locator('[data-cy="avvistedageroversikt"]').click() // Open detailed view

        const dagTabellBody = avvisteDagerRegion.locator('[data-cy="dag-tabell-body"]')
        for (const [dag, reason] of [
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'For lav inntekt'],
            ['21.aug.', 'Etter dødsfall'],
        ]) {
            await expect(dagTabellBody.getByRole('row', { name: `${dag} - ${reason}` })).toBeVisible()
        }

        const merOmBeregningen = beregningsRegion.locator('[data-cy="mer-om-beregningen"]')
        await merOmBeregningen.click()
        await expect(merOmBeregningen).toContainText('Månedsinntekt')
        await expect(merOmBeregningen).toContainText('Årsinntekt')
        await expect(merOmBeregningen).toContainText('Sykepengegrunnlag')
        await expect(merOmBeregningen).not.toContainText('Sykepenger per dag')
        await expect(merOmBeregningen).not.toContainText('Totalbeløp')
        await expect(merOmBeregningen).not.toContainText('Utbetalingsdager')
        await expect(merOmBeregningen).not.toContainText('Utbetaling')
    })

    test('Vedtak med delvisInnvilget begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=kombinasjon-delvisInnvilgelse-og-skj%C3%B8nnsfastsatt-fra-bomlo')
        await page
            .locator(`a[href*="${delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo.id}"]`)
            .click({ force: true })

        const personutbetalingPanel = page.locator('[data-cy="utbetaling-panel-personutbetaling"]')
        await expect(personutbetalingPanel.getByText('Delvis innvilget søknad')).not.toBeVisible()
        await expect(personutbetalingPanel.getByText('Noen av dagene er ikke innvilget fordi:')).not.toBeVisible()
        await expect(personutbetalingPanel.getByText('For mye arbeid og/eller inntekt')).not.toBeVisible()

        const refusjonPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(refusjonPanel.getByText('Delvis innvilget søknad')).toBeVisible()
        await expect(refusjonPanel.getByText('Noen av dagene er ikke innvilget fordi:')).toBeVisible()
        await expect(refusjonPanel.getByRole('listitem').getByText('For mye arbeid og/eller inntekt')).toBeVisible()
        await refusjonPanel.getByRole('button', { name: 'Se nærmere begrunnelse her' }).click()

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

    test('Vedtak med avslag begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=avvist-fra-bomlo')
        await page.locator(`a[href*="${avslåttFraBømlo.id}"]`).click({ force: true })

        const refusjonPanel = page.locator('[data-cy="utbetaling-panel-refusjon"]')
        await expect(refusjonPanel.getByText('Avslått søknad')).toBeVisible()
        await expect(refusjonPanel.getByText('Søknaden er avslått fordi:')).toBeVisible()
        await expect(refusjonPanel.getByRole('listitem').getByText('For mye arbeid og/eller inntekt')).toBeVisible()
        await refusjonPanel.getByRole('button', { name: 'Se nærmere begrunnelse her' }).click()

        const begrunnelseForAvslag = page.getByRole('button', { name: 'Begrunnelse for avslått søknad' })
        await expect(begrunnelseForAvslag).toBeVisible()
        // Finding the specific div containing the detailed explanation.
        // Using filter and hasText is more robust than relying on parent structure.
        const begrunnelseDiv = page
            .locator('div')
            .filter({
                hasText: 'For å ha rett til sykepenger må arbeidsevnen din ha blitt redusert med minst 20 prosent.',
            })
            .first()

        await expect(begrunnelseDiv).toContainText(
            'For å ha rett til sykepenger må arbeidsevnen din ha blitt redusert med minst 20 prosent.',
        )
        await expect(begrunnelseDiv).toContainText('På sykmeldingstidspunktet hadde du følgende inntektskilder:')
        await expect(begrunnelseDiv).toContainText('Unibuss as: 14,35 timer per uke = 2,87 timer per dag.')
        await expect(begrunnelseDiv).toContainText('Oslo Taxibuss: 37,5 timer per uke = 7,5 timer per dag.')
        await expect(begrunnelseDiv).toContainText('Total arbeidstid: 54,85 timer per uke = 10,37 timer per dag.')
        await expect(begrunnelseDiv).toContainText('Opplysningene er hentet fra Aa-registeret.')
        await expect(begrunnelseDiv).toContainText(
            'Perioden 09.04.24 - 29.04.24 er 15 virkedager. Total arbeidstid i perioden er 155,55 timer',
        )
        await expect(begrunnelseDiv).toContainText('15 x 10,37 = 155,55 timer.')
        await expect(begrunnelseDiv).toContainText('Arbeidstid hos Unibuss er 43,05 timer')
        await expect(begrunnelseDiv).toContainText('15 x 2,87 = 43,05')
        await expect(begrunnelseDiv).toContainText(
            'I perioden 09.04.24 - 29.04.24 er du bare 50 prosent sykmeldt fra Unibuss. Dette utgjør 21,53 timer.',
        )
        await expect(begrunnelseDiv).toContainText('50 % / 100 x 43,05 = 21,53 timer sykmeldt.')
        await expect(begrunnelseDiv).toContainText('Du er 13,84 % sykmeldt av den totale arbeidstiden din.')
        await expect(begrunnelseDiv).toContainText('21,53 / 155,55 x 100 = 13,84 %.')
        await expect(begrunnelseDiv).toContainText('Arbeidsevnen din er dermed ikke nedsatt med minst 20 %.')
        await expect(begrunnelseDiv).toContainText(
            'Din søknad om sykepenger i perioden 09.04.24 - 29.04.24 er derfor avslått.',
        )
    })
})
