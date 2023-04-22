import { vedtakMedFlereArbeidsgivere } from '../../../src/data/testdata/data/vedtakMedFlereArbeidsgivere'
import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Vedtak med flere arbeidsgivere', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
        cy.get(`a[href*=${vedtakMedFlereArbeidsgivere.id}]`).click()
    })

    it('Inntekter', () => {
        cy.contains('1 359 kroner').parent().contains('Utbetales til Industrifabrikken AS')

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-månedslønn"]')
            .should('contain', 'Beregnet månedslønn')
            .should('contain', formaterValuta(41958))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-årslønn"]')
            .should('contain', 'Beregnet årslønn')
            .should('contain', formaterValuta(503504))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="annen-arbeidsgiver-0"]').contains('Den Andre Sjappa')

        cy.get('[data-cy="inntekt-info-article"] [data-cy="annen-arbeidsgiver-årslønn-0"]')
            .should('contain', 'Årslønn')
            .should('contain', formaterValuta(406252))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="samlet-årslønn"]')
            .should('contain', 'Samlet årslønn')
            .should('contain', formaterValuta(909757))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="sykepengegrunnlag"]')
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', formaterValuta(638394))
    })
})
