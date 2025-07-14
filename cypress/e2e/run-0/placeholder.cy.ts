describe('Placeholder test', () => {
    it('should always pass', () => {
        cy.visit('/')
        cy.get('h1').should('exist')
    })
})
