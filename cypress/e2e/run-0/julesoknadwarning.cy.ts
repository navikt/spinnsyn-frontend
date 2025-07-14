describe('Julesøknadwarning', () => {
    const advarseltekst =
        'Vi har utbetalt sykepengene dine tidligere enn vanlig. Vær derfor oppmerksom på at det kan ta litt tid før en eventuell neste utbetaling.'

    describe('vedtak med warning', () => {
        it('Laster vedtaket', () => {
            cy.visit(
                'http://localhost:3000/syk/sykepenger?testperson=julesoknad&id=348a5462-456a-4bfc-9b54-11cd77a99bbb',
            )
        })

        it('Har advarsel', () => {
            cy.contains(advarseltekst)
        })
    })

    describe('vedtak uten warning', () => {
        it('Laster vedtaket', () => {
            cy.visit(
                'http://localhost:3000/syk/sykepenger?testperson=kun-direkte&id=348a5462-456a-4bfc-9b54-11cd77a9937f',
            )
        })

        it('Har ikke advarsel', () => {
            cy.contains('24 550 kroner')
            cy.contains(advarseltekst).should('not.exist')
        })
    })
})

export {}
