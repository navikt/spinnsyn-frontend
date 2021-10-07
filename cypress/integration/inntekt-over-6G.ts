import { over6GVedtak } from '../../src/data/mock/data/rs-vedtak'

describe('Tester 6G', () => {

    const vedtak = over6GVedtak

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('17 192 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.contains('Slik beregner vi hva du får').click({ force: true })

        cy.get('.inntekt__info')
            .should('contain', 'Beregnet månedslønn').and('contain', '74\u00a0976 kr')
            .should('contain', 'Omregnet til årslønn').and('contain', '899\u00a0712 kr')
            .should('contain', 'Redusert til 6G').and('contain', '638\u00a0394 kr')
            .should('contain', 'Dagsats').and('contain', '2\u00a0455 kr')
    })
})
