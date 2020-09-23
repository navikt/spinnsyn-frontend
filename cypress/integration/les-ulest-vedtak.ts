import { ulestMedEnSykmeldingOgSoknad } from '../../src/data/mock/data/vedtak'

describe('Tester at appen starter', () => {


    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er et ulest vedtak og to lest', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 2)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste > article > .inngangspanel').click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${ulestMedEnSykmeldingOgSoknad.id}`)

        cy.get('.vedtak-status')
            .should('contain', 'Godkjent søknad om sykepenger')
            .and('contain', 'Gjelder sykefravær fra')
            .and('contain', '1. – 24. april 2020')

        cy.get('.utvidbar__innholdContainer')
            .should('not.have.class', 'apen')
            .and('not.be.visible')

        cy.contains('Beregnet sykepengebeløp').click()

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')
            .and('contain', 'Fra dette beløpet blir det trukket skatt og eventuelt andre trekk før utbetalingen.')
            .and('contain', '1. – 24. april 2020')
            .and('contain', 'POSTEN NORGE AS, BÆRUM')
            .and('contain', '974 654 458')
            .contains('Hvordan beregnes beløpet?').click()
        cy.contains('folketrygdloven § 8-28')
            .should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.contains('Klagefrist: 24. mai 2020')

        cy.contains('Automatisk behandling')
        cy.contains('Søknaden er behandlet automatisk. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingene fra arbeidsgiveren din. Du kan be om å få se opplysningene.')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Utbetalinger').click()
    })

    it('Det er ingen uleste vedtak og tre lest', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger/')
        cy.contains('Ingen behandlede søknader')
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 3)
    })
})


