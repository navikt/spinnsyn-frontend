import { formaterValuta } from '../../../src/utils/valuta-utils'

describe('Har null i årsinntekt', () => {
    before(() => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=null-omregnet-aarsinntekt')
        cy.findAllByRole('link', { name: /Sykmeldt fra /i }).should('have.length', 1)
    })

    it('Åpner vedtak', () => {
        cy.findByRole('link', { name: /Sykmeldt fra /i }).click()
        cy.contains('Svar på søknad om sykepenger').should('be.visible')
    })

    it('Åpner beregning av sykepengene', () => {
        cy.get('body').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Beregnet månedsinntekt (hentet fra inntektsmeldingen)' })
            .should('contain', 'Beregnet månedsinntekt')
            .should('contain', formaterValuta(0))

        cy.findByRole('article', { name: 'Beregning av sykepengene' })
            .findByRole('region', { name: 'Omregnet til årsinntekt' })
            .should('contain', 'Omregnet til årsinntekt')
            .should('contain', formaterValuta(0))
    })

    it('Åpner begrunnelse for skjønnsfastsetting', () => {
        cy.get('main').findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' }).click()

        cy.findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
            .should('contain', 'Begrunnelse for skjønnsfastsetting')
            .siblings('div')
            .should('contain', 'Du er sykmeldt ved overgang fra foreldrepenger bla bla mer greier')
    })
})

export {}
