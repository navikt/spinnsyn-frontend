describe('Tidligere utbetalt hel arbeidsgiverperiode', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kun-direkte')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Åpner vedtak', () => {
        cy.findByRole('link', { name: /Sykmeldt fra /i }).click()
        cy.contains('Svar på søknad om sykepenger').should('be.visible')
    })

    it('Åpner beregning av sykepengene', () => {
        cy.get('body').findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Sykepenger per dag').should('be.visible')
            cy.findByRole('button', { name: 'Sykepenger per dag' }).click()
            cy.contains(
                'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at det ikke har gått mer enn 16 dager fra du gjenopptok arbeidet og til du ble sykmeldt igjen. NAV har derfor utbetalt sykepenger fra første dag du ble sykmeldt. ',
            ).should('be.visible')
        })
    })
})

export {}
