import { kunDirekte } from '../../../src/data/testdata/data/rs-vedtak'

describe('Personutbetaling uten kontonummer', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=direkte-uten-kontonummer')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om at kontonummer mangler', () => {
        cy.contains('24 550 kroner').and('contain', 'til deg (før skatt)').click({ force: true })

        cy.get('section.tekstinfo > :nth-child(3)').contains('Kontonummer for utbetaling')

        cy.get('section.tekstinfo > :nth-child(4)').contains(
            'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
        )
    })
})
