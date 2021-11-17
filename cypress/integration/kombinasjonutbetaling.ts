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
        cy.contains('24 550 kroner')
            .and('contain', 'til deg (før skatt)')
            .click({ force: true })


        cy.get('.personutbetaling .info').contains('Når får du pengene?').should('be.visible')
        cy.get('.personutbetaling .info').contains('Pengene utbetales som regel innen 4 uker. Her kan du lese mer om når pengene kommer.').should('be.visible')

        cy.get('.personutbetaling').contains('Slik beregner vi sykepengene')
            .click({ force: true })


        //
        cy.get('.personutbetaling .utvidbar__innhold > :nth-child(11)').contains('Totalbeløp').should('be.visible')
        cy.get('.personutbetaling .utvidbar__innhold > :nth-child(12)').contains('Til slutt summerer vi alle dagene. Totalbeløp viser beregnet sykepenger før skatt og eventuelle andre påleggstrekk.').should('be.visible')


        cy.contains('24 550 kroner')
            .and('contain', 'til deg (før skatt)')
            .click({ force: true })

        cy.get('.personutbetaling').contains('Når får du pengene?').should('not.be.visible')

    })

    it('Viser info om utbetaling til arbeidsgiveren', () => {
        cy.contains('4 910 kroner')
            .and('contain', 'Utbetales til arbeidsgiveren')

        cy.contains('Utbetales til arbeidsgiveren')
            .click({ force: true })


        cy.get('.info').contains('Når får du pengene?').should('not.be.visible')
        cy.get('.info').contains('Pengene utbetales som regel innen 4 uker. Her kan du lese mer om når pengene kommer.').should('not.be.visible')

        cy.get('.refusjon').contains('Slik beregner vi sykepengene').click({ force: true })


        cy.get('.refusjon .utvidbar__innhold > :nth-child(11)').contains('Totalbeløp').should('be.visible')
        cy.get('.refusjon .utvidbar__innhold > :nth-child(12)').contains('Til slutt summerer vi alle dagene. Når du får utbetalt sykepengene fra arbeidsgiveren din, har arbeidsgiveren trukket skatt og eventuelt andre faste trekk fra dette beløpet.').should('be.visible')

    })
})
