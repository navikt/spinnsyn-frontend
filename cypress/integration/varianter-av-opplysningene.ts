describe('Tester logikk i behandling.tsx', () => {

    it('Automatisk behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=4e044d03-2dfe-45e9-a904-77777777')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden er behandlet automatisk')
        cy.get('.behandling').contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')

        cy.get('.navds-accordion__item.ekspanderbar.ugyldig').should('not.exist')

    })

    it('Manuelt behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=99f389f2-0084-481b-bed8-47f6ac3491d4')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden er behandlet av en saksbehandler')
        cy.get('.behandling').contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')

        cy.get('.navds-accordion__item.ekspanderbar.ugyldig').should('not.exist')
    })

    it('Automatisk behandlet annullert vedtak', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337')

        cy.get('.navds-alert').contains('Dette vedtaket gjelder ikke lenger')
        cy.get('.navds-alert').contains('Vi har mottatt nye opplysninger som gjør at dette vedtaket behandles på nytt av en saksbehandler.')
        cy.get('.navds-alert').contains('Du vil motta et eget brev med det nye vedtaket.')
        cy.get('.navds-alert').should('not.contain', 'Du finner det nye vedtaket i listen over svar på søknader')

        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden ble behandlet automatisk')
        cy.get('.behandling').contains('Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')

        cy.get('.navds-accordion__item.ekspanderbar.ugyldig').should('have.length', 2)
    })

    it('Manuelt behandlet revurdert vedtak', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634338')

        cy.get('.navds-alert').contains('Du har fått et nytt vedtak som erstatter dette vedtaket')
        cy.get('.navds-alert').contains('Vi har mottatt nye opplysninger som gjør at dette vedtaket er behandlet på nytt av en saksbehandler.')
        cy.get('.navds-alert').contains('Du finner det nye vedtaket i listen over svar på søknader')
        cy.get('.navds-alert').should('not.contain', 'Du vil motta et eget brev med det nye vedtaket.git o')

        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden ble behandlet av en saksbehandler')
        cy.get('.behandling').contains('Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')

        cy.get('.navds-accordion__item.ekspanderbar.ugyldig').should('have.length', 2)
    })

    it('Revurdert vedtak med direkte utbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=21eac584-d8ea-4e4b-bf9a-ae0a400009c4')
        cy.get('.navds-body-long.navds-body-long.navds-typo--spacing').eq(2).contains('Du får sykepenger direkte fra NAV. Den nye behandlingen kan påvirke hva NAV utbetaler til deg.')
    })

    it('Revurdert vedtak med kombinasjonsutbetaling', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=85f25c03-faa8-4a99-8f15-971e9406f64f')
        cy.get('.navds-body-long.navds-body-long.navds-typo--spacing').eq(2).contains('Du får sykepenger både fra arbeidsgiveren din og direkte fra NAV. Den nye behandlingen kan påvirke hva NAV betaler både til deg og til arbeidsgiveren din.')
    })
})

export {}
