import { diverseData } from '../../src/data/mock/data/personas'
import { RSVedtakWrapper } from '../../src/types/rs-types/rs-vedtak'

const articleTilVedtak = (articles: any) => {
    const vedtakene: RSVedtakWrapper[] = []
    articles.map((idx: any) => {
        const id =
            articles[idx].attributes['aria-labelledby'].value.split(
                'soknader-header-'
            )[1]
        const rsVedtak = diverseData.vedtak.find((v) => v.id === id)
        if (rsVedtak) vedtakene.push(rsVedtak)
    })
    return vedtakene
}

describe('Tester sortering av vedtak', () => {
    it('Laster startside', function () {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get('.sidebanner__tittel')
            .should('be.visible')
            .and('have.text', 'Svar på søknader')
    })

    it('Tidligere vedtak sorteres etter tidligste tom dato', function () {
        cy.get('.vedtak--leste article').then((articles: any) => {
            const vedtakene = articleTilVedtak(articles)
            let forrigeVedtak = vedtakene[0]
            vedtakene.forEach((vedtak: RSVedtakWrapper) => {
                assert.isTrue(forrigeVedtak.vedtak.tom >= vedtak.vedtak.tom)
                forrigeVedtak = vedtak
            })
        })
    })
})
