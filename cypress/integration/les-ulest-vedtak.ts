import { ulestRefusjonTilArbeidsgiver } from '../../src/data/mock/data/vedtak'

describe('Tester at appen starter', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er et ulest vedtak og tre leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 3)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste > article > .inngangspanel').click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${ulestRefusjonTilArbeidsgiver.id}`)

        cy.get('.vedtak-status')
            .should('contain', 'Godkjent søknad om sykepenger')
            .and('contain', 'Gjelder sykefravær fra')
            .and('contain', '9. – 15. oktober 2020')

        cy.contains('Klagefrist: 27. november 2020')

        cy.contains('Automatisk behandling')
        cy.contains('Søknaden din er behandlet automatisk. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.')
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.get('.utvidbar__innholdContainer')
            .should('not.have.class', 'apen')
            .and('not.be.visible')

        cy.contains('5 250 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click()

        cy.get('.inntekt__info')
            .should('contain', 'Slik beregner vi sykepengene')
            .should('contain', 'Beregnet månedslønn').and('contain', '22\u00a0750 kr')
            .should('contain', 'Omregnet til årslønn').and('contain', '273\u00a0000 kr')
            .should('contain', 'Daglig utbetalingsbeløp').and('contain', '1\u00a0050 kr')
            .should('contain', 'Utbetalingsdager').and('contain', '5 dager')
            .should('contain', 'Sykepengebeløp').and('contain', '5\u00a0250 kr')

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')
            .and('contain', 'Når du får utbetalt sykepengene fra arbeidsgiveren din, har arbeidsgiveren trukket skatt og eventuelt andre faste trekk fra dette beløpet.')

        cy.contains('Mer om beregningen').click({ force: true })
        cy.contains('folketrygdloven § 8-28')
            .should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.contains('Ved feil opplysninger').click({ force: true })
        cy.get('.utvidbar__innholdContainer')
            .should('contain', 'Klagefrist: 27. november 2020')
        cy.get('.utvidbar__innholdContainer').contains('Lukk').click({ force: true })
    })

    it('Den blå boksen har riktig innhold', () => {

        cy.contains('19')
            .and('contain', 'Sykepengedager brukt hittil')
            .click({ force: true })

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')

        cy.should('contain', '229').and('contain', 'Sykepengedager gjenstår')
        cy.should('contain', '1. sep. 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', '* Datoen gjelder hvis du er sykmeldt uten pauser.')

        cy.contains('Når sykepengene tar slutt').click()
        cy.get('.utvidbar__innholdContainer')
            .should('contain', 'Om du fortsatt ikke kan arbeide på grunn av sykdom eller skade etter 52 uker')

    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Utbetalinger').click()
    })

    it('Det er ingen uleste vedtak og fire leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger/')
        cy.contains('Du har ingen nye behandlede søknader fra NAV.')
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 4)
    })

    it('Vi åpner et vedtak uten inntektsmelding', () => {
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 4).last()
            .click({ force: true })
        cy.contains('15 000 kroner').click()
        cy.contains('Mer om beregningen').click({ force: true })
        cy.get('.utvidbar__innhold')
            .should('contain', 'Månedslønnen')
            .and('contain', 'Årslønn')
            .and('contain', 'Daglig beløp')
            .and('contain', 'Totalbeløp')
            .and('contain', 'Hvis du er delvis sykmeldt')
        cy.should('not.contain', 'Automatisk behandling')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Utbetalinger').click()
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 4).eq(2).click({ force: true })
        cy.contains('Søknaden behandles på nytt')
        cy.contains('Ny behandling av søknaden vil ikke skje automatisk. Da er det en saksbehandler som vurderer søknaden. ')
        cy.get('.annullering > .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles den på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')

    })

})


