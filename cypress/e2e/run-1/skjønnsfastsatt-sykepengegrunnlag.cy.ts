import { formaterValuta } from '../../../src/utils/valuta-utils'
import { inntektInfoTekster } from '../../../src/components/vedtak-side/inntekter-lagt-til-grunn/inntekt-info-tekster'

describe('Skjønnsfastsatt sykepengegrunnlag', () => {
    describe('Direkteutbetaling skjønnsfastsatt over 6G', () => {
        it('Åpner vedtaket', () => {
            cy.visit(
                'http://localhost:8080/syk/sykepenger?testperson=skj%C3%B8nnsfastsatt-brukerutbetaling&id=6aa63aa6-a932-4ba4-b1b3-bc3722b0eb1e',
            )
            cy.findByRole('heading', { level: 1 }).should('exist').and('contain.text', 'Svar på søknad om sykepenger')
        })
        it('Åpner Beregning av sykepengene', () => {
            cy.get('main').findByRole('button', { name: 'Beregning av sykepengene' }).click()

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Årsinntekt fra A-ordningen' })
                .should('contain', 'Årsinntekt fra A-ordningen')
                .should('contain', formaterValuta(350000))

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Utregnet avvik' })
                .should('contain', 'Utregnet avvik')
                .should('contain', '61,4 %')

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Skjønnsfastsatt årsinntekt' })
                .should('contain', 'Skjønnsfastsatt årsinntekt')
                .should('contain', formaterValuta(660000))

            cy.findByRole('article', { name: 'Beregning av sykepengene' }).should(
                'contain',
                inntektInfoTekster['25%avvik-skjønnsfastsatt'],
            )
        })

        it('Åpner begrunnelse for skjønnsfastsetting', () => {
            cy.get('main').findByRole('region', { name: 'Begrunnelse for skjønnsfastsetting' }).click()

            cy.findByRole('region', { name: 'Begrunnelse for skjønnsfastsetting' })
                .should('contain', 'Begrunnelse for skjønnsfastsetting')
                .and('contain', 'Dette er en mal begrunnelse som kommer fra speil. Vi takler nye linjer.')
                .and('contain', 'Nulla euismod, nisl eget ultrices ultrices')
                .and('contain', 'Nærmere begrunnelse fra saksbehandler')
                .and(
                    'contain',
                    'Dette er en tekstlig begrunnelse fra saksbehandleren din. Jeg brukte skjønn og kom frem hva vi tror du ville tjent om et år gitt omstendigheter lorem ipsum hei og hå',
                )
        })
    })

    describe('Skjønnsfastsatt flere arbeidsgivere', () => {
        it('Åpner vedtaket', () => {
            cy.visit(
                'http://localhost:8080/syk/sykepenger?testperson=skj%C3%B8nnsfastsatt-flere-arbeidsgivere&id=6aa63aa6-a932-4ba4-b1b3-bc3722b0aaaa',
            )
            cy.findByRole('heading', { level: 1 }).should('exist').and('contain.text', 'Svar på søknad om sykepenger')
        })
        it('Åpner Beregning av sykepengene', () => {
            cy.get('main').findByRole('button', { name: 'Beregning av sykepengene' }).click()

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Årsinntekt fra A-ordningen' })
                .should('contain', 'Årsinntekt fra A-ordningen')
                .should('contain', formaterValuta(350000))

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Utregnet avvik' })
                .should('contain', 'Utregnet avvik')
                .should('contain', '61,4 %')

            cy.findByRole('article', { name: 'Beregning av sykepengene' })
                .findByRole('region', { name: 'Skjønnsfastsatt årsinntekt' })
                .should('contain', 'Skjønnsfastsatt årsinntekt')
                .should('contain', formaterValuta(660000))

            cy.findByRole('article', { name: 'Beregning av sykepengene' }).should(
                'contain',
                inntektInfoTekster['25%avvik-skjønnsfastsatt'],
            )
        })

        it('Åpner begrunnelse for skjønnsfastsetting', () => {
            cy.get('main').findByRole('region', { name: 'Begrunnelse for skjønnsfastsetting' }).click()

            cy.findByRole('region', { name: 'Begrunnelse for skjønnsfastsetting' })
                .should('contain', 'Begrunnelse for skjønnsfastsetting')
                .and('contain', 'Dette er en mal begrunnelse som kommer fra speil. Vi takler nye linjer.')
                .and('contain', 'Nulla euismod, nisl eget ultrices ultrices')
                .and('contain', 'Nærmere begrunnelse fra saksbehandler')
                .and('contain', 'Begrunnelse fra saksbehandler ved flere arbeidsgivere')
        })
    })
})

export {}
