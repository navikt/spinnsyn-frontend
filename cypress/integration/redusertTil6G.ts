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
            .and('contain', 'Utbetales til Posten Norge AS, Bærum')
            .click({ force: true })

        cy.contains('Slik beregner vi sykepengene')
            .click({ force: true })

        cy.get('.inntekt__info > table > tbody > tr:nth-child(1)').contains('Månedslønn')
        cy.get('.inntekt__info > table > tbody > tr:nth-child(1)').contains('74 675 kr')

        cy.get('.inntekt__info > table > tbody > tr:nth-child(2)').contains('Årslønn')
        cy.get('.inntekt__info > table > tbody > tr:nth-child(2)').contains('896 100 kr')

        cy.get('.inntekt__info .flere-arbeidsgivere > tbody > tr:nth-child(1)').contains('Årslønn fra andre arbeidsgivere')
        cy.get('.inntekt__info .flere-arbeidsgivere > tbody > tr:nth-child(2)').contains('The Ministry Of Magic AS')
        cy.get('.inntekt__info .flere-arbeidsgivere > tbody > tr:nth-child(2)').contains('195 781 kr')

        cy.get('.inntekt__info .flere-arbeidsgivere > tbody > :nth-child(3)').contains('Samlet årslønn')
        cy.get('.inntekt__info .flere-arbeidsgivere > tbody > :nth-child(3)').contains('1 091 881 kr')

        // Sjekker om sykepengegrunnlaget er redusert
        cy.contains('Redusert til 6G')
        cy.get('.inntekt__info .redusert_sykepengegrunnlag').contains('Sykepengegrunnlag')
        cy.get('.inntekt__info .redusert_sykepengegrunnlag').contains('638 394 kr')

    })
})
