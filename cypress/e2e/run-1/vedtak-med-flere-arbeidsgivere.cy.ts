import { vedtakMedFlereArbeidsgivere } from '../../../src/data/testdata/data/vedtak/vedtakMedFlereArbeidsgivere'
import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Vedtak med flere arbeidsgivere', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere')
        cy.get(`a[href*=${vedtakMedFlereArbeidsgivere.id}]`).click()
    })

    it('Inntekter', () => {
        cy.contains('1 359 kroner').parent().contains('Utbetales til Industrifabrikken AS')

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(41958))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(503504))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .get('[data-cy="annen-arbeidsgiver-0"]')
            .contains('Den Andre Sjappa')

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Den Andre Sjappa Årsinntekt' })
            .should('contain', 'Årsinntekt')
            .should('contain', formaterValuta(406252))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Samlet årsinntekt' })
            .should('contain', 'Samlet årsinntekt')
            .should('contain', formaterValuta(909757))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Sykepengegrunnlag' })
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', formaterValuta(638394))
    })
})
