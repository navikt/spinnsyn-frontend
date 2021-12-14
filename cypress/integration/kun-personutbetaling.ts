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

        cy.get('.info').contains('Når får du sykepengene?')
        cy.get('.info').contains('Det kan variere litt når pengene blir utbetalt. Her kan du lese mer om når pengene kommer.')

        cy.contains('Mer om beregningen')
            .click({ force: true })

        //
        cy.get('.utvidbar__innhold .mer__inntekt__info > :nth-child(10)').contains('Totalbeløp')
        cy.get('.utvidbar__innhold .mer__inntekt__info > :nth-child(11)').contains('Til slutt summerer vi alle dagene. Totalbeløp viser beregnet sykepenger før skatt og eventuelle andre påleggstrekk.')

    })
})
