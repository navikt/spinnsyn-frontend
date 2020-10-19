import { ulestRefusjonTilArbeidsgiver } from '../../src/data/mock/data/vedtak'

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

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger/vedtak/${ulestRefusjonTilArbeidsgiver.id}`)

        cy.get('.vedtak-status')
            .should('contain', 'Godkjent søknad om sykepenger')
            .and('contain', 'Gjelder sykefravær fra')
            .and('contain', '12. – 27. september 2020')

        cy.contains('Klagefrist: 9. november 2020')

        cy.contains('Automatisk behandling')
        cy.contains('Søknaden din er behandlet automatisk. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.')
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.get('.utvidbar__innholdContainer')
            .should('not.have.class', 'apen')
            .and('not.be.visible')

        cy.contains('15 000 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')
            .click()

        cy.get('.inntekt__info')
            .should('contain', 'Slik beregner vi sykepengene')
            .should('contain', 'Beregnet månedslønn').and('contain', '10\u00a0000 kr')
            .should('contain', 'Omregnet til årslønn').and('contain', '120\u00a0000 kr')
            .should('contain', 'Daglig utbetalingsbeløp').and('contain', '3\u00a0000 kr')
            .should('contain', 'Utbetalingsdager').and('contain', '30 dager')
            .should('contain', 'Sykepengebeløp').and('contain', '15\u00a0000 kr')

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')
            .and('contain', 'Når du får utbetalt sykepengene fra arbeidsgiveren din, har arbeidsgiveren trukket skatt og eventuelt andre faste trekk fra dette beløpet.')

        cy.contains('Mer om beregningen').click({ force: true })
        cy.contains('folketrygdloven § 8-28')
            .should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.contains('Ved feil opplysninger').click({ force: true })
        cy.get('.utvidbar__innholdContainer')
            .should('contain', 'Klagefrist: 9. november 2020')
        cy.get('.utvidbar__innholdContainer').contains('Lukk').click({ force: true })
    })

    it('Den blå boksen har riktig innhold', () => {

        cy.contains('185')
            .and('contain', 'Sykepengedager gjenstår')
            .click({ force: true })

        cy.get('.utvidbar__innholdContainer')
            .should('have.class', 'apen')

        cy.should('contain', '10').and('contain', 'Sykepengedager brukt hittil')
        cy.should('contain', '11. juni 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', '* Datoen gjelder hvis du er sykmeldt uten pauser.')

        cy.contains('Når sykepengene tar slutt').click()
        cy.get('.utvidbar__innholdContainer')
            .should('contain', 'Om du fortsatt ikke kan arbeide på grunn av sykdom eller skade etter 52 uker')

    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .lenke').contains('Utbetalinger').click()
    })

    it('Det er ingen uleste vedtak og tre lest', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger/')
        cy.contains('Du har ingen nye behandlede søknader fra NAV.')
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 3)
    })

    it('Vi åpner et vedtak uten inntektsmelding', () => {
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 3).last()
            .click({ force: true })
        cy.contains('15 000 kroner').click()
        cy.contains('Mer om beregningen').click({ force: true })
        cy.get('.utvidbar__innhold')
            .should('contain', 'Månedslønnen')
            .and('contain', 'Årslønn')
            .and('contain', 'Daglig beløp')
            .and('contain', 'Totalbeløp')
            .and('contain', 'Hvis du er delvis sykmeldt')
    })

})


