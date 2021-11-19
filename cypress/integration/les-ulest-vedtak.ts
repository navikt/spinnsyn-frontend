import { ulestVedtakUtenUtbetalingsdager, vedtakAnnullert, vedtakRevurdert } from '../../src/data/mock/data/rs-vedtak'

describe('Tester at appen starter', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er 2 ulest vedtak og 6 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 2)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 6)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste')
            .get(`article a[href*=${ulestVedtakUtenUtbetalingsdager.id}]`)
            .click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${ulestVedtakUtenUtbetalingsdager.id}`)

        cy.contains('14. juni 2021')

        cy.contains('Automatisk behandling')
        cy.contains('Søknaden din er behandlet automatisk. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.')
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.get('.utvidbar__innholdContainer')
            .should('not.have.class', 'apen')
            .and('not.be.visible')

        cy.contains('21 060 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click({ force: true })

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')

        cy.contains('Slik beregner vi sykepengene').click({ force: true })
        cy.contains('folketrygdloven § 8-28')
            .should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.get('.inntekt__info')
            .should('contain', 'Beregnet månedslønn').and('contain', '37\u00a0500 kr')
            .should('contain', 'Omregnet til årslønn').and('contain', '450\u00a0000 kr')
    })

    it('Den blå boksen har riktig innhold', () => {

        cy.get('.utvidbar.bla').should('contain', '15')
            .and('contain', 'Sykepengedager brukt hittil')
            .click({ force: true })

        cy.should('contain', '180').and('contain', 'Sykepengedager gjenstår')
        cy.should('contain', '17. des. 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', 'Datoen gjelder hvis du er sykmeldt uten pauser.')

        cy.contains('Når sykepengene tar slutt').click({ force: true })
        cy.get('.utvidbar__innholdContainer')
            .should('contain', 'Om du fortsatt ikke kan arbeide på grunn av sykdom eller skade etter 52 uker')

    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Svar på søknader').click()
    })

    it('Det er 1 uleste vedtak og 7 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger/')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 7)
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel')
            .should('have.length', 7).eq(2).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${vedtakAnnullert.id}`)
        cy.contains('Ny behandling av søknaden vil ikke skje automatisk. Da er det en saksbehandler som vurderer søknaden.')
        cy.get('.annullering > .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles den på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Svar på søknader').click()
    })

    it('Vi åpner et revurdert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel')
            .should('have.length', 7).eq(3).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${vedtakRevurdert.id}`)
        cy.contains('Ny behandling av søknaden vil ikke skje automatisk. Da er det en saksbehandler som vurderer søknaden.')
        cy.get('.annullering > .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles den på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vedtaket viser beregnet sluttdato sendt fra bømlo', () => {

        cy.get('.utvidbar.bla').should('contain', '9')
            .and('contain', 'Sykepengedager brukt hittil')
            .click({ force: true })

        cy.should('contain', '186').and('contain', 'Sykepengedager gjenstår')
        cy.should('contain', '11. nov. 1918').and('contain', 'Beregnet slutt på sykepenger')
    })
})


