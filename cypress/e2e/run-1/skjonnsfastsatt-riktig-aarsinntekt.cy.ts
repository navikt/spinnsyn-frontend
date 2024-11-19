import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Tester riktig omregner årsinntekt ved skjønnsfastsettelse', () => {
    it('Åpner vedtaket for sjokkerende elektriker', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=f8018350-05e1-4c03-9219-21b50229fc04',
        )
    })

    it('Åpner Beregning av sykepengene for sjokkerende elektriker', () => {
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(21000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(252000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Sauefabrikk Årsinntekt' })
            .should('contain', 'Årsinntekt')
            .should('contain', formaterValuta(180000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Samlet årsinntekt' })
            .should('contain', 'Samlet årsinntekt')
            .should('contain', formaterValuta(432000))
    })

    it('Åpner vedtaket for sauefabrikk', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=29ece7ee-e1de-443c-8011-431998b1ffab',
        )
    })

    it('Åpner Beregning av sykepengene for sauefavrikk', () => {
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(15000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(180000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Sjokkerende Elektriker Årsinntekt' })
            .should('contain', 'Årsinntekt')
            .should('contain', formaterValuta(252000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Samlet årsinntekt' })
            .should('contain', 'Samlet årsinntekt')
            .should('contain', formaterValuta(432000))
    })
})

export {}
