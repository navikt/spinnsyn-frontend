import { vedtakMed0Utbetaling } from '../../../src/data/testdata/data/vedtak/vedtakMed0Utbetaling'

describe('Ved et vedtak med null utbetaling vises ikke tekst om hvem som får null kroner', () => {
    before(() => {
        cy.visit('http://localhost:3000//syk/sykepenger?testperson=vedtak-med-0-utbetaling')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=vedtak-med-0-utbetaling')
        cy.get(`a[href*=${vedtakMed0Utbetaling.id}]`).click()
    })

    it('Inntekter', () => {
        cy.contains('Gjelder sykefravær fra Coop Extra Brumunddal').parent().parent().contains('0 kroner')
        cy.get('body').should('not.contain', 'Beløpet går til arbeidsgiveren din')
    })
})
