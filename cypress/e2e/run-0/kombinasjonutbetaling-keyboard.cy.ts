describe('Kombinasjonutbetaling keyboard', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
    })

    it('Finner vedtaket i listevisningen', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=kombinasjon')

        cy.contains('Svar på søknader').and('is.visible')
        cy.get('#maincontent').focus()

        cy.get('h2').contains('Nye svar på søknader')
        cy.get('h2').contains('Tidligere svar på søknader')

        cy.realPress('Tab') // Person ikon

        cy.realPress('Tab')
        cy.focused().within(() => {
            cy.get('h3').contains('Svar på søknad om sykepenger')
            cy.get('p').contains('Sykmeldt fra Matbutikken AS')
        })
        cy.realPress('Enter')
    })

    it('Viser info om utbetaling til personen', () => {
        cy.realPress('Tab') // Person ikon

        cy.get('h3').contains('Kontonummer for utbetaling')

        cy.realPress('Tab') // Min side link
        cy.realPress('Tab') // Når får du sykepengene?

        cy.realPress('Tab')
        cy.focused().contains('Inntekter lagt til grunn for sykepengene')
        cy.realPress('Enter')

        cy.realPress('Tab') // 6G link

        cy.realPress('Tab')
        cy.focused().contains('Sykepenger per dag')
        cy.realPress('Enter')

        cy.realPress('Tab')
        cy.focused().contains('Mer om beregningen')
        cy.realPress('Enter')

        cy.realPress('Tab') // Inntekter som tas med link
        cy.realPress('Tab') // 6G link
        cy.realPress('Tab') // Sykeoengegrunnlag paragraf link
        cy.realPress('Tab') // Sykepengeberegning paragraf link
        cy.realPress('Tab') // Din utbetalingsoversikt link
    })

    it('Viser info om utbetaling til arbeidsgiveren', () => {
        cy.get('h3').contains('Beløpet går til arbeidsgiveren din')

        cy.realPress('Tab')
        cy.focused().contains('Inntekter lagt til grunn for sykepengene')
        cy.realPress('Tab')
        cy.focused().contains('Sykepenger per dag')
        cy.realPress('Tab')
        cy.focused().contains('Mer om beregningen')
    })

    it('Viser info om sykepengedager brukt', () => {
        cy.realPress('Tab')
        cy.realPress('Enter')
        cy.get('h3').contains('248 sykepengedager')
    })

    it('Annen info i bunnen av vedtaket', () => {
        cy.realPress('Tab') // Kontakt oss link
        cy.realPress('Tab') // Retten til å klage link
        cy.realPress('Tab') // Klageveilederen link

        cy.get('h2').contains('Søknaden er behandlet automatisk')
        cy.get('h2').contains('Du har rett til å klage')
    })
})

export {}
