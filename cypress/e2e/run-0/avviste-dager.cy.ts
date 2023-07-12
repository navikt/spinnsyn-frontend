import {
    avvistVedtak,
    avvistVedtakMedLavInntekt,
    integrasjonsVedtak,
    vedtakMed40Grad,
} from '../../../src/data/testdata/data/rs-vedtak'

describe('Avviste dager', () => {
    before(() => {
        cy.visit('http://localhost:8080/syk/sykepenger')
    })

    it('Laster startside', () => {
        cy.url().should('equal', 'http://localhost:8080/syk/sykepenger')
    })

    it('Vedtak med bare godkjente utbetalingsdager viser ikke avviste dager panel', () => {
        cy.get(`a[href*=${vedtakMed40Grad.id}]`).click({ force: true })

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).should('not.exist')
    })

    it('Vedtak med delvis godkjente utbetalingsdager', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${integrasjonsVedtak.id}]`).click({
            force: true,
        })

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '15 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('30.jan.').should('not.exist')
                cy.contains('31.jan.').should('not.exist')
                cy.contains('01.feb.').should('not.exist')
                cy.contains('06.feb.').should('not.exist')
                cy.contains('08.feb.').should('not.exist')
                cy.contains('11.feb.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('13.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Søkt\u00a0for\u00a0sent')
                    .and('contain', '-')
                cy.contains('14.feb.').should('not.exist')
                cy.contains('15.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Maks\u00a0antall\u00a0dager')
                    .and('contain', '-')
                cy.contains('16.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('17.feb.').parent().parent().should('contain', 'Egenmelding').and('contain', '-')
                cy.contains('18.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Sykmeldt\u00a0i\u00a0for\u00a0liten\u00a0grad')
                    .and('contain', '-')
                cy.contains('19.feb.')
                    .parent()
                    .parent()
                    .should('contain', 'Jobbet\u00a0for\u00a0kort')
                    .and('contain', '-')
                cy.contains('20.feb.').parent().parent().should('contain', 'Ikke\u00a0medlem').and('contain', '-')
                cy.contains('21.feb.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
                cy.contains('22.feb.').parent().parent().should('contain', 'Ukjent').and('contain', '-')
            })
        })

        cy.get('.navds-heading:first-child').contains('Forklaring')
        cy.contains('Du får ikke sykepenger for dager du har ferie eller permisjon.')
        cy.contains('Det blir ikke utbetalt sykepenger etter datoen for dødsfallet.')

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).contains('Mer om beregningen').should('not.exist')
    })

    it('Vedtak med avviste dager og ingen utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtak.id}]`).click({ force: true })

        cy.get('.ekspanderbar.gronn').should('not.exist')

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '4 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.contains('Inntekter lagt til grunn for sykepengene').should('not.exist')

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('17.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('18.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('19.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('20.aug.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            })
        })

        cy.contains('Mer om beregningen').should('not.exist')
    })

    it('Vedtak med avviste dager og lav inntekt', () => {
        cy.visit('http://localhost:8080/syk/sykepenger')
        cy.get(`a[href*=${avvistVedtakMedLavInntekt.id}]`).click({
            force: true,
        })

        cy.get('.ekspanderbar.gronn').should('not.exist')

        cy.findByRole('region', { name: 'Avviste sykepengedager' })
            .should('contain', '5 sykepengedager')
            .and('contain', 'Utbetales ikke av NAV')
            .click()

        cy.contains(
            'Vi ser at du ikke har rett til sykepenger for én eller flere dagene i sykmeldingen. Nedenfor ser du dagene du ikke får utbetaling for, og hvorfor.',
        )

        cy.contains('Inntekter lagt til grunn for sykepengene')

        cy.get('[data-cy="avvistedageroversikt"]').should('contain', 'Dager NAV ikke utbetaler').click()

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="dag-tabell-body"]').within(() => {
                cy.contains('17.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('18.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('19.aug.').parent().parent().should('contain', 'Fridag').and('contain', '-')
                cy.contains('20.aug.')
                    .parent()
                    .parent()
                    .should('contain', 'For\u00a0lav\u00a0inntekt')
                    .and('contain', '-')
                cy.contains('21.aug.').parent().parent().should('contain', 'Etter\u00a0dødsfall').and('contain', '-')
            })
        })

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]').should('contain', 'Mer om beregningen').click()
        })

        cy.findByRole('region', { name: 'Avviste sykepengedager' }).within(() => {
            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('not.contain', 'Sykepenger per dag')
                .should('not.contain', 'Totalbeløp')
                .should('not.contain', 'Utbetalingsdager')
                .should('not.contain', 'Utbetaling')
        })
    })
})
