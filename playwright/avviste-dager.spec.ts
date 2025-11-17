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
import {
    harSynligTittel,
    trykkPaVedtakMedId,
    verifyBeregningPanel,
    verifyDagTabellRows,
    visBeregningRegion,
} from './utils/hjelpefunksjoner'

test.describe('Avviste dager', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/syk/sykepenger')
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(11)
    })

    test('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', async ({ page }) => {
        await trykkPaVedtakMedId(page, vedtakMed40Grad.id)
        await expect(page.getByRole('region', { name: 'Avviste sykepengedager' })).not.toBeVisible()
    })

    test('Vedtak med delvis godkjente utbetalingsdager', async ({ page }) => {
        await trykkPaVedtakMedId(page, alleAvvisteDager.id)

        const refusjonsPanel = page.getByTestId('utbetaling-panel-refusjon')
        await expect(refusjonsPanel.getByText('Søknaden er delvis innvilget')).toBeVisible()
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

        await expect(
            page.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()
        await expect(page.getByTestId('avvistedageroversikt')).toContainText('Dager Nav ikke utbetaler')

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        const dagTabellBody = avvisteDagerRegion.getByTestId('dag-tabell-body')

        await verifyDagTabellRows(dagTabellBody, [
            ['11.feb.', 'Fridag'],
            ['13.feb.', 'Søkt for sent'],
            ['15.feb.', 'Maks antall dager'],
            ['16.feb.', 'For lav inntekt'],
            ['17.feb.', 'Egenmelding'],
            ['18.feb.', 'For mye arbeid og/eller inntekt'],
            ['19.feb.', 'Jobbet for kort'],
            ['20.feb.', 'Ikke medlem'],
            ['21.feb.', 'Etter dødsfall'],
            ['22.feb.', 'Ukjent'],
            ['27.feb.', 'Arbeidsavklaringspenger'],
            ['28.feb.', 'Dagpenger'],
            ['01.mars', 'Foreldrepenger'],
            ['02.mars', 'Omsorgspenger'],
            ['03.mars', 'Opplæringspenger'],
            ['04.mars', 'Pleiepenger'],
            ['05.mars', 'Svangerskapspenger'],
            ['25.feb.', 'Maks antall dager'],
        ])

        await harSynligTittel(page, 'Forklaring', 4)
        await expect(
            avvisteDagerRegion.getByText('Du får ikke sykepenger for dager du har ferie eller permisjon.'),
        ).toBeVisible()
        await expect(
            avvisteDagerRegion.getByText('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet,'),
        ).toBeVisible()

        const avvisteDagerOversikt = avvisteDagerRegion.getByTestId('avvistedageroversikt')
        await expect(avvisteDagerOversikt).toContainText('Dager Nav ikke utbetaler')
        await expect(avvisteDagerOversikt).toContainText('Forklaring')

        await avvisteDagerOversikt.locator('.navds-accordion__header').click()
        await expect(avvisteDagerRegion).toContainText('22 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')

        await avvisteDagerRegion.click()
        await expect(avvisteDagerRegion.getByText('Mer om beregningen')).not.toBeVisible()
    })

    test('Vedtak med avviste dager og ingen utbetaling', async ({ page }) => {
        await trykkPaVedtakMedId(page, avvistVedtak.id)
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('4 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click()

        await expect(
            page.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()
        await expect(page.getByRole('region', { name: 'Beregning av sykepengene' })).not.toBeVisible()

        const avvisteDagerOversikt = avvisteDagerRegion.getByTestId('avvistedageroversikt')
        await avvisteDagerOversikt.click()

        const dagTabellBody = avvisteDagerRegion.getByTestId('dag-tabell-body')
        await verifyDagTabellRows(dagTabellBody, [
            ['17.aug.', 'Fridag'],
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'Etter dødsfall'],
        ])
        await expect(avvisteDagerRegion.getByText('Mer om beregningen')).not.toBeVisible()
    })

    test('Vedtak med avviste dager og lav inntekt, refusjon', async ({ page }) => {
        await trykkPaVedtakMedId(page, avvistVedtakMedLavInntekt.id)
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('5 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click()

        await expect(
            avvisteDagerRegion.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)
        await avvisteDagerRegion.getByTestId('avvistedageroversikt').click()

        const dagTabellBody = avvisteDagerRegion.getByTestId('dag-tabell-body')
        await verifyDagTabellRows(dagTabellBody, [
            ['17.aug.', 'Fridag'],
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'For lav inntekt'],
            ['21.aug.', 'Etter dødsfall'],
        ])

        const merOmBeregningen = beregningRegion.getByTestId('mer-om-beregningen')
        await verifyBeregningPanel(merOmBeregningen, true)
    })

    test('Vedtak med avviste dager og lav inntekt, direkte utbetaling', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=delvis-og-helt-avviste-vedtak')
        await trykkPaVedtakMedId(page, avvistVedtakMedLavInntektDirekteUtbetaling.id)
        await expect(page.getByText('Ingen utbetaling')).toBeVisible()

        const ingenUtbetalingPanel = page.getByTestId('utbetaling-panel-ingen')
        await expect(ingenUtbetalingPanel.getByText('Søknaden er avslått', { exact: true })).toBeVisible()
        await expect(ingenUtbetalingPanel.getByText('Søknaden er avslått fordi:')).toBeVisible()
        await expect(ingenUtbetalingPanel.getByRole('listitem').getByText('For lav inntekt')).toBeVisible()
        await expect(ingenUtbetalingPanel.getByRole('listitem').getByText('Etter dødsfall')).toBeVisible()

        const avvisteDagerRegion = page.getByRole('region', { name: 'Avviste sykepengedager' })
        await expect(avvisteDagerRegion).toContainText('4 sykepengedager')
        await expect(avvisteDagerRegion).toContainText('Utbetales ikke av Nav')
        await avvisteDagerRegion.click()

        await expect(
            avvisteDagerRegion.getByText(
                'Vi ser at du ikke har rett til sykepenger for én eller flere av dagene i denne sykmeldingsperioden.',
            ),
        ).toBeVisible()

        const beregningRegion = await visBeregningRegion(page)
        await avvisteDagerRegion.getByTestId('avvistedageroversikt').click()

        const dagTabellBody = avvisteDagerRegion.getByTestId('dag-tabell-body')
        await verifyDagTabellRows(dagTabellBody, [
            ['18.aug.', 'Fridag'],
            ['19.aug.', 'Fridag'],
            ['20.aug.', 'For lav inntekt'],
            ['21.aug.', 'Etter dødsfall'],
        ])

        const merOmBeregningen = beregningRegion.getByTestId('mer-om-beregningen')
        await verifyBeregningPanel(merOmBeregningen, true)
    })

    test('Vedtak med delvisInnvilget begrunnelse fra Bømlo', async ({ page }) => {
        await page.goto('/syk/sykepenger?testperson=kombinasjon-delvisInnvilgelse-og-skj%C3%B8nnsfastsatt-fra-bomlo')
        await trykkPaVedtakMedId(page, delvisInnvilgelseOgSkjønnsfastsattKombinasjonFraBomlo.id)

        const personutbetalingPanel = page.getByTestId('utbetaling-panel-personutbetaling')
        await expect(personutbetalingPanel.getByText('Søknaden er delvis innvilget')).not.toBeVisible()
        await expect(personutbetalingPanel.getByText('Noen av dagene er ikke innvilget fordi:')).not.toBeVisible()
        await expect(personutbetalingPanel.getByText('For mye arbeid og/eller inntekt')).not.toBeVisible()

        const refusjonPanel = page.getByTestId('utbetaling-panel-refusjon')
        await expect(refusjonPanel.getByText('Søknaden er delvis innvilget')).toBeVisible()
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
        await trykkPaVedtakMedId(page, avslåttFraBømlo.id)

        const ingenUtbetalingPanel = page.getByTestId('utbetaling-panel-ingen')
        await expect(ingenUtbetalingPanel.getByText('Søknaden er avslått', { exact: true })).toBeVisible()
        await expect(ingenUtbetalingPanel.getByText('Søknaden er avslått fordi:')).toBeVisible()
        await expect(
            ingenUtbetalingPanel.getByRole('listitem').getByText('For mye arbeid og/eller inntekt'),
        ).toBeVisible()
        await ingenUtbetalingPanel.getByRole('button', { name: 'Se nærmere begrunnelse her' }).click()

        const begrunnelseForAvslag = page.getByRole('button', { name: 'Begrunnelse for avslått søknad' })
        await expect(begrunnelseForAvslag).toBeVisible()
        const begrunnelseDiv = page
            .locator('div')
            .filter({
                hasText: 'For å ha rett til sykepenger må arbeidsevnen din ha blitt redusert med minst 20 %.',
            })
            .first()

        const texts = [
            'For å ha rett til sykepenger må arbeidsevnen din ha blitt redusert med minst 20 %.',
            'På sykmeldingstidspunktet hadde du følgende inntektskilder:',
            'Unibuss as: 14,35 timer per uke = 2,87 timer per dag.',
            'Oslo Taxibuss: 37,5 timer per uke = 7,5 timer per dag.',
            'Total arbeidstid: 54,85 timer per uke = 10,37 timer per dag.',
            'Opplysningene er hentet fra Aa-registeret.',
            'Perioden 09.04.24 - 29.04.24 er 15 virkedager. Total arbeidstid i perioden er 155,55 timer',
            '15 x 10,37 = 155,55 timer.',
            'Arbeidstid hos Unibuss er 43,05 timer',
            '15 x 2,87 = 43,05',
            'I perioden 09.04.24 - 29.04.24 er du bare 50 % sykmeldt fra Unibuss. Dette utgjør 21,53 timer.',
            '50 % / 100 x 43,05 = 21,53 timer sykmeldt.',
            'Du er 13,84 % sykmeldt av den totale arbeidstiden din.',
            '21,53 / 155,55 x 100 = 13,84 %.',
            'Arbeidsevnen din er dermed ikke nedsatt med minst 20 %.',
            'Din søknad om sykepenger i perioden 09.04.24 - 29.04.24 er derfor avslått.',
        ]
        for (const t of texts) {
            await expect(begrunnelseDiv).toContainText(t)
        }
    })
})
