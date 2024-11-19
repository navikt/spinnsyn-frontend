import { kombinertDirekteOgRefusjon } from '../../../src/data/testdata/data/vedtak/kombinert'

describe('Kombinasjonutbetaling', () => {
    const vedtak = kombinertDirekteOgRefusjon

    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=kombinasjon')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 2)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=kombinasjon')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Viser info om utbetaling til personen', () => {
        cy.contains(
            'Du får noen av sykepengene dine fra Nav og resten fra arbeidsgiveren din. ' +
                'Arbeidsgiveren din får igjen pengene fra Nav senere.',
        )

        cy.get('[data-cy*="personutbetaling"]').within(() => {
            cy.contains('Beløpet er før skatt, kreditortrekk og tilbakebetalingskrav fra kommunen.')
            cy.contains(
                'Kreditortrekk kan være fra kemneren, Statens innkrevingssentral eller Nav innkreving. Tilbakebetalingskrav fra kommunen kan være i forbindelse med sosialhjelp.',
            )
            cy.contains('Pengene utbetales til deg')

            cy.contains(
                'Vi har ikke registrert noe kontonummer på deg, og anbefaler at du legger det inn ' +
                    'på Min side slik at vi får utbetalt sykepengene til deg så raskt som mulig.',
            )
            cy.findByRole('button', { name: 'Når får du sykepengene?' }).click()

            cy.get('.navds-read-more--open')
                .contains(
                    'Du får vanligvis utbetalt sykepengene enten innen den 25. i måneden, ' +
                        'eller innen fem dager etter at vi har sendt deg svar på søknaden din. Hvis søknaden din gjelder ' +
                        'dager i to ulike kalendermåneder, kan utbetalingen bli delt i to.',
                )
                .should('be.visible')
        })
        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('24 550 kroner')

        cy.get('[data-cy="header-sykepenger-til-deg"]').contains('sykepenger til deg')
    })

    it('Viser info om utbetaling til arbeidsgiveren', () => {
        cy.contains('Pengene utbetales til arbeidsgiveren din')
        cy.contains('4 910 kroner').parent().contains('Utbetales til Matbutikken AS')

        cy.get('[data-cy*="refusjon"]').within(() => {
            cy.contains('Når får du sykepengene?').should('not.exist')
        })
    })
})
