/* eslint-disable cypress/unsafe-to-chain-command */
describe('Kombinasjonutbetaling keyboard', () => {
    before(() => {
        cy.clearCookies()
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 2)
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
        cy.focused().contains('Min side')

        cy.realPress('Tab') // Når får du sykepengene?
        cy.focused().contains('Når får du sykepengene?')

        cy.realPress('Enter') // Når får du sykepengene?
        cy.realPress('Tab')

        cy.focused().contains('Les mer om når du kan forvente')
        cy.realPress('Tab')
    })

    it('Tabber gjennom beregning av sykepengene', () => {
        cy.focused().should('have.class', 'navds-expansioncard__header-button')
        cy.realPress('Enter')

        cy.realPress('Tab')
        cy.focused().contains('Sykepenger per dag til deg')

        cy.realPress('Tab')
        cy.focused().contains('Sykepenger per dag til arbeidsgiver')

        cy.realPress('Tab')
        cy.focused().contains('Mer om beregningen')
    })

    it('Viser info om sykepengedager brukt', () => {
        cy.realPress('Tab')
        cy.get('h3').contains('248 sykepengedager').and('is.not.visible')
        cy.focused().should('have.class', 'navds-expansioncard__header-button')
        cy.realPress('Enter')
        cy.get('h3').contains('248 sykepengedager').and('is.visible')
    })

    it('Annen info i bunnen av vedtaket', () => {
        cy.realPress('Tab') // Kontakt oss link
        cy.focused().contains('Kontakt oss')

        cy.realPress('Tab')
        cy.focused().contains('kontakte NAV')

        cy.realPress('Tab')
        cy.focused().contains('endre svarene i søknaden')

        cy.realPress('Tab') // Retten til å klage link
        cy.focused().contains('retten til å klage')

        cy.realPress('Tab') // Klageveilederen link
        cy.focused().contains('klageveilederen')
    })
})

export {}
