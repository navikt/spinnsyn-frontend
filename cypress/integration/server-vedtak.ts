import { integrasjonsVedtak, vedtakMed40Grad } from '../../src/data/mock/data/rs-vedtak'

describe('Tester serverside rendret vedtak for arkivering ', () => {


    it('laster siden med alt ekspandert ', () => {


        cy.visit('http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering')

        cy.contains('Svar på søknad')
        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.contains('Sykepenger betales alltid fra mandag til fredag. Om du jobber lørdager og søndager blir dette medregnet i totalbeløpet.')
    })

})
