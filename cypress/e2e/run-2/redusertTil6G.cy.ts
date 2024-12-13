import { formaterValuta } from '../../../src/utils/valuta-utils'
import { vedtakMedDetMeste } from '../../../src/data/testdata/data/vedtak/medDetMeste'

describe('Redusert til 6G', () => {
    const vedtak = vedtakMedDetMeste

    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 11)
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:3000/syk/sykepenger')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('3 021 kroner').parent().contains('til Posten Norge AS, Bærum')

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.contains('Mer om beregningen').click({ force: true })

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(74675))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(896100))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .get('[data-cy="annen-arbeidsgiver-0"]')
            .contains('The Ministry Of Magic AS')

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'The Ministry Of Magic AS Årsinntekt' })
            .should('contain', 'Årsinntekt')
            .should('contain', formaterValuta(195781))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Samlet årsinntekt' })
            .should('contain', 'Samlet årsinntekt')
            .should('contain', formaterValuta(1091881))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Sykepengegrunnlag' })
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', formaterValuta(638394))

        cy.findByRole('article', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Sykepengegrunnlaget er begrenset til 6G')
        })
    })
})
