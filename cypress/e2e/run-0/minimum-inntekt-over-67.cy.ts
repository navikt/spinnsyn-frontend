describe('Minimum inntekt over 67', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 9)
    })

    it('Vedtak med avviste dager og ingen utbetaling grunnet minimum inntekt over 67', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=for-lav-inntekt-67&id=3ef1f882-4dbf-478d-bc98-5b878e7376ca',
        )

        cy.contains('Ingen utbetaling')

        it('Åpner begrunnelse for skjønnsfastsetting', () => {
            cy.get('main').findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()

            cy.findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
                .should('contain', 'Begrunnelse for skjønnsfastsetting')
                .siblings('div')
                .should('contain', 'Dette er årsaken til avviket.')
        })
    })
})
