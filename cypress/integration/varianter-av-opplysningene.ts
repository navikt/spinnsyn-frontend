describe('Tester logikk i behandling.tsx', () => {

    it('Automatisk behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=4e044d03-2dfe-45e9-a904-77777777')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden er behandlet automatisk')
        cy.get('.behandling').contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })

    it('Manuelt behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=99f389f2-0084-481b-bed8-47f6ac3491d4')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden er behandlet av en saksbehandler')
        cy.get('.behandling').contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })

    it('Automatisk revurdert eller annullert', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden ble behandlet automatisk')
        cy.get('.behandling').contains('Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })

    it('Manuell revurdert eller annullert', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634338')
        cy.get('.behandling > .navds-heading').should('have.text', 'Søknaden ble behandlet av en saksbehandler')
        cy.get('.behandling').contains('Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })
})

export {}
