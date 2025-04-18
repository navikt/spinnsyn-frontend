describe('Tester logikk i behandling.tsx', () => {
    it('Automatisk behandlet', () => {
        cy.visit('http://localhost:3000/syk/sykepenger?id=a147e9a9-0aa2-4f5f-a8e3-c16c901e4071')

        cy.get('[data-cy="behandling-header"]')
            .should('have.text', 'Søknaden er behandlet automatisk')
            .and('be.visible')
        cy.get('[data-cy="behandling-body"]').contains(
            'Vi fattet vedtaket 23. oktober 2021. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )

        cy.get('[data-cy*="ugyldig"]').should('not.exist')
    })

    it('Varianter av opplysningene', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=et-vedtak-flere-arbeidsgivere&id=731f152b-6b70-4f07-9d1d-6e2ad6aea4de',
        )

        cy.get('[data-cy="behandling-header"]')
            .should('have.text', 'Søknaden er behandlet av en saksbehandler')
            .and('be.visible')
        cy.get('[data-cy="behandling-body"]').contains(
            'Vi fattet vedtaket 21. mars 2022. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )
        cy.get('[data-cy*="ugyldig"]').should('not.exist')
    })

    it('Automatisk behandlet annullert vedtak', () => {
        cy.visit('http://localhost:3000/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337')

        cy.get('.navds-alert').contains('Til din informasjon').and('be.visible')

        cy.get('.navds-alert').contains('Av tekniske årsaker er saken din flyttet til et annet saksbehandlingssystem.')
        cy.get('.navds-alert').contains('Dersom det er endringer i tidligere vedtak, får du et eget vedtak om dette.')
        cy.get('.navds-alert').should('not.contain', 'Du finner det nye vedtaket i listen over svar på søknader')

        cy.get('[data-cy="behandling-header"]').should('have.text', 'Søknaden ble behandlet automatisk')
        cy.get('[data-cy="behandling-body"]').contains(
            'Vi fattet vedtaket 4. mai 2021. Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )

        cy.findByRole('region', { name: 'Antall sykepengedager som gjenstår' })
            .eq(0)
            .should('have.css', 'background-color', 'rgb(236, 238, 240)' /* grå */)
    })

    it('Manuelt behandlet revurdert vedtak', () => {
        cy.visit('http://localhost:3000/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634338')

        cy.get('.navds-alert').contains('Denne beslutningen er behandlet på nytt.').and('be.visible')

        cy.get('.navds-alert').contains('Nytt svar for denne perioden finner du her')
        cy.get('.navds-alert').should(
            'not.contain',
            'Dersom det er endringer i tidligere vedtak, får du et eget vedtak om dette.',
        )

        cy.get('[data-cy="behandling-header"]').should('have.text', 'Søknaden ble behandlet av en saksbehandler')
        cy.get('[data-cy="behandling-body"]').contains(
            'Vi fattet vedtaket 6. mai 2021. Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din.',
        )

        cy.findByRole('region', { name: 'Antall sykepengedager som gjenstår' })
            .eq(0)
            .should('have.css', 'background-color', 'rgb(236, 238, 240)' /* grå */)
    })

    it('Revurdert vedtak med direkte utbetaling', () => {
        cy.visit('http://localhost:3000/syk/sykepenger?id=21eac584-d8ea-4e4b-bf9a-ae0a400009c4')

        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').and('be.visible').click()
        cy.get('.navds-body-long.navds-body-long.navds-typo--spacing')
            .eq(1)
            .contains('Du får sykepenger direkte fra Nav. Den nye behandlingen kan påvirke hva Nav utbetaler til deg.')
    })

    it('Revurdert vedtak med kombinasjonsutbetaling', () => {
        cy.visit(
            'http://localhost:3000/syk/sykepenger?testperson=kombinert-revurdert&id=dff11217-31ea-404a-86ab-b521a6a946df',
        )

        cy.contains('Dette lurer mange på når vedtaket behandles på nytt').and('be.visible').click()
        cy.get('.navds-body-long.navds-body-long.navds-typo--spacing')
            .eq(1)
            .contains(
                'Du får sykepenger både fra arbeidsgiveren din og direkte fra Nav. Den nye behandlingen kan påvirke hva Nav betaler både til deg og til arbeidsgiveren din.',
            )
    })

    it('Revurdert vedtak får infoboks', () => {
        cy.visit('http://localhost:3000/syk/sykepenger?testperson=kombinasjon')
        cy.get('.navds-tag--info').contains('Ny beslutning').click()
        cy.get('.navds-alert--info').contains('Dette er en ny beslutning som erstatter et tidligere svar.')
    })
})

export {}
