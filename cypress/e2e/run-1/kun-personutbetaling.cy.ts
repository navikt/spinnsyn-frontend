import { kunDirekte } from '../../../src/data/testdata/data/vedtak/kunDirekte'

describe('Kun personutbetaling', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=kun-direkte')
        cy.findByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=kun-direkte')
    })

    it('Viser info om utbetaling til person', () => {
        cy.get(`a[href*=${vedtak.id}]`).click()
        cy.contains(
            'Du får noen av sykepengene dine fra Nav og resten fra arbeidsgiveren din. Arbeidsgiveren din får igjen pengene fra NAV senere.',
        ).should('not.exist')

        cy.contains('Pengene utbetales til deg')
        cy.contains('Utbetales til Matbutikken AS').should('not.exist')

        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('24 550 kroner')
        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('sykepenger til deg')

        cy.get('[data-cy="utbetaling-panel-personutbetaling"]')
            .should('exist')
            .and('have.css', 'background-color', 'rgb(216, 249, 255)') // --a-lightblue-100

        cy.get('[data-cy*="personutbetaling"]').within(() => {
            cy.get('h3').contains('Sykepenger utbetales til kontonummer:')
            cy.contains('1001 11 10011')

            cy.contains('Når får du sykepengene?').click()
            cy.contains(
                'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, ' +
                    'eller innen fem dager etter at vi har sendt deg svar på søknaden din. ' +
                    'Hvis søknaden din gjelder dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.',
            )
        })
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Mer om beregningen').click()
            cy.get('.navds-accordion__item').contains('Totalbeløp')
            cy.get('.navds-accordion__item').contains(
                'Til slutt summerer vi alle dagene. ' +
                    'Når du får utbetalt sykepenger fra Nav viser totalbeløp beregnet sykepenger før skatt og eventuelle andre påleggstrekk.',
            )
        })
    })

    it('Ekspanderer blått panel', () => {
        cy.contains('10 sykepengedager').click({ force: true })
        cy.contains('238 sykepengedager')
    })
})
