describe('Revurdert og annullert', () => {
    before(() => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=revurdert-og-annullert&id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337',
        )
    })

    it('Har annullert tekst, men ikke revurdert tekst', () => {
        cy.contains('Av tekniske årsaker er saken din flyttet til et annet saksbehandlingssystem.')
        cy.get('body').should('not.contain', 'Denne beslutningen er behandlet på nytt.')
    })
})
