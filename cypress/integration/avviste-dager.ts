import { integrasjonsVedtak, vedtakMed40Grad } from '../../src/data/mock/data/rs-vedtak'

describe('Tester visning av dager som ikke dekkes av NAV', () => {

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', () => {
        cy.get(`article a[href*=${vedtakMed40Grad.id}]`).click()

        cy.get('.utvidbar.orange')
            .should('not.exist')

        cy.get('.smule')
            .contains('Utbetalinger')
            .click()
    })

    it('Vedtak med delvis godkjente utbetalingsdager', () => {
        cy.get(`article a[href*=${integrasjonsVedtak.id}]`).click()

        cy.get('.utvidbar.orange')
            .should('contain', '11 sykepengedager')
            .and('contain', 'Dekkes ikke av NAV')
            .click()

        cy.contains('Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.')

        cy.get('.tabell--dag').within(() => {
            cy.contains('30.01.21').should('not.be.visible')
            cy.contains('31.01.21').should('not.be.visible')
            cy.contains('01.02.21').should('not.be.visible')
            cy.contains('06.02.21').should('not.be.visible')
            cy.contains('08.02.21').should('not.be.visible')
            cy.contains('11.02.21').parent().should('contain', 'Fridag').and('contain', '-')
            cy.contains('13.02.21').parent().should('contain', 'Søkt for sent').and('contain', '-')
            cy.contains('14.02.21').should('not.be.visible')
            cy.contains('15.02.21').parent().should('contain', 'Maks antall dager nådd').and('contain', '-')
            cy.contains('16.02.21').parent().should('contain', 'For lav inntekt').and('contain', '-')
            cy.contains('17.02.21').parent().should('contain', 'Egenmelding når NAV skal betale').and('contain', '-')
            cy.contains('18.02.21').parent().should('contain', 'Sykmeldt i for liten grad').and('contain', '-')
            cy.contains('19.02.21').parent().should('contain', 'Jobbet for kort').and('contain', '-')
            cy.contains('20.02.21').parent().should('contain', 'Ikke medlem').and('contain', '-')
            cy.contains('21.02.21').parent().should('contain', 'Etter dødsfall').and('contain', '-')
            cy.contains('22.02.21').parent().should('contain', 'Ukjent').and('contain', '-')
        })
    })
})
