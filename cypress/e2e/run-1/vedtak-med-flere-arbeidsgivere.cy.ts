import { vedtakMedFlereArbeidsgivere } from '../../../src/data/testdata/data/vedtakMedFlereArbeidsgivere'

describe('Tester visning av et vedtak med flere arbeidsgivere', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
        cy.get(`article a[href*=${vedtakMedFlereArbeidsgivere.id}]`).click()
    })

    it('Inntekter', () => {
        cy.contains('1 359 kroner').and('contain', 'Utbetales til Industrifabrikken AS').click({ force: true })

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.get('.inntekt__info .arbgiver_inntekt section').eq(0).contains('Beregnet månedslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(0).contains('41 958 kr')

        cy.get('.inntekt__info .arbgiver_inntekt section').eq(1).contains('Beregnet årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(1).contains('503 504 kr')

        cy.get('.inntekt__info .arbgiver_navn').contains('Den Andre Sjappa')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(2).contains('Årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(2).contains('406 252 kr')

        cy.get('.inntekt__info .arbgiver_inntekt section').eq(3).contains('Samlet årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(3).contains('909 757 kr')

        cy.get('.inntekt__info .arbgiver_inntekt section').eq(4).contains('Sykepengegrunnlag')
        cy.get('.inntekt__info .arbgiver_inntekt section').eq(4).contains('638 394 kr')
    })
})
