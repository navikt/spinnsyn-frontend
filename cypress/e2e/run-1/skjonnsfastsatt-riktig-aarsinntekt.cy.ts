import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Tester riktig omregner årsinntekt ved skjønnsfastsettelse', () => {
    it('Laster vedtaket', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepenger?testperson=skjonnsfastsatt-riktig-aarsinntekt&id=aa4060e6-727c-495b-9b32-18dd7c1c3fbd',
        )
    })

    it('Åpner Beregning av sykepengene', () => {
        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(40000))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(480000))
    })
})

export {}
