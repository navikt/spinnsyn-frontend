describe('Tidligere utbetalt hel arbeidsgiverperiode', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=kun-direkte')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Åpner vedtak', () => {
        cy.findByRole('link', { name: /Sykmeldt fra /i }).click()
        cy.contains('Svar på søknad om sykepenger').should('be.visible')
    })

    it('Åpner beregning av sykepengene', () => {
        cy.get('body').findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Dine sykepenger per dag').should('be.visible')
            cy.findByRole('button', { name: 'Dine sykepenger per dag' }).click()
            cy.contains(
                'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at du ikke har gjenopptatt arbeidet og deretter vært friskmeldt i mer enn 16 dager. NAV har derfor utbetalt sykepenger fra første dag du ble sykmeldt.',
            ).should('be.visible')
        })
    })
})

export {}
