import { kunDirekte } from '../../../src/data/testdata/data/vedtak/rs-vedtak'

describe('Inline feedback', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster vedtaket', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Kan gi ja feedback', () => {
        cy.get('[data-cy="feedback-JA"]').contains('Ja').click()
        cy.get('[data-cy="feedback-JA"]').should('have.css', 'background-color', 'rgb(35, 38, 42)')
        cy.get('[data-cy="feedback-textarea"]').type('Dette er en test')

        cy.get('[data-cy="send-feedback"]').contains('Send inn svar').click()
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Kan gi nei feedback', () => {
        cy.get('[data-cy="feedback-NEI"]').contains('Nei').click()
        cy.get('[data-cy="feedback-NEI"]').should('have.css', 'background-color', 'rgb(35, 38, 42)')
        cy.get('[data-cy="feedback-textarea"]').type('Dette er en test')

        cy.get('[data-cy="send-feedback"]').contains('Send inn svar').click()
        cy.contains('Takk for tilbakemeldingen!')
    })

    it('Kan gi forbedring feedback', () => {
        cy.get('[data-cy="feedback-FORBEDRING"]').contains('Foreslå forbedring').click()
        cy.get('[data-cy="feedback-FORBEDRING"]').should('have.css', 'background-color', 'rgb(35, 38, 42)')

        cy.get('[data-cy="send-feedback"]').contains('Send inn svar').click()
        cy.contains('Tilbakemeldingen kan ikke være tom. Legg til tekst i feltet.')
        cy.get('[data-cy="feedback-textarea"]').type('Dette er en test')
        cy.get('[data-cy="send-feedback"]').contains('Send inn svar').click()

        cy.contains('Takk for tilbakemeldingen!')
    })
})
