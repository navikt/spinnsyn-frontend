import { ulestMedEnSykmeldingOgSoknad } from '../../src/data/mock/data/vedtak'

describe('Tester at appen starter', () => {


    before(() => {
        cy.visit('http://localhost:8080')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/')
    })

    it('Det er et ulest vedtak og to lest', () => {
        cy.url().should('equal', 'http://localhost:8080/')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 2)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste > article > .inngangspanel').click()

        cy.url().should('equal', `http://localhost:8080/vedtak/${ulestMedEnSykmeldingOgSoknad.id}`)
        cy.contains('Godkjent søknad om sykepenger')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Behandlede søknader').click()
    })

    it('Det er ingen uleste vedtak og tre lest', () => {
        cy.url().should('equal', 'http://localhost:8080/')
        cy.contains('Ingen behandlede søknader')
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 3)
    })
})


