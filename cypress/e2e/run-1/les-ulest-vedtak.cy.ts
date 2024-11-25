import { vedtakAnnullert } from '../../../src/data/testdata/data/vedtak/annullert'
import { vedtakRevurdert } from '../../../src/data/testdata/data/vedtak/revurdert'

describe('Les uleste vedtak', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 10)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger')
    })

    it('Det er 3 ulest vedtak og 6 leste', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger')
        cy.get('[data-cy="uleste-vedtak"] a').should('have.length', 4)
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 6)
    })

    it('Vi åpner et ulest vedtaket', () => {
        cy.get('[data-cy="uleste-vedtak"] a').get(`a[href*=dff11217-31ea-404a-86ab-93gh93rugh93]`).click()

        cy.url().should('equal', `http://localhost:3000/syk/sykepenger?id=dff11217-31ea-404a-86ab-93gh93rugh93`)

        cy.contains('Opplysningene')
        cy.contains(
            'Vi fattet vedtaket 22. februar 2021. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )
    })

    it('Den grønne boksen har riktig innhold', () => {
        cy.contains('6 200 kroner').parent().contains('Utbetales til Integrasjon AS')
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.contains('Mer om beregningen').click()
        cy.contains('folketrygdloven § 8-28').should(
            'have.attr',
            'href',
            'https://lovdata.no/nav/folketrygdloven/kap8/%C2%A78-28',
        )

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .find('.navds-body-short.navds-body-short--small')
            .contains('Beregnet månedsinntekt')
            .should('be.visible')

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .find('.navds-body-short.navds-body-short--small p')
            .should('contain', '(hentet fra inntektsmeldingen)')

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', '360\u00a0000 kr')

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Sykepengegrunnlag' })
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', '370\u00a0000 kr')
    })

    it('Den blå boksen har riktig innhold', () => {
        cy.get('main')
            .findByRole('region', { name: 'Antall sykepengedager som gjenstår' })
            .should('contain', '10 sykepengedager')
            .and('contain', 'Brukt per 5. mars 2021')
            .click()

        cy.should('contain', '238 sykepengedager').and('contain', 'Gjenstår per 5. mars 2021')

        cy.should('contain', '2. feb. 2022').and('contain', 'Beregnet slutt på sykepenger')
        cy.should('contain', 'Datoen gjelder hvis du er sykmeldt uten opphold.')
    })

    it('Vi går tilbake til oversikten', () => {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 10)
    })

    it('Det er 3 uleste vedtak og 6 leste', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger')
        cy.get('[data-cy="uleste-vedtak"] a').should('have.length', 4)
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 6)
    })

    it('Vi åpner et annullert vedtak', () => {
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 6).eq(2).click({ force: true })
        cy.url().should('equal', `http://localhost:3000/syk/sykepenger?id=${vedtakAnnullert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('[data-cy="annullering-info"]')
            .should('not.contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('not.contain', 'Hvem har sendt opplysningene?')
            .and('not.contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vi åpner et revurdert vedtak', () => {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.get('[data-cy="leste-vedtak"] a').should('have.length', 6).eq(3).click({ force: true })
        cy.url().should('equal', `http://localhost:3000/syk/sykepenger?id=${vedtakRevurdert.id}`)
        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').click()

        cy.get('[data-cy="annullering-info"]')
            .should('contain', 'Vil dette ha noe å si for pengene jeg får?')
            .and('contain', 'Hvem har sendt opplysningene?')
            .and('contain', 'Hvorfor behandles vedtaket på nytt?')
            .and('contain', 'Må jeg gjøre noe nå?')
    })

    it('Vedtaket viser beregnet sluttdato sendt fra bømlo', () => {
        cy.get('main')
            .findByRole('region', { name: 'Antall sykepengedager som gjenstår' })
            .eq(0)
            .should('contain', '9 sykepengedager')
            .and('contain', 'Brukt per 3. mai 2021')
            .and('have.css', 'background-color', 'rgb(236, 238, 240)' /* grå */)
            .click()

        cy.should('contain', '186 sykepengedager').and('contain', 'Gjenstår per 3. mai 2021')
        cy.should('contain', '11. nov. 1918').and('contain', 'Beregnet slutt på sykepenger')
    })
})
