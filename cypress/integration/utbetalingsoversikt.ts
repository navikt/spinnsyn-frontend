import { vedtakMed100Grad } from '../../src/data/mock/data/rs-vedtak';

describe('Tester visning av utbetalingsoversikt', () => {

    const vedtak = vedtakMed100Grad

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('8 960 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.contains('Daglig utbetalingsoversikt')
            .click({ force: true })

        cy.contains('24.01.21').first().parent().should('contain', 'Arbeidsdag')
        cy.contains('25.01.21').first().parent().should('contain', 'Arbeidsgiver betaler')
        cy.contains('08.02.21').first().parent().should('contain', 'Delvis syk').and('contain', '896')
        cy.contains('20.02.21').first().parent().should('contain', 'Helg')
    })

    it('Mer om dagtyper', () => {
        cy.get('.tekstinfo .etikett').should('have.text', 'Arbeidsgiver betaler' + 'Arbeidsdag' + 'Delvis syk' + 'Helg')
    })
})
