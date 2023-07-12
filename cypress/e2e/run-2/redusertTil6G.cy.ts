import { vedtakMedDetMeste } from '../../../src/data/testdata/data/rs-vedtak'
import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Redusert til 6G', () => {
    const vedtak = vedtakMedDetMeste

    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${vedtak.id}]`).click()
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('3 021 kroner').parent().contains('til Posten Norge AS, Bærum')

        cy.contains('Mer om beregningen').click({ force: true })

        cy.contains('Inntekter lagt til grunn for sykepengene').click()

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-månedsinntekt"]')
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(74675))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="beregnet-årsinntekt"]')
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(896100))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="annen-arbeidsgiver-0"]').contains('The Ministry Of Magic AS')

        cy.get('[data-cy="inntekt-info-article"] [data-cy="annen-arbeidsgiver-årsinntekt-0"]')
            .should('contain', 'Årsinntekt')
            .should('contain', formaterValuta(195781))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="samlet-årsinntekt"]')
            .should('contain', 'Samlet årsinntekt')
            .should('contain', formaterValuta(1091881))

        cy.get('[data-cy="inntekt-info-article"] [data-cy="sykepengegrunnlag"]')
            .should('contain', 'Sykepengegrunnlag')
            .should('contain', formaterValuta(638394))

        cy.get('[data-cy="inntekt-info-article"]').should(
            'contain',
            'Du får ikke sykepenger fra NAV for den delen av årsinntekten som er mer enn seks ganger grunnbeløpet.',
        )
    })
})
