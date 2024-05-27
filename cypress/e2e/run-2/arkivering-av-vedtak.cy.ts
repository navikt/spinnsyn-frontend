describe('Vedtak for arkivering', () => {
    it('Vanlig vedtak med refusjon der alt er ekspandert', () => {
        cy.visit('http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering')

        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.get('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)').should('have.length', 0)

        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Delvis innvilget vedtak').should('exist')
            cy.contains('Noen av dagene er ikke innvilget fordi:').should('exist')
            cy.contains('li', 'Sykmeldt i for liten grad').should('exist')

            cy.contains('button', 'Se nærmere begrunnelse her')
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.contains('Forklaring')
            cy.get('[data-cy="dag-tabell-body"]').as('dager')

            cy.get('@dager').within(() => {
                cy.contains('01.feb.').parent().parent().should('contain', 'Syk').and('contain', '1\u00a0000 kr')
                cy.contains('06.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
            })

            cy.contains(
                'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
            )

            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('contain', 'Sykepenger per dag')
                .should('contain', 'Totalbeløp')
                .should('contain', 'Utbetalingsdager')
                .should('contain', 'Utbetaling')
        })

        cy.findByRole('region', { name: 'Antall sykepengedager som gjenstår' }).within(() => {
            cy.contains('Det er bare dager NAV skal utbetale som er med i tellingen over')
        })
    })

    it('Skjønnsfastsatt brukerutbetaling der alt er ekspandert', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering?testperson=skjonnsfastsatt-brukerutbetaling',
        )

        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.get('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)').should('have.length', 0)

        cy.get('[data-cy="utbetaling-panel-personutbetaling"]').within(() => {
            cy.contains('button', 'Når får du sykepengene')
            cy.contains('a', 'Les mer om når du kan forvente å få pengene')
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
                .should('contain', 'Begrunnelse for skjønnsfastsetting')
                .siblings('div')
                .should('contain', 'Konklusjon')
                .within(() => {
                    cy.contains('Dette er konklusjonen fra speil. 200 000kr er et skjønnsfastsatt beløp.')
                })

            cy.get('[data-cy="dag-tabell-body"]').as('dager')
            cy.get('@dager').within(() => {
                cy.contains('08.feb.').parent().parent().should('contain', 'Syk').and('contain', '2\u00a0455 kr')
                cy.contains('13.feb.').parent().parent().should('contain', 'Helg').and('contain', '-')
            })

            cy.contains('Forklaring')
            cy.contains(
                'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
            )

            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('contain', 'Sykepenger per dag')
                .should('contain', 'Totalbeløp')
                .should('contain', 'Utbetalingsdager')
                .should('contain', 'Utbetaling')
        })

        cy.findByRole('region', { name: 'Antall sykepengedager som gjenstår' }).within(() => {
            cy.contains('Det er bare dager NAV skal utbetale som er med i tellingen over')
        })
    })

    it('Delvis innvilgelse fra bømlo der alt er ekspandert', () => {
        cy.visit(
            'http://localhost:8080/syk/sykepenger/vedtak/arkivering/utvikling-arkivering?testperson=kombinasjon-delvisInnvilgelse-og-skj%C3%B8nnsfastsatt-fra-bomlo',
        )

        cy.contains('Du kan lese mer om hvordan sykepengene beregnes i')
        cy.get('.flex:not(.arkivering-flex-fix):not(.flex-arkivering-ignore)').should('have.length', 0)

        cy.get('[data-cy="utbetaling-panel-refusjon"]').within(() => {
            cy.contains('Delvis innvilget vedtak').should('exist')
            cy.contains('Noen av dagene er ikke innvilget fordi:').should('exist')
            cy.contains('li', 'Sykmeldt i for liten grad').should('exist')

            cy.contains('button', 'Se nærmere begrunnelse her').click()
        })

        cy.get('[data-cy="utbetaling-panel-personutbetaling"]').within(() => {
            cy.contains('button', 'Når får du sykepengene')
            cy.contains('a', 'Les mer om når du kan forvente å få pengene')
        })

        cy.findByRole('region', { name: 'Beregning av sykepengene' }).within(() => {
            cy.findByRole('button', { name: 'Begrunnelse for skjønnsfastsetting' })
                .should('contain', 'Begrunnelse for skjønnsfastsetting')
                .siblings('div')
                .should('contain', 'Konklusjon')
                .within(() => {
                    cy.contains('Vi har skjønnsfastsatt årsinntekten din til 504 012,00 kroner.')
                })

            cy.findByRole('button', { name: 'Begrunnelse for delvis innvilget vedtak' })
                .should('contain', 'Begrunnelse for delvis innvilget vedtak')
                .siblings('div')
                .should('contain', 'Devlis innvilgelse.')
                .and('contain', 'Ny linje.')

            cy.get('[data-cy="dag-tabell-body"]').as('dager').should('be.visible')
            cy.get('@dager')
                .first()
                .within(() => {
                    cy.contains('08.feb.')
                        .parent()
                        .parent()
                        .should('contain', 'Arbeidsgiveren\u00a0betaler')
                        .and('contain', '-')
                    cy.contains('20.feb.').parent().parent().should('contain', 'Syk')
                })
            cy.contains('Forklaring')
            cy.contains(
                'Sykepenger betales bare for dagene mandag til fredag. Jobber du lørdager og søndager, blir disse dagene likevel regnet med i sykepengene du får. Inntekten som du har på helgedagene, blir fordelt på ukedagene.',
            )

            cy.contains('Sykepenger per dag til deg')
            cy.get('@dager')
                .eq(1)
                .within(() => {
                    cy.contains('23.feb.').parent().parent().should('contain', 'Syk')
                })
            cy.contains('Forklaring')
            cy.contains('Du har vært syk en hel dag, og du får sykepenger for denne dagen.')

            cy.get('[data-cy="mer-om-beregningen"]')
                .should('contain', 'Månedsinntekt')
                .should('contain', 'Årsinntekt')
                .should('contain', 'Sykepengegrunnlag')
                .should('contain', 'Sykepenger per dag')
                .should('contain', 'Totalbeløp')
                .should('contain', 'Utbetalingsdager')
                .should('contain', 'Utbetaling')
        })

        cy.findByRole('region', { name: 'Antall sykepengedager som gjenstår' }).within(() => {
            cy.contains('Det er bare dager NAV skal utbetale som er med i tellingen over')
        })
    })
})

export {}
