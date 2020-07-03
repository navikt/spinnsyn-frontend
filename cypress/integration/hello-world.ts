
describe('Tester at appen starter', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/')
    })

})
