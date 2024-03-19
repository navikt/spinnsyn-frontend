import { kunDirekte } from '../../../src/data/testdata/data/vedtak/rs-vedtak'

describe('Personutbetaling uten kontonummer', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om at kontonummer mangler', () => {
        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('24 550 kroner')
        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('sykepenger til deg')
        cy.get('[data-cy*="personutbetaling"]').contains('Kontonummer for utbetaling')
        cy.get('[data-cy*="personutbetaling"]').contains(
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
        )

        cy.contains('Pengene utbetales til deg')
    })
})
