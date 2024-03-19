describe('Julesøknadwarning', () => {
    const advarseltekst =
        'For å sikre at så mange som mulig skal få utbetalt sykepenger før jul, gjør vi det mulig for noen å sende søknaden før sykmeldingsperioden er over. Vi gjør oppmerksom på at det kan bety at det kan gå noe tid fra utbetalingen i desember til neste utbetaling.'

    describe('vedtak med warning', () => {
        it('Laster vedtaket', () => {
            cy.visit(
                'http://localhost:8080/syk/sykepenger?testperson=julesoknad&id=348a5462-456a-4bfc-9b54-11cd77a9937f',
            )
        })

        it('Har advarsel', () => {
            cy.contains(advarseltekst)
        })
    })

    describe('vedtak uten warning', () => {
        it('Laster vedtaket', () => {
            cy.visit(
                'http://localhost:8080/syk/sykepenger?testperson=direkte-og-refusjon&id=348a5462-456a-4bfc-9b54-11cd77a9937f',
            )
        })

        it('Har ikke advarsel', () => {
            cy.contains(advarseltekst).should('not.exist')
        })
    })
})

export {}
