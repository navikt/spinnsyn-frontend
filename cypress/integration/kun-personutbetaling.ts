import { kunDirekte, } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning personutbetaling', () => {

    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kun-direkte')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=kun-direkte')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om utbetaling til person', () => {
        cy.contains('Du får noen av sykepengene dine fra NAV og resten fra arbeidsgiveren din. Arbeidsgiveren din får igjen pengene fra NAV senere.').should('not.exist')
        cy.contains('Utbetales til Matbutikken AS').should('not.exist')

        cy.contains('24 550 kroner')
            .and('contain', 'til deg (før skatt)')
            .click({ force: true })

        cy.get('.tekstinfo').children().first().contains('Når får du sykepengene?')

        cy.get('.tekstinfo').children('.navds-body-long')
            .contains('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, ' +
                'eller innen fem dager etter at vi har sendt deg svar på søknaden din. ' +
                'Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.')

        cy.get('.tekstinfo > :nth-child(3) > strong').contains('Utbetales til kontonummer:')

        cy.get('.tekstinfo > :nth-child(3)').contains('1001 11 10011')

        cy.contains('Mer om beregningen')
            .click({ force: true })

        cy.get('.ekspanderbar .tekstinfo > :nth-child(10)')
            .contains('Totalbeløp')

        cy.get('.ekspanderbar .tekstinfo > :nth-child(11)')
            .contains('Til slutt summerer vi alle dagene. ' +
                'Totalbeløp viser beregnet sykepenger før skatt og eventuelle andre påleggstrekk.')

    })
})
