import { kunDirekte } from '../../../src/data/testdata/data/vedtak/rs-vedtak'

describe('Tidligere utbetalt hel arbeidsgiverperiode', () => {
    const vedtak = kunDirekte

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=direkte-og-refusjon')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 2)
    })

    it('Åpner vedtak', () => {
        cy.get(`a[href*=${vedtak.id}]`).click()

        cy.contains('Svar på søknad om sykepenger').should('be.visible')
    })

    it('Åpner beregning av sykepengene', () => {
        cy.get('body').findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Sykepenger per dag til deg').should('be.visible')
            cy.findByRole('button', { name: 'Sykepenger per dag til deg' }).click()
            cy.contains(
                'Det er tidligere utbetalt en hel arbeidsgiverperiode. Etter dette har vi vurdert at du ikke har gjenopptatt arbeidet og deretter vært friskmeldt i mer enn 16 dager. NAV har derfor utbetalt sykepenger fra første dag du ble sykmeldt.',
            ).should('be.visible')
        })
    })
})

export {}
