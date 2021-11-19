import { vedtakMedDetMeste } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av et vedtak redusert til 6G', () => {

    const vedtak = vedtakMedDetMeste

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('3 021 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.contains('Slik beregner vi sykepengene')
            .click({ force: true })

        cy.get('.inntekt__info > :nth-child(1)').contains('Beregnet månedslønn')
        cy.get('.inntekt__info > :nth-child(1)').contains('74 675 kr')

        cy.get('.inntekt__info > :nth-child(2)').contains('Omregnet til årslønn')
        cy.get('.inntekt__info > :nth-child(2)').contains('896 100 kr')

        cy.get('.inntekt__info > :nth-child(3)').contains('Andre arbeidsgivere')
        cy.get('.inntekt__info > :nth-child(3)').contains('Organisasjonsnummer: 123456789')
        cy.get('.inntekt__info > :nth-child(3)').contains('195 781 kr')

        cy.get('.inntekt__info > :nth-child(4)').contains('Samlet årslønn')
        cy.get('.inntekt__info > :nth-child(4)').contains('1 091 881 kr')

        // Sjekker om sykepengegrunnlaget er redusert
        cy.get('.inntekt__info > :nth-child(5)').contains('Sykepengegrunnlag')
        cy.get('.inntekt__info > :nth-child(5)').contains('redusert til 6G')
        cy.get('.inntekt__info > :nth-child(5)').contains('638 394 kr')

    })
})
