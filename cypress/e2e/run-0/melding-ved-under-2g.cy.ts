import { under2gInntekt } from '../../../src/data/testdata/data/personas/personas'

describe('Melding ved 2g', () => {
    const vedtak = under2gInntekt.vedtak[0]

    before(() => {
        cy.visit(`http://localhost:3000/syk/sykepenger?testperson=under-2g-beskjed&id=${vedtak.id}`)
        cy.contains('Svar på søknad om sykepenger')
    })

    it('Utbetalingsoversikt', () => {
        cy.contains('8 459').parent().contains('Utbetales til Sauefabrikk')

        cy.get('main').findByRole('region', { name: 'Beregning av sykepengene' }).click()

        cy.contains(
            'Sykepengegrunnlaget ditt er mindre enn to ganger grunnbeløpet. Hvis du også oppfyller kravene for arbeidsavklaringspenger, kan du velge å få det isteden.',
        )
    })
})
