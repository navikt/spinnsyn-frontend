import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    vedtakMed40Grad,
} from '../../../src/data/testdata/data/vedtak/rs-vedtak'
import { alleAvvisteDager } from '../../../src/data/testdata/data/vedtak/alleAvvisteDager'

describe('Avviste dager', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 11)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', () => {
        cy.get(`a[href*=${vedtakMed40Grad.id}]`).click({ force: true })

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).should('not.exist')
    })

    it('Vedtak med delvis godkjente utbetalingsdager', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${alleAvvisteDager.id}]`).click({
            force: true,
        })

        cy.get('[data-cy="utbetaling-panel-refusjon"]')
            .find('.navds-list')
            .get('li')
            .should('have.length', 2)
            .and('contain', '18 av 40 sykepengedager utbetales av NAV')
            .and('contain', '22 av 40 sykepengedager utbetales ikke av NAV')

        cy.get('.navds-heading:first-child').contains('Forklaring')
        cy.contains('Du får ikke sykepenger for dager du har ferie eller permisjon.')
        cy.contains('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.')
    })

    it('Vedtak med avviste dager og ingen utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtak.id}]`).click({ force: true })
        cy.contains('Ingen utbetaling')

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="sykepenger-per-dag"]').should('contain', 'Dine sykepenger per dag').click()
        })
    })

    it('Vedtak med avviste dager og lav inntekt', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtakMedLavInntekt.id}]`).click({
            force: true,
        })
        cy.contains('Ingen utbetaling')

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).click()
        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="sykepenger-per-dag"]').should('contain', 'Dine sykepenger per dag').click()
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]').should('contain', 'Mer om beregningen').click()
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('not.contain', 'Sykepenger per dag')
                .should('not.contain', 'Totalbeløp')
                .should('not.contain', 'Utbetalingsdager')
                .should('not.contain', 'Utbetaling')
        })
    })
})
