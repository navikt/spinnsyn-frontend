import { diverseData } from '../../../src/data/testdata/data/personas/personas'
import { RSVedtakWrapper } from '../../../src/types/rs-types/rs-vedtak'

const lenkeTilVedtak = (lenker: any) => {
    const vedtakene: RSVedtakWrapper[] = []
    lenker.map((idx: any) => {
        const id = lenker[idx].attributes['href'].value.split('?')[1]
        const rsVedtak = diverseData.vedtak.find((v) => v.id === id)
        if (rsVedtak) vedtakene.push(rsVedtak)
    })
    return vedtakene
}

describe('Sortering av vedtak', () => {
    it('Laster startside', function () {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.findByRole('heading', { level: 1 }).contains('Svar på søknader')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 10)
    })

    it('Tidligere vedtak sorteres etter tidligste tom dato', function () {
        cy.get('[data-cy="leste-vedtak"] a').then((articles: any) => {
            const vedtakene = lenkeTilVedtak(articles)
            let forrigeVedtak = vedtakene[0]
            vedtakene.forEach((vedtak: RSVedtakWrapper) => {
                assert.isTrue(forrigeVedtak.vedtak.tom >= vedtak.vedtak.tom)
                forrigeVedtak = vedtak
            })
        })
    })
})
