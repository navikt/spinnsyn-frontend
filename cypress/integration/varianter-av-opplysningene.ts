describe('Tester logikk i behandling.tsx', () => {

    it('Automatisk behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=4e044d03-2dfe-45e9-a904-77777777')
        cy.get('.behandling > .typo-undertittel').should('have.text', 'Automatisk behandling')
        cy.get('.behandling').contains('Søknaden din er behandlet automatisk. Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })

    it('Manuelt behandlet', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=99f389f2-0084-481b-bed8-47f6ac3491d4')
        cy.get('.behandling > .typo-undertittel').should('have.text', 'Opplysningene')
        cy.get('.behandling').contains('Opplysningene er hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })

    it('Automatisk revurdert eller annullert', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634337')
        cy.get('.behandling > .typo-undertittel').should('have.text', 'Automatisk behandling')
        cy.get('.behandling').contains('Søknaden din ble behandlet automatisk. Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
        cy.get('.behandling').contains('Ny behandling av søknaden vil ikke skje automatisk. Da er det en saksbehandler som vurderer søknaden.')

    })
    it('Manuell revurdert eller annullert', () => {
        cy.visit('http://localhost:8080/syk/sykepenger?id=9ae82dd2-dcf1-4c16-9e12-35cb6d634338')
        cy.get('.behandling > .typo-undertittel').should('have.text', 'Opplysningene')
        cy.get('.behandling').contains('Opplysningene ble hentet fra søknaden din, offentlige registre og inntektsmeldingen fra arbeidsgiveren din. Kontakt oss om du ønsker å se opplysningene.')
    })
})

export {}
