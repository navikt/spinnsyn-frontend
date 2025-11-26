import { diverseData } from '../src/data/testdata/data/personas/personas'
import { RSVedtakWrapper } from '../src/types/rs-types/rs-vedtak-felles'

import { test, expect } from './fixtures'
import { harSynligTittel } from './utils/hjelpefunksjoner'

const lenkeTilVedtak = (hrefs: string[] | (string | null)[]) => {
    const vedtakene: RSVedtakWrapper[] = []
    hrefs.forEach((href) => {
        if (!href) return
        const id = href.split('?')[1]
        const rsVedtak = diverseData.vedtak.find((v) => v.id === id)
        if (rsVedtak) vedtakene.push(rsVedtak)
    })
    return vedtakene
}

test.describe('Sortering av vedtak', () => {
    test.beforeEach('Laster startside', async ({ page }) => {
        await page.goto('http://localhost:3000/syk/sykepenger')
        await harSynligTittel(page, 'Svar på søknader', 1)
        await expect(page.getByRole('link', { name: /Sykmeldt fra /i })).toHaveCount(12)
    })

    test('Tidligere vedtak sorteres etter tidligste tom dato', async ({ page }) => {
        const vedtakLinks = await page.getByTestId('leste-vedtak').getByRole('link').all()
        const hrefs = await Promise.all(vedtakLinks.map(async (l) => await l.getAttribute('href')))
        const vedtakene = lenkeTilVedtak(hrefs)
        let forrigeVedtak = vedtakene[0]
        vedtakene.forEach((vedtak: RSVedtakWrapper) => {
            expect(new Date(forrigeVedtak.vedtak.tom).getTime()).toBeGreaterThanOrEqual(
                new Date(vedtak.vedtak.tom).getTime(),
            )
            forrigeVedtak = vedtak
        })
    })
})
