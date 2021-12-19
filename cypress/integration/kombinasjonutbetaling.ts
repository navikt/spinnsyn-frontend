import { kombinertDirekteOgRefusjon } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av kombinasjon', () => {

    const vedtak = kombinertDirekteOgRefusjon

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om utbetaling til personen', () => {
        cy.contains('Du får noen av sykepengene dine fra NAV og resten fra arbeidsgiveren din. Arbeidsgiveren din får igjen pengene fra NAV senere.')

        cy.contains('24 550 kroner')
            .and('contain', 'til deg (før skatt)')
            .click({ force: true })


        cy.get('.personutbetaling .tekstinfo').contains('Når får du sykepengene?').should('be.visible')
        cy.get('.personutbetaling .tekstinfo').contains('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din.').should('be.visible')
        cy.get('.personutbetaling .info').first().contains('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.').should('be.visible')
        cy.get('.personutbetaling .info > h2').contains('Kontonummer for utbetaling')
        cy.get('.personutbetaling .info > :nth-child(4)').contains('Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn på Din profil slik at vi får utbetalt sykepengene til deg så raskt som mulig.')

        cy.get('.personutbetaling .utvidbar__tittel').contains('Mer om beregningen')
            .click({ force: true })


        //
        cy.get('.personutbetaling .ekspanderbartPanel__innhold .mer__inntekt__info > :nth-child(10)').contains('Totalbeløp').should('be.visible')
        cy.get('.personutbetaling .ekspanderbartPanel__innhold .mer__inntekt__info > :nth-child(11)').contains('Til slutt summerer vi alle dagene. Totalbeløp viser beregnet sykepenger før skatt og eventuelle andre påleggstrekk.').should('be.visible')


        cy.contains('24 550 kroner')
            .and('contain', 'til deg (før skatt)')
            .click({ force: true })

        cy.get('.personutbetaling').contains('Når får du sykepengene?').should('not.exist')

    })

    it('Viser info om utbetaling til arbeidsgiveren', () => {
        cy.contains('4 910 kroner')
            .and('contain', 'Utbetales til Matbutikken AS')

        cy.contains('Utbetales til Matbutikken AS')
            .click()

        cy.get('.info').contains('Når får du sykepengene?').should('not.be.visible')
        cy.get('.info').contains('Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, eller innen fem dager etter at vi har sendt deg svar på søknaden din.').should('not.be.visible')

        cy.get('.refusjon .utvidbar__tittel').contains('Mer om beregningen').click({ force: true })

        cy.get('.refusjon .ekspanderbartPanel__innhold .mer__inntekt__info > :nth-child(10)').contains('Totalbeløp').should('be.visible')
        cy.get('.refusjon .ekspanderbartPanel__innhold .mer__inntekt__info > :nth-child(11)').contains('Til slutt summerer vi alle dagene. Når du får utbetalt sykepengene fra arbeidsgiveren din, har arbeidsgiveren trukket skatt og eventuelt andre faste trekk fra dette beløpet.').should('be.visible')

    })
})
