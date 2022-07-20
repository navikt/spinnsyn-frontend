import { vedtakMedDetMeste } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av et vedtak redusert til 6G', () => {
    const vedtak = vedtakMedDetMeste

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.injectAxe()
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('3 021 kroner')
            .and('contain', 'Utbetales til Posten Norge AS, Bærum')
            .click({ force: true })

        cy.contains('Mer om beregningen').click({ force: true })

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(0)
            .contains('Beregnet månedslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(0)
            .contains('74 675 kr')

        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(1)
            .contains('Beregnet årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(1)
            .contains('896 100 kr')

        cy.get('.inntekt__info .arbgiver_navn').contains(
            'The Ministry Of Magic AS'
        )
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(2)
            .contains('Årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(2)
            .contains('195 781 kr')

        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(3)
            .contains('Samlet årslønn')
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(3)
            .contains('1 091 881 kr')

        // Sjekker om sykepengegrunnlaget er redusert
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(4)
            .contains('Sykepengegrunnlag')
        cy.get('.inntekt__info .arbgiver_inntekt section')
            .eq(4)
            .contains('638 394 kr')
    })

    it('Tester accessibility', () => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(200) // Ekspander alt innhold
        cy.checkA11y()
    })
})
