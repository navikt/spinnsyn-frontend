describe('Kun personutbetaling', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=innvilget-vedtak')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=innvilget-vedtak')
    })
})
