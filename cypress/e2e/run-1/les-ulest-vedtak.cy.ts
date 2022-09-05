import {
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakRevurdert,
} from '../../../src/data/testdata/data/rs-vedtak'

describe('Tester at appen starter', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.injectAxe()
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er 2 ulest vedtak og 9 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 2)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 9)
    })

    it('Tester accessibility', () => {
        cy.checkA11y({
            exclude: ['.axe-exclude'],
        })
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('.vedtak--uleste').get(`article a[href*=${ulestVedtakUtenUtbetalingsdager.id}]`).click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${ulestVedtakUtenUtbetalingsdager.id}`)

        cy.contains('15. juni 2021')

        cy.contains('Opplysningene')
        cy.contains(
            'Vi fattet vedtaket 12. april 2021. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.'
        )
    })

    it('Tester accessibility', () => {
        cy.checkA11y()
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.contains('21 060 kroner').and('contain', 'Utbetales til Pengeløs Sparebank').click()

        cy.contains('Mer om beregningen').click()
        cy.contains('folketrygdloven § 8-28').should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.contains('Inntekter lagt til grunn for sykepengene').click()
        cy.get('.tekstinfo')
            .should('contain', 'Beregnet månedslønn')
            .and('contain', '37\u00a0500 kr')
            .should('contain', 'Årslønn')
            .and('contain', '450\u00a0000 kr')
    })

    it('Den blå boksen har riktig innhold', () => {
        cy.get('.ekspanderbar.bla')
            .should('contain', '15 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .click()

        cy.should('contain', '180 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')

        cy.should('contain', '17. des. 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', 'Datoen gjelder hvis du er sykmeldt uten opphold.')
    })

    it('Tester accessibility', () => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(200) // Ekspander alt innhold
        cy.checkA11y({
            exclude: ['.knapperad'], //Har lagd trellolapp
        })
    })

    it('Vi går tilbake til oversikten', () => {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
        cy.get(':nth-child(3) > .navds-link').contains('Svar på søknader').click()
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(1000)
    })

    it('Det er 1 uleste vedtak og 10 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('.vedtak--uleste > article > .inngangspanel').should('have.length', 1)
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 10)
    })

    it('Tester accessibility', () => {
        cy.checkA11y({
            exclude: ['.axe-exclude'],
        })
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 10).eq(3).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakAnnullert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('.annullering .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.get(':nth-child(3) > .navds-link').contains('Svar på søknader').click({ force: true })
    })

    it('Vi åpner et revurdert vedtak', () => {
        cy.get('.vedtak--leste > article > .inngangspanel').should('have.length', 10).eq(4).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakRevurdert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('.annullering .info')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vedtaket viser beregnet sluttdato sendt fra bømlo', () => {
        cy.get('.ekspanderbar.ugyldig')
            .eq(1)
            .should('contain', '9 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .click()

        cy.should('contain', '186 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')
        cy.should('contain', '11. nov. 1918').and('contain', 'Beregnet slutt på sykepenger')
    })

    it('Tester accessibility', () => {
        cy.checkA11y()
    })
})
