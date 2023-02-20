import { kombinertDirekteOgRefusjon } from '../../../src/data/testdata/data/rs-vedtak'

describe('Kombinasjonutbetaling', () => {
    const vedtak = kombinertDirekteOgRefusjon

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=kombinasjon')
        cy.get(`article a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om utbetaling til personen', () => {
        cy.contains(
            'Du får noen av sykepengene dine fra NAV og resten fra arbeidsgiveren din. ' +
                'Arbeidsgiveren din får igjen pengene fra NAV senere.',
        )

        cy.get('.personutbetaling').within(() => {
            cy.contains('Beløpet oppgitt er før skatt og eventuelle kreditortrekk')
            cy.contains('Eksempler på kreditortrekk')

            cy.contains(
                'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn ' +
                    'på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
            )

            cy.get('.navds-accordion__item').contains('Når får du sykepengene?').click()
            cy.get('.navds-accordion__item')
                .contains(
                    'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, ' +
                        'eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder ' +
                        'dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.',
                )
                .should('be.visible')

            cy.get('.navds-accordion__item').contains('Mer om beregningen').click({ force: true })
            cy.get('.navds-accordion__item').contains('Totalbeløp').should('be.visible')
            cy.get('.navds-accordion__item')
                .contains(
                    'Til slutt summerer vi alle dagene. ' +
                        'Totalbeløp viser beregnet sykepenger før skatt og eventuelle andre påleggstrekk.',
                )
                .should('be.visible')
        })

        cy.contains('24 550 kroner').and('contain', 'sykepenger til deg').click({ force: true })
        cy.get('.personutbetaling').contains('Når får du sykepengene?').should('not.be.visible')
    })

    it('Viser info om utbetaling til arbeidsgiveren', () => {
        cy.contains('4 910 kroner').and('contain', 'Utbetales til Matbutikken AS').click()

        cy.get('.refusjon').within(() => {
            cy.contains('Når får du sykepengene?').should('not.exist')
            cy.contains(
                'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, ' +
                    'eller innen fem dager etter at vi har sendt deg svar på søknaden din.',
            ).should('not.be.visible')

            cy.get('.navds-accordion__item').contains('Mer om beregningen').click({ force: true })

            cy.get('.navds-accordion__item').contains('Totalbeløp').should('be.visible')

            cy.get('.navds-accordion__item')
                .contains(
                    'Til slutt summerer vi alle dagene. Når du får utbetalt sykepengene fra arbeidsgiveren din, ' +
                        'har arbeidsgiveren trukket skatt og eventuelt andre faste trekk fra dette beløpet.',
                )
                .should('be.visible')
        })
    })
})
