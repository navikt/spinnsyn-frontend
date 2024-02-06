describe('Vedtak for arkivering', () => {
    it('Vanlig vedtak', () => {
        cy.visit('http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering')

        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.contains(
            'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
        )
        cy.get('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)').should('have.length', 0)
    })

    it('Skjønnsfastsatt brukerutbetaling', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering?testperson=skjonnsfastsatt-brukerutbetaling',
        )

        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.contains(
            'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
        )
        cy.get('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)').should('have.length', 0)
    })
})

export {}
