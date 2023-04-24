import {
    ulestVedtakUtenUtbetalingsdager,
    vedtakAnnullert,
    vedtakRevurdert,
} from '../../../src/data/testdata/data/rs-vedtak'

describe('Les uleste vedtak', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Det er 2 ulest vedtak og 9 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('[data-cy="uleste-vedtak"] a').should('have.length', 2)
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 9)
    })

    it('Vi åpner det uleste vedtaket', () => {
        cy.get('[data-cy="uleste-vedtak"] a').get(`a[href*=${ulestVedtakUtenUtbetalingsdager.id}]`).click()

        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${ulestVedtakUtenUtbetalingsdager.id}`)

        cy.contains('15. juni 2021')

        cy.contains('Opplysningene')
        cy.contains(
            'Vi fattet vedtaket 12. april 2021. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.contains('21 060 kroner').parent().contains('Utbetales til Pengeløs Sparebank')

        cy.contains('Mer om beregningen').click()
        cy.contains('folketrygdloven § 8-28').should('have.attr', 'href', 'https://lovdata.no/lov/1997-02-28-19/§8-28')

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-månedslønn"]')
            .should('contain', 'Beregnet månedslønn')
            .should('contain', '37\u00a0500 kr')

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-årslønn"]')
            .should('contain', 'Beregnet årslønn')
            .should('contain', '450\u00a0000 kr')

        cy.get('[data-cy="inntekt-info-article"] [data-cy="sykepengegrunnlag"]')
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', '455\u00a0000 kr')
    })

    it('Den blå boksen har riktig innhold', () => {
        cy.get('[data-cy="sykepengedager-ec"]')
            .should('contain', '15 sykepengedager')
            .and('contain', 'Brukt per 9. april 2021')
            .click()

        cy.should('contain', '180 sykepengedager').and('contain', 'Gjenstår per 9. april 2021')

        cy.should('contain', '17. des. 2021').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', 'Datoen gjelder hvis du er sykmeldt uten opphold.')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get('[data-cy="uleste-vedtak"] a')
    })

    it('Det er 2 uleste vedtak og 9 leste', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get('[data-cy="uleste-vedtak"] a').should('have.length', 2)
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 9)
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 9).eq(3).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakAnnullert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('[data-cy="annullering-info"]')
            .should('not.contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('not.contain', 'Hvem har sendt opplysningene?')
            .and('not.contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vi åpner et revurdert vedtak', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 9).eq(4).click({ force: true })
        cy.url().should('equal', `http://localhost:8080/syk/sykepenger?id=${vedtakRevurdert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('[data-cy="annullering-info"]')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vedtaket viser beregnet sluttdato sendt fra bømlo', () => {
        cy.get('[data-cy="sykepengedager-ec-ugyldig"]')
            .eq(0)
            .should('contain', '9 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .click()

        cy.should('contain', '186 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')
        cy.should('contain', '11. nov. 1918').and('contain', 'Beregnet slutt på sykepenger')
    })
})
