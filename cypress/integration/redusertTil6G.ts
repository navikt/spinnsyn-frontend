import { vedtakRedusertTil6G } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av et vedtak redusert til 6G', () => {

    const vedtak = vedtakRedusertTil6G

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('9 820 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.contains('Slik beregner vi sykepengene')
            .click({ force: true })

        cy.get('.inntekt__info > :nth-child(1)').contains('Beregnet månedslønn')
        cy.get('.inntekt__info > :nth-child(1)').contains('67 033 kr')

        cy.get('.inntekt__info > :nth-child(2)').contains('Omregnet til årslønn')
        cy.get('.inntekt__info > :nth-child(2)').contains('804 396 kr')

        // Sjekker om sykepengegrunnlaget er redusert
        cy.get('.inntekt__info > :nth-child(3)').contains('Redusert til 6G')
        cy.get('.inntekt__info > :nth-child(3)').contains('638 394 kr')

        cy.get('.inntekt__info > :nth-child(4)').contains('Dagsats')
        cy.get('.inntekt__info > :nth-child(4)').contains('2 455 kr')

    })
})
