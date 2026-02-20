import { Locator, Page } from '@playwright/test'

import { expect } from '../fixtures'

export const trykkPaVedtakMedId = async (page: Page, vedtakId: string) => {
    const vedtakLink = page.locator(`a[href*="${vedtakId}"]`).first()
    await expect(vedtakLink).toBeVisible()
    await vedtakLink.click()
}

export const beregnetManedsinntektRegion = async (page: Page, hentetFra?: string): Promise<Locator> => {
    const beregnetManedsinntekt = page
        .getByText('Beregnet månedsinntekt')
        .filter({
            has: page.getByText(`(hentet fra ${hentetFra ? hentetFra : 'inntektsmeldingen'})`),
        })
        .locator('..')
    await expect(beregnetManedsinntekt).toBeVisible()
    return beregnetManedsinntekt
}

export const verifyDagTabellRows = async (
    dagTabellBody: Locator,
    rows: Array<[string, string] | [string, string, string]>,
) => {
    for (const rowData of rows) {
        const [dag, type, belop] = rowData
        const row = dagTabellBody.getByRole('row', { name: new RegExp(dag) })
        await expect(row).toBeVisible()
        await expect(row).toContainText(type)
        if (belop !== undefined) {
            await expect(row).toContainText(belop)
        }
    }
}

export const verifyBeregningPanel = async (merOmBeregningen: Locator, avvist: boolean) => {
    await merOmBeregningen.click()
    await expect(merOmBeregningen).toContainText('Månedsinntekt')
    await expect(merOmBeregningen).toContainText('Årsinntekt')
    await expect(merOmBeregningen).toContainText('Sykepengegrunnlag')
    if (avvist) {
        await expect(merOmBeregningen).not.toContainText('Sykepenger per dag')
        await expect(merOmBeregningen).not.toContainText('Totalbeløp')
        await expect(merOmBeregningen).not.toContainText('Utbetalingsdager')
        await expect(merOmBeregningen).not.toContainText('Utbetaling')
    } else {
        await expect(merOmBeregningen).toContainText('Sykepenger per dag')
        await expect(merOmBeregningen).toContainText('Totalbeløp')
        await expect(merOmBeregningen).toContainText('Utbetalingsdager')
        await expect(merOmBeregningen).toContainText('Utbetaling')
    }
}

export const visBeregningRegion = async (page: Page) => {
    const beregningRegion = page.getByRole('region', { name: 'Beregning av sykepengene' })
    const grunnlagLabel = page.getByLabel('Sykepengegrunnlag')
    if (!(await grunnlagLabel.isVisible())) {
        await beregningRegion.click()
    }
    await expect(grunnlagLabel).toBeVisible()
    return beregningRegion
}

export async function harSynligTittel(page: Page, tittelTekst: string, level: number, exact: boolean = false) {
    const locator = page.getByRole('heading', { level, name: tittelTekst, exact: exact })
    await expect(locator).toBeVisible()
    return locator
}

export async function harSynligTekst(page: Page, tekst: string | RegExp) {
    const locator = page.getByText(tekst)
    await expect(locator).toBeVisible()
    return locator
}
