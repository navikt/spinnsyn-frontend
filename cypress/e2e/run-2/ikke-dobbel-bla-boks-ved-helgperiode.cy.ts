import { ingenUtbetalingFordiAlleDagerHelg } from '../../../src/data/testdata/data/vedtak/ingenUtbetalingFordiAlleDagerHelg'

describe('Ved et vedtak med null utbetaling vises ikke tekst om hvem som får null kroner', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=diverse-data')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=diverse-data')
        cy.get(`a[href*=${ingenUtbetalingFordiAlleDagerHelg.id}]`).click()
    })

    it('Inntekter', () => {
        cy.get('body')
            .should('be.visible')
            .should('contain', 'Ingen utbetaling')
            .should('not.contain', '0 kroner')
            .should('contain', 'Beregning av sykepengene')

        cy.contains('Sykepenger betales bare for dagene mandag til fredag')

        cy.contains('Hvorfor får jeg ingen utbetaling')
        cy.contains('Helg')
    })
})
